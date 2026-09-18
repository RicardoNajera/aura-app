if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW activo:', reg.scope))
      .catch(err => console.debug('Entorno local sin SW:', err));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const coreTrigger = document.getElementById('core-trigger');
  const coreLabel = document.getElementById('core-label');
  const statusBadge = document.getElementById('status-badge');
  const statusDot = document.getElementById('status-dot');
  const transcriptArea = document.getElementById('transcript');
  const wordCounter = document.getElementById('word-counter');
  const sensVal = document.getElementById('sens-val');
  const ambientGlow = document.getElementById('ambient-glow');
  const coreIconContainer = document.getElementById('core-icon-container');
  const copyBtn = document.getElementById('copy-btn');
  const copyLabel = document.getElementById('copy-label');
  const clearBtn = document.getElementById('clear-btn');
  const canvas = document.getElementById('audio-canvas');
  const ctx = canvas.getContext('2d');

  let isRecording = false;
  let audioCtx = null;
  let analyser = null;
  let microphoneStream = null;
  let dataArray = null;
  let animationId = null;
  let recognition = null;
  let confirmedText = '';

  // Redimensionamiento elástico del Canvas con DevicePixelRatio para pantallas Retina / 4K
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.resetTransform?.() || ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    if (!isRecording) drawIdleVisualizer();
  }

  // Observer moderno para redibujar en giros de pantalla y cambios de tamaño fluidos
  if (window.ResizeObserver) {
    new ResizeObserver(resizeCanvas).observe(canvas);
  } else {
    window.addEventListener('resize', resizeCanvas);
  }
  resizeCanvas();

  // Compatibilidad universal con Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-MX';

    recognition.onresult = (event) => {
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          confirmedText += transcript + ' ';
        } else {
          interimText += transcript;
        }
      }
      transcriptArea.value = confirmedText + interimText;
      transcriptArea.scrollTop = transcriptArea.scrollHeight;
      updateWordCount(transcriptArea.value);
    };

    recognition.onerror = (e) => {
      console.warn('Reconocimiento de voz:', e.error);
    };

    recognition.onend = () => {
      if (isRecording) {
        try { recognition.start(); } catch (err) {}
      }
    };
  }

  function updateWordCount(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCounter.textContent = `${words} Palabra${words === 1 ? '' : 's'}`;
  }

  async function initAudioSystem() {
    try {
      microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
      const source = audioCtx.createMediaStreamSource(microphoneStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      return true;
    } catch (err) {
      showNotification('Permiso de micrófono no otorgado.');
      return false;
    }
  }

  function stopSession() {
    isRecording = false;
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
    }
    if (microphoneStream) {
      microphoneStream.getTracks().forEach(track => track.stop());
      microphoneStream = null;
    }
    if (audioCtx && audioCtx.state !== 'closed') {
      audioCtx.close();
      audioCtx = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    coreTrigger.classList.remove('glass-panel-active');
    coreIconContainer.classList.remove('bg-cyan-400', 'text-slate-950', 'shadow-[0_0_30px_rgba(0,240,255,0.8)]');
    coreIconContainer.classList.add('bg-cyan-950/80', 'text-cyan-400');
    coreLabel.textContent = 'Click para Iniciar';
    statusBadge.textContent = 'Standby';
    statusDot.className = 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-500';
    sensVal.textContent = '0.0%';
    ambientGlow.style.transform = 'scale(1)';
    ambientGlow.style.opacity = '0.25';

    drawIdleVisualizer();
  }

  async function startSession() {
    if (!SpeechRecognition) {
      showNotification('Navegador sin soporte de voz nativa.');
      return;
    }

    const success = await initAudioSystem();
    if (!success) return;

    isRecording = true;
    coreTrigger.classList.add('glass-panel-active');
    coreIconContainer.classList.remove('bg-cyan-950/80', 'text-cyan-400');
    coreIconContainer.classList.add('bg-cyan-400', 'text-slate-950', 'shadow-[0_0_30px_rgba(0,240,255,0.8)]');
    coreLabel.textContent = 'Escuchando en Vivo';
    statusBadge.textContent = 'En Vivo';
    statusDot.className = 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping';

    try {
      recognition.start();
    } catch (e) {
      console.debug('Recognition activo:', e);
    }

    renderVisualizer();
  }

  function drawIdleVisualizer() {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.clearRect(0, 0, width, height);

    const centerY = height / 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    for (let x = 0; x < width; x += 10) {
      const y = centerY + Math.sin(x * 0.05 + Date.now() * 0.003) * 3;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function renderVisualizer() {
    if (!isRecording || !analyser) return;

    animationId = requestAnimationFrame(renderVisualizer);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const sensitivity = (sum / dataArray.length) / 255;
    sensVal.textContent = `${(sensitivity * 100).toFixed(1)}%`;

    const scaleFactor = 1 + (sensitivity * 0.35);
    ambientGlow.style.transform = `scale(${scaleFactor})`;
    ambientGlow.style.opacity = 0.2 + (sensitivity * 0.6);

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.clearRect(0, 0, width, height);

    // Cantidad de barras dinámica según ancho de la pantalla
    const barCount = width < 380 ? 20 : 28;
    const gap = 3;
    const barWidth = (width / barCount) - gap;
    let x = gap / 2;

    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * dataArray.length);
      const barHeightPercent = dataArray[dataIndex] / 255;
      const barHeight = Math.max(4, barHeightPercent * (height * 0.75));

      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
      gradient.addColorStop(0.7, 'rgba(121, 40, 202, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 0, 127, 0.95)');

      ctx.fillStyle = gradient;
      const y = (height - barHeight) / 2;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 3);
      ctx.fill();

      x += barWidth + gap;
    }
  }

  coreTrigger.addEventListener('click', () => {
    if (!isRecording) {
      startSession();
    } else {
      stopSession();
    }
  });

  copyBtn.addEventListener('click', () => {
    const textToCopy = transcriptArea.value.trim();
    if (!textToCopy) {
      showNotification('No hay texto para copiar.');
      return;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyLabel.textContent = '¡Copiado!';
      setTimeout(() => copyLabel.textContent = 'Copiar', 1500);
    }).catch(() => {
      showNotification('Error al copiar el texto.');
    });
  });

  clearBtn.addEventListener('click', () => {
    confirmedText = '';
    transcriptArea.value = '';
    updateWordCount('');
    showNotification('Memoria reiniciada.');
  });

  function showNotification(msg) {
    const existingToast = document.getElementById('quantum-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.id = 'quantum-toast';
    toast.className = 'fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/95 border border-cyan-400 text-cyan-300 px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] text-[11px] sm:text-xs font-mono-custom tracking-wider text-center max-w-[90vw]';
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2000);
  }

  drawIdleVisualizer();
});