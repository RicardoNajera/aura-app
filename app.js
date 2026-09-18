// Registro de Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Aura SW activo:', reg.scope))
      .catch(err => console.error('Error en SW:', err));
  });
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isHolding = false;
let sessionTranscript = '';

const micBtn = document.getElementById('mic-btn');
const micIcon = document.getElementById('mic-icon');
const micLabel = document.getElementById('mic-label');
const statusBadge = document.getElementById('status-badge');
const ledIndicator = document.getElementById('led-indicator');
const transcriptBox = document.getElementById('transcript');
const wordCounter = document.getElementById('word-counter');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');

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

    // Texto limpio con saltos de línea normales (sin etiquetas HTML feas)
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
    // Si el usuario sigue presionando pero el navegador cortó la sesión, reiniciamos automáticamente
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

// Funciones para Mantener Presionado (Push-To-Talk / PTT)
function startListening(e) {
  e.preventDefault();
  if (!recognition || isHolding) return;

  isHolding = true;
  updateUI(true);

  // Añadir un salto de línea limpio si ya había texto previo para separar transmisiones
  if (sessionTranscript.trim() !== '') {
    sessionTranscript += '\n• ';
  } else {
    sessionTranscript = '• ';
  }

  try {
    recognition.start();
  } catch (err) {
    console.log('Ya estaba activo', err);
  }
}

function stopListening(e) {
  e.preventDefault();
  if (!isHolding) return;

  isHolding = false;
  updateUI(false);

  try {
    recognition.stop();
  } catch (err) {
    console.log('Detenido', err);
  }
}

// Eventos de Mouse (Computadora) y Touch (Celular)
micBtn.addEventListener('mousedown', startListening);
micBtn.addEventListener('mouseup', stopListening);
micBtn.addEventListener('mouseleave', stopListening);

micBtn.addEventListener('touchstart', startListening, { passive: false });
micBtn.addEventListener('touchend', stopListening, { passive: false });
micBtn.addEventListener('touchcancel', stopListening, { passive: false });

// Control Visual Apple Glass
function updateUI(active) {
  if (active) {
    micBtn.classList.add('recording');
    micIcon.textContent = '🗣️';
    micLabel.textContent = 'REC';
    statusBadge.textContent = 'TRANSMITIENDO';
    statusBadge.classList.add('active');
    ledIndicator.classList.add('active');
  } else {
    micBtn.classList.remove('recording');
    micIcon.textContent = '🎙️';
    micLabel.textContent = 'HOLD';
    statusBadge.textContent = 'STANDBY';
    statusBadge.classList.remove('active');
    ledIndicator.classList.remove('active');
  }
}

// Botones de apoyo
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