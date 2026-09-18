// Registro del Service Worker para funcionamiento Offline y PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrado con éxito:', reg.scope))
            .catch(err => console.error('Error al registrar el Service Worker:', err));
    });
}

// Lógica de Instalación de la PWA
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('El usuario aceptó instalar la PWA');
            } else {
                console.log('El usuario canceló la instalación');
            }
            deferredPrompt = null;
        });
    });
});

// Lógica de Reconocimiento de Voz / Transcripción en Tiempo Real
const micBtn = document.getElementById('mic-btn');
const micText = document.getElementById('mic-text');
const transcriptBox = document.getElementById('transcript');
const statusText = document.getElementById('status-text');

let recognition;
let isListening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        isListening = true;
        micBtn.classList.add('listening');
        micText.textContent = 'Escuchando...';
        statusText.textContent = 'Grabando reporte de voz en curso';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        if (finalTranscript !== '') {
            transcriptBox.innerHTML += `<br>• ${finalTranscript}`;
            transcriptBox.scrollTop = transcriptBox.scrollHeight;
        }
    };

    recognition.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
        statusText.textContent = 'Error en el canal de voz';
    };

    recognition.onend = () => {
        isListening = false;
        micBtn.classList.remove('listening');
        micText.textContent = 'Iniciar Voz';
        statusText.textContent = 'Sistema Operativo Conectado';
    };

    micBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

} else {
    micText.textContent = 'No compatible';
    micBtn.disabled = true;
    statusText.textContent = 'Tu navegador no soporta API de Voz';
}