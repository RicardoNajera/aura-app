// Registro de Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Aura SW activo:', reg.scope))
      .catch(err => console.error('Error en SW:', err));
  });
}

// Variables del motor de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;
let finalTranscript = '';

// Elementos UI
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
  recognition.continuous = true;       // Escucha ininterrumpida
  recognition.interimResults = true;    // Transcripción instantánea palabra a palabra
  recognition.lang = 'es-MX';

  recognition.onresult = (event) => {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const segment = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += segment + ' ';
      } else {
        interimTranscript += segment;
      }
    }

    const currentFullText = finalTranscript + interimTranscript;
    transcriptBox.value = currentFullText;
    
    // Auto-scroll fluido al final
    transcriptBox.scrollTop = transcriptBox.scrollHeight;

    // Conteo de palabras en tiempo real
    const wordList = currentFullText.trim().split(/\s+/).filter(w => w.length > 0);
    wordCounter.textContent = `${wordList.length} PALABRAS`;
  };

  // Reconexión automática si el navegador pausa la escucha por silencio
  recognition.onend = () => {
    if (isListening) {
      try {
        recognition.start();
      } catch (e) {
        console.log('Reiniciando stream...', e);
      }
    } else {
      updateUI(false);
    }
  };

  recognition.onerror = (event) => {
    console.warn('Alerta de voz:', event.error);
  };

} else {
  alert('Tu navegador no soporta API de Voz.');
}

// Control de Activación
function toggleListening() {
  if (!recognition) return;

  if (!isListening) {
    try {
      recognition.start();
      isListening = true;
      updateUI(true);
    } catch (err) {
      console.error("Error al arrancar:", err);
    }
  } else {
    isListening = false;
    recognition.stop();
    updateUI(false);
  }
}

// Cambio de Estados Visuales Apple Glass
function updateUI(active) {
  if (active) {
    micBtn.classList.add('recording');
    micIcon.textContent = '⏹️';
    micLabel.textContent = 'STOP';
    statusBadge.textContent = 'LIVE';
    statusBadge.classList.add('active');
    ledIndicator.classList.add('active');
  } else {
    micBtn.classList.remove('recording');
    micIcon.textContent = '🎙️';
    micLabel.textContent = 'RECORD';
    statusBadge.textContent = 'STANDBY';
    statusBadge.classList.remove('active');
    ledIndicator.classList.remove('active');
  }
}

// Event Listeners
micBtn.addEventListener('click', toggleListening);

copyBtn.addEventListener('click', () => {
  if (!transcriptBox.value) return;
  navigator.clipboard.writeText(transcriptBox.value).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓ Copiado';
    setTimeout(() => copyBtn.textContent = originalText, 1500);
  });
});

clearBtn.addEventListener('click', () => {
  finalTranscript = '';
  transcriptBox.value = '';
  wordCounter.textContent = '0 PALABRAS';
});