// Registro de Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW activo:', reg.scope))
      .catch(err => console.error('Error SW:', err));
  });
}

// Variables Globales
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;
let finalTranscript = '';

// Elementos de la UI
const micBtn = document.getElementById('mic-btn');
const micIcon = document.getElementById('mic-icon');
const micLabel = document.getElementById('mic-label');
const statusBadge = document.getElementById('status-badge');
const ledIndicator = document.getElementById('led-indicator');
const transcriptBox = document.getElementById('transcript');
const wordCountDisplay = document.getElementById('word-count');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');

// Inicializar Reconocimiento de Voz
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;       // Mantiene escuchando sin parar
  recognition.interimResults = true;    // Transcribe en tiempo real conforme hablas
  recognition.lang = 'es-MX';           // Español Latino

  // Captura de audio e inserción continua
  recognition.onresult = (event) => {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcriptSegment = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcriptSegment + ' ';
      } else {
        interimTranscript += transcriptSegment;
      }
    }

    // Renderizar en la pantalla LCD
    const currentText = finalTranscript + interimTranscript;
    transcriptBox.value = currentText;
    
    // Auto-scroll hacia abajo
    transcriptBox.scrollTop = transcriptBox.scrollHeight;

    // Actualizar contador de palabras
    const words = currentText.trim().split(/\s+/).filter(w => w.length > 0);
    wordCountDisplay.textContent = `${words.length} PALABRAS`;
  };

  // Manejo de cierres involuntarios del navegador (Reinicio Automático Inmediato)
  recognition.onend = () => {
    if (isListening) {
      try {
        recognition.start();
      } catch (e) {
        console.log('Reinicio de micrófono...', e);
      }
    } else {
      setUIState(false);
    }
  };

  recognition.onerror = (event) => {
    console.warn('Evento de voz:', event.error);
    if (event.error === 'network') {
      statusBadge.textContent = 'ERROR RED';
    }
  };

} else {
  alert('Tu navegador no soporta Reconocimiento de Voz. Intenta en Chrome o Safari.');
}

// Alternar Estado de Grabación
function toggleListening() {
  if (!recognition) return;

  if (!isListening) {
    try {
      recognition.start();
      isListening = true;
      setUIState(true);
    } catch (err) {
      console.error("Error al iniciar:", err);
    }
  } else {
    isListening = false;
    recognition.stop();
    setUIState(false);
  }
}

// Control Visual del Estado
function setUIState(active) {
  if (active) {
    micBtn.classList.add('recording');
    micIcon.textContent = '⏹️';
    micLabel.textContent = 'DETENER';
    statusBadge.textContent = 'TRANSMITIENDO';
    statusBadge.classList.add('transmitting');
    ledIndicator.classList.add('active');
  } else {
    micBtn.classList.remove('recording');
    micIcon.textContent = '🎙️';
    micLabel.textContent = 'TRANSMITIR';
    statusBadge.textContent = 'EN ESPERA';
    statusBadge.classList.remove('transmitting');
    ledIndicator.classList.remove('active');
  }
}

// Event Listeners
micBtn.addEventListener('click', toggleListening);

// Botón Copiar Texto
copyBtn.addEventListener('click', () => {
  if (!transcriptBox.value) return;
  navigator.clipboard.writeText(transcriptBox.value).then(() => {
    const prevText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copiado!';
    setTimeout(() => copyBtn.textContent = prevText, 1500);
  });
});

// Botón Limpiar Pantalla
clearBtn.addEventListener('click', () => {
  finalTranscript = '';
  transcriptBox.value = '';
  wordCountDisplay.textContent = '0 PALABRAS';
});