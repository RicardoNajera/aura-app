// Registro de Service Worker para PWA (v1.1)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Aura v1.1 SW activo:', reg.scope))
      .catch(err => console.error('Error en SW:', err));
  });
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isHolding = false;
let sessionTranscript = '';

// Variables para el Analizador de Audio de las ondas Siri
let audioContext = null;
let analyser = null;
let microphone = null;
let animationId = null;

const micBtn = document.getElementById('mic-btn');
const micLabel = document.getElementById('mic-label');
const statusBadge = document.getElementById('status-badge');
const transcriptBox = document.getElementById('transcript');
const wordCounter = document.getElementById('word-counter');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const waveBars = document.querySelectorAll('.wave-bar');

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'es-MX';

  recognition.onresult = (event) => {
    let interim = '';
    let finalChunk = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const text = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalChunk += text + ' ';
      } else {
        interim += text;
      }
    }

    if (finalChunk) {
      sessionTranscript += finalChunk;
    }

    const fullDisplay = sessionTranscript + interim;
    transcriptBox.value = fullDisplay;
    transcriptBox.scrollTop = transcriptBox.scrollHeight;

    const words = fullDisplay.trim().split(/\s+/).filter(w => w.length > 0);
    wordCounter.textContent = `${words.length} PALABRAS`;
  };

  recognition.onerror = (event) => {
    console.warn('Error de voz:', event.error);
  };

  recognition.onend = () => {
    if (isHolding) {
      try {
        recognition.start();
      } catch (e) {
        console.log('Reiniciando stream...', e);
      }
    }
  };
} else {
  alert('Tu navegador no soporta API de Voz.');
}

// Iniciar Analizador de Audio Real para mover las barras con la voz
async function startAudioAnalyzer() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    
    microphone.connect(analyser);
    analyser.fftSize = 64;
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function renderWaves() {
      if (!isHolding) return;
      analyser.getByteFrequencyData(dataArray);

      waveBars.forEach((bar, index) => {
        // Tomar valores de frecuencia y mapearlos a una altura visual orgánica
        const value = dataArray[index % dataArray.length] || 10;
        const height = Math.max(6, (value / 255) * 36);
        bar.style.height = `${height}px`;
      });

      animationId = requestAnimationFrame(renderWaves);
    }

    renderWaves();
  } catch (err) {
    console.warn('No se pudo acceder al micrófono para las ondas:', err);
    // Fallback simulado si el navegador bloquea el stream duplicado
    simulateOrganicWaves();
  }
}

function stopAudioAnalyzer() {
  if (animationId) cancelAnimationFrame(animationId);
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close();
  }
  // Resetear barras
  waveBars.forEach(bar => bar.style.height = '10px');
}

// Fallback de animación orgánica si el analizador directo choca con el reconocimiento
function simulateOrganicWaves() {
  if (!isHolding) return;
  waveBars.forEach(bar => {
    const randomHeight = Math.floor(Math.random() * 28) + 6;
    bar.style.height = `${randomHeight}px`;
  });
  animationId = setTimeout(simulateOrganicWaves, 80);
}

// Funciones Push-To-Talk
function startListening(e) {
  e.preventDefault();
  if (!recognition || isHolding) return;

  isHolding = true;
  updateUI(true);
  startAudioAnalyzer();

  if (sessionTranscript.trim() !== '') {
    sessionTranscript += '\n• ';
  } else {
    sessionTranscript = '• ';
  }

  try {
    recognition.start();
  } catch (err) {
    console.log('Ya activo', err);
  }
}

function stopListening(e) {
  e.preventDefault();
  if (!isHolding) return;

  isHolding = false;
  updateUI(false);
  stopAudioAnalyzer();

  try {
    recognition.stop();
  } catch (err) {
    console.log('Detenido', err);
  }
}

// Eventos de control táctil y mouse
micBtn.addEventListener('mousedown', startListening);
micBtn.addEventListener('mouseup', stopListening);
micBtn.addEventListener('mouseleave', stopListening);

micBtn.addEventListener('touchstart', startListening, { passive: false });
micBtn.addEventListener('touchend', stopListening, { passive: false });
micBtn.addEventListener('touchcancel', stopListening, { passive: false });

function updateUI(active) {
  if (active) {
    micBtn.classList.add('recording');
    micLabel.textContent = 'ESCUCHANDO...';
    statusBadge.textContent = 'LIVE v1.1';
    statusBadge.classList.add('active');
  } else {
    micBtn.classList.remove('recording');
    micLabel.textContent = 'MANTÉN PRESIONADO PARA HABLAR';
    statusBadge.textContent = 'STANDBY';
    statusBadge.classList.remove('active');
  }
}

copyBtn.addEventListener('click', () => {
  if (!transcriptBox.value) return;
  navigator.clipboard.writeText(transcriptBox.value).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copiado';
    setTimeout(() => copyBtn.textContent = originalText, 1500);
  });
});

clearBtn.addEventListener('click', () => {
  sessionTranscript = '';
  transcriptBox.value = '';
  wordCounter.textContent = '0 PALABRAS';
});