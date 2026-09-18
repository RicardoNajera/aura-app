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
  let speechActivity = 0.15; // Nivel base de actividad simulada

  // Adaptación Retina/4K Canvas
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

  function setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showNotification('Navegador sin soporte de voz nativo.');
      return null;
    }

    const instance = new SpeechRecognition();
    instance.continuous = true;
    instance.interimResults = true;
    instance.maxAlternatives = 1;
    instance.lang = 'es-MX';

    // Eventos para alimentar el visualizador orgánico sin bloquear el hardware del micrófono
    instance.onsoundstart = () => { speechActivity = 0.4; };
    instance.onspeechstart = () => { speechActivity = 0.7; };
    instance.onsoundend = () => { speechActivity = 0.15; };

    instance.onresult = (event) => {
      speechActivity = 1.0; // Pico visual máximo al detectar palabras
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
    speechActivity = 0.3; // Impulso visual inicial al presionar

    coreTrigger.classList.add('glass-panel-active');
    coreIconContainer.classList.remove('bg-cyan-950/80', 'text-cyan-400');
    coreIconContainer.classList.add('bg-cyan-400', 'text-slate-950', 'shadow-[0_0_30px_rgba(0,240,255,0.8)]');
    coreLabel.textContent = 'Transmitiendo... (Suelta para enviar)';
    statusBadge.textContent = 'En Vivo';
    statusDot.className = 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-ping';

    if (!recognition) {
      recognition = setupSpeechRecognition();
    }
    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        console.warn('El motor de voz ya estaba activo o falló:', e);
      }
    }
  }

  function stopSession() {
    if (!isRecording) return;
    isRecording = false;

    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }

    coreTrigger.classList.remove('glass-panel-active');
    coreIconContainer.classList.remove('bg-cyan-400', 'text-slate-950', 'shadow-[0_0_30px_rgba(0,240,255,0.8)]');
    coreIconContainer.classList.add('bg-cyan-950/80', 'text-cyan-400');
    coreLabel.textContent = 'Mantén presionado para hablar';
    statusBadge.textContent = 'Standby';
    statusDot.className = 'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-500';
  }

  // Bucle de renderizado continuo y fluido
  function loop() {
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.clearRect(0, 0, width, height);

    const barCount = width < 380 ? 18 : 26;
    const gap = 3;
    const barWidth = (width / barCount) - gap;

    if (isRecording) {
      // Decaimiento orgánico de la actividad para que no se quede estático
      speechActivity = Math.max(0.15, speechActivity - 0.015);
      
      // Sensibilidad visual combinando los eventos del micrófono y una onda sinusoidal
      let sensitivity = speechActivity + (Math.sin(Date.now() * 0.008) * 0.1);

      sensVal.textContent = `${(Math.min(100, sensitivity * 100)).toFixed(1)}%`;
      ambientGlow.style.transform = `scale(${1 + (sensitivity * 0.3)})`;
      ambientGlow.style.opacity = `${0.3 + (sensitivity * 0.7)}`;

      let x = gap / 2;
      for (let i = 0; i < barCount; i++) {
        // Base de la onda
        let rawTarget = Math.abs(Math.sin((Date.now() * 0.005) + (i * 0.4))) * sensitivity;
        
        // Añadir picos caóticos si hay actividad de voz fuerte para simular decibelios
        if (speechActivity > 0.4) {
          rawTarget += Math.random() * (speechActivity * 0.6);
        }
        
        rawTarget = Math.min(1, rawTarget);

        // Interpolación lineal (LERP) para transiciones muy suaves
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
      // Estado de reposo animado
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
        smoothBars[i] = (smoothBars[i] || 0) * 0.8; // Apagar barras suavemente
      }
    }

    requestAnimationFrame(loop);
  }

  // Eventos Push-to-Talk nativos (Walkie-Talkie)
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

  // Evita que aparezca el menú de "guardar imagen/texto" al mantener presionado en móviles
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