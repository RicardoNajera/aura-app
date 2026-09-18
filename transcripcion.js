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
  let recognition = null;
  let confirmedText = '';
  let smoothBars = [];
  let speechActivity = 0.15; 

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.resetTransform?.() || ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  if (window.ResizeObserver) {
    new ResizeObserver(resizeCanvas).observe(canvas);
  } else {
    window.addEventListener('resize', resizeCanvas);
  }
  resizeCanvas();

  function updateWordCount(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCounter.textContent = `${words} Palabra${words === 1 ? '' : 's'}`;
  }

  transcriptArea.addEventListener('input', (e) => {
    confirmedText = e.target.value + ' ';
    updateWordCount(e.target.value);
  });

  function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showNotification('Navegador sin soporte de voz nativo.');
      return null;
    }

    const instance = new SpeechRecognition();
    instance.continuous = true;
    // APAGADO PARA GARANTIZAR ESTABILIDAD EN ANDROID: Solo entrega texto al soltar el botón
    instance.interimResults = false; 
    instance.maxAlternatives = 1;
    instance.lang = 'es-MX';

    instance.onsoundstart = () => { speechActivity = 0.4; };
    instance.onspeechstart = () => { speechActivity = 0.7; };
    instance.onsoundend = () => { speechActivity = 0.15; };

    instance.onresult = (event) => {
      let finalSegment = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalSegment += event.results[i][0].transcript;
        }
      }

      if (finalSegment.trim()) {
        confirmedText = (confirmedText + ' ' + finalSegment.trim()).trim() + ' ';
        transcriptArea.value = confirmedText.trim();
        transcriptArea.scrollTop = transcriptArea.scrollHeight;
        updateWordCount(transcriptArea.value);
      }
    };

    instance.onend = () => {
      // Restaura el texto de la interfaz una vez que el motor termina de procesar y entregar el resultado
      if (!isRecording) {
        coreLabel.textContent = 'Mantén presionado para hablar';
      }
    };

    instance.onerror = (e) => {
      if (e.error === 'not-allowed') {
        showNotification('Permiso de micrófono denegado.');
        stopSession();
      }
    };

    return instance;
  }

  function startSession() {
    if (isRecording) return;
    isRecording = true;
    speechActivity = 0.3; 

    coreTrigger.classList.add('glass-panel-active');
    coreIconContainer.classList.remove('bg-cyan-950/80', 'text-cyan-400');
    coreIconContainer.classList.add('bg-cyan-400', 'text-slate-950', 'shadow-[0_0_30px_rgba(0,240,255,0.8)]');
    coreLabel.textContent = 'Escuchando... (Suelta para procesar)';
    statusBadge.textContent = 'En Vivo';
    statusDot.className = 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping';

    if (!recognition) {
      recognition = setupSpeechRecognition();
    }
    if (recognition) {
      try {
        recognition.start();
      } catch (e) {}
    }
  }

  function stopSession() {
    if (!isRecording) return;
    isRecording = false;

    if (recognition) {
      try {
        recognition.stop();
        // Indica visualmente que se está procesando el audio en los servidores
        coreLabel.textContent = 'Procesando texto...';
      } catch (e) {}
    }

    coreTrigger.classList.remove('glass-panel-active');
    coreIconContainer.classList.remove('bg-cyan-400', 'text-slate-950', 'shadow-[0_0_30px_rgba(0,240,255,0.8)]');
    coreIconContainer.classList.add('bg-cyan-950/80', 'text-cyan-400');
    statusBadge.textContent = 'Standby';
    statusDot.className = 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-500';
  }

  function loop() {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.clearRect(0, 0, width, height);

    const barCount = width < 380 ? 18 : 26;
    const gap = 3;
    const barWidth = (width / barCount) - gap;

    if (isRecording) {
      speechActivity = Math.max(0.15, speechActivity - 0.015);
      let sensitivity = speechActivity + (Math.sin(Date.now() * 0.008) * 0.1);

      sensVal.textContent = `${(Math.min(100, sensitivity * 100)).toFixed(1)}%`;
      ambientGlow.style.transform = `scale(${1 + (sensitivity * 0.3)})`;
      ambientGlow.style.opacity = `${0.3 + (sensitivity * 0.7)}`;

      let x = gap / 2;
      for (let i = 0; i < barCount; i++) {
        let rawTarget = Math.abs(Math.sin((Date.now() * 0.005) + (i * 0.4))) * sensitivity;
        
        if (speechActivity > 0.4) {
          rawTarget += Math.random() * (speechActivity * 0.6);
        }
        
        rawTarget = Math.min(1, rawTarget);
        smoothBars[i] = (smoothBars[i] || 0) * 0.75 + rawTarget * 0.25;

        const barHeight = Math.max(4, smoothBars[i] * (height * 0.8));
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
    } else {
      sensVal.textContent = '0.0%';
      ambientGlow.style.transform = 'scale(1)';
      ambientGlow.style.opacity = '0.25';

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

      for (let i = 0; i < barCount; i++) {
        smoothBars[i] = (smoothBars[i] || 0) * 0.8; 
      }
    }

    requestAnimationFrame(loop);
  }

  coreTrigger.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    coreTrigger.setPointerCapture?.(e.pointerId);
    startSession();
  });

  coreTrigger.addEventListener('pointerup', (e) => {
    e.preventDefault();
    stopSession();
  });

  coreTrigger.addEventListener('pointercancel', (e) => {
    stopSession();
  });

  coreTrigger.addEventListener('contextmenu', (e) => e.preventDefault());

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

  coreLabel.textContent = 'Mantén presionado para hablar';
  loop();
});