export default {
  html: () => {
    return `
      <style>
        /* =========================================
           1. CORE ANIMATIONS & APPLE EFFECTS
           ========================================= */
        @keyframes pop-receive {
          0% { transform: scale(0.95); opacity: 0.5; filter: blur(4px); }
          50% { transform: scale(1.02); filter: blur(0px) brightness(1.2); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px) brightness(1); }
        }
        
        /* Animación ultra-fluida para las nuevas burbujas de chat */
        @keyframes bubble-in {
          0% { transform: scale(0.85) translateY(15px); opacity: 0; filter: blur(8px); }
          100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
        }

        @keyframes text-glow-magic {
          0% { color: transparent; text-shadow: 0 0 20px rgba(255,255,255,0); opacity: 0; transform: translateY(5px); }
          30% { color: #ffffff; text-shadow: 0 0 15px rgba(255,255,255,1); opacity: 1; transform: translateY(0); }
          100% { color: rgba(255,255,255,0.95); text-shadow: 0 0 5px rgba(255,255,255,0.3); }
        }
        
        @keyframes orb-float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes siri-staff-glow {
          0% { box-shadow: 0 0 20px 5px rgba(10,132,255,0.4), inset 0 0 20px rgba(94,92,230,0.5); }
          50% { box-shadow: 0 0 45px 15px rgba(10,132,255,0.8), inset 0 0 30px rgba(94,92,230,0.8); background: rgba(10,132,255,0.3); }
          100% { box-shadow: 0 0 20px 5px rgba(10,132,255,0.4), inset 0 0 20px rgba(94,92,230,0.5); }
        }
        @keyframes siri-guest-glow {
          0% { box-shadow: 0 0 20px 5px rgba(255,159,10,0.4), inset 0 0 20px rgba(255,55,95,0.5); }
          50% { box-shadow: 0 0 45px 15px rgba(255,159,10,0.8), inset 0 0 30px rgba(255,55,95,0.8); background: rgba(255,159,10,0.3); }
          100% { box-shadow: 0 0 20px 5px rgba(255,159,10,0.4), inset 0 0 20px rgba(255,55,95,0.5); }
        }

        /* =========================================
           2. GLASSMORPHISM & UI COMPONENTS
           ========================================= */
        .apple-glass {
          background: rgba(28, 28, 30, 0.45);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .apple-glass-red {
          background: rgba(255, 59, 48, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 59, 48, 0.3);
          box-shadow: 0 10px 30px rgba(255, 59, 48, 0.2);
        }
        
        .scanner-pill {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
        }

        .anim-receive { animation: pop-receive 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .anim-text-glow { animation: text-glow-magic 1.2s ease-out forwards; }
        .animate-bubble-in { animation: bubble-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        .bubble-transition { transition: all 0.6s cubic-bezier(0.25, 1, 0.3, 1); }
        .btn-cancelar { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .onda-voz { transition: transform 0.08s ease-out; }
        
        .onda-activa-staff { animation: siri-staff-glow 2s infinite ease-in-out; }
        .onda-activa-guest { animation: siri-guest-glow 2s infinite ease-in-out; }

        /* Máscara de desvanecimiento para el scroll (Efecto iOS) */
        .scroll-mask {
          mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);
        }

        /* SCROLLBAR INVISIBLE */
        ::-webkit-scrollbar { width: 0px; background: transparent; }
      </style>

      <div class="flex-1 flex flex-col h-full w-full bg-[#000000] text-white relative overflow-hidden font-sans select-none">
        
        <!-- FONDOS ORGÁNICOS -->
        <div class="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#0A84FF]/10 rounded-full blur-[120px] pointer-events-none" style="animation: orb-float 15s infinite alternate ease-in-out;"></div>
        <div class="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#FF9F0A]/10 rounded-full blur-[120px] pointer-events-none" style="animation: orb-float 18s infinite alternate-reverse ease-in-out;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5E5CE6]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <!-- HEADER CRISTALINO -->
        <header class="pt-14 pb-4 px-6 z-20 flex items-center justify-between absolute top-0 w-full bg-gradient-to-b from-black/80 to-transparent">
          <button id="btn-cerrar-traductor" class="w-11 h-11 rounded-full apple-glass flex items-center justify-center text-white/80 active:scale-90 transition-transform duration-300 group">
            <svg class="w-5 h-5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          <div class="apple-glass px-5 py-2 rounded-full flex flex-col items-center shadow-lg">
            <h1 class="text-[14px] font-bold tracking-widest text-white/95 uppercase font-mono">Aura AI</h1>
            <h2 class="text-[10px] font-medium text-white/40 tracking-[0.2em] uppercase mt-0.5">Live Interpreter</h2>
          </div>
          
          <div class="w-11"></div> 
        </header>

        <!-- ZONA DE CONVERSACIÓN (Burbujas dinámicas con Scroll Mask) -->
        <div class="flex-1 flex flex-col p-6 gap-8 justify-center z-10 overflow-y-auto max-w-2xl mx-auto w-full relative mt-16 mb-32 scroll-mask">
          
          <!-- CONTENEDOR STAFF -->
          <div id="bubble-staff" class="bubble-transition apple-glass rounded-[36px] p-5 sm:p-7 relative overflow-hidden group h-auto w-full">
            <div class="absolute inset-0 bg-gradient-to-br from-[#0A84FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div class="flex items-center justify-between mb-5 relative z-10">
              <div class="flex items-center gap-4">
                <div class="scanner-pill min-w-[56px] min-h-[36px] h-auto rounded-[18px] flex flex-wrap items-center justify-center px-3 py-1 gap-1.5 shadow-[0_0_15px_rgba(10,132,255,0.15)] relative">
                  <div class="absolute inset-0 rounded-[18px] border border-[#0A84FF]/20 animate-pulse pointer-events-none"></div>
                  <span id="iconos-staff" class="text-[16px] tracking-[0.1em] text-center leading-tight drop-shadow-md">👨🇲🇽</span>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em]">Personal</p>
                  <p id="lang-staff" class="text-[14px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6]">Español</p>
                </div>
              </div>
              <div id="typing-staff" class="hidden items-center gap-1.5 opacity-80">
                <div class="w-2 h-2 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] rounded-full animate-bounce shadow-[0_0_8px_#0A84FF]"></div>
                <div class="w-2 h-2 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] rounded-full animate-bounce shadow-[0_0_8px_#0A84FF]" style="animation-delay: 0.15s"></div>
                <div class="w-2 h-2 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] rounded-full animate-bounce shadow-[0_0_8px_#0A84FF]" style="animation-delay: 0.3s"></div>
              </div>
            </div>

            <!-- Aquí se inyectan las burbujas futuristas -->
            <div id="texto-staff" class="min-h-[48px] relative z-10 w-full transition-all duration-300 flex flex-col justify-center">
              
              <!-- Burbuja Inicial por defecto (Estilo Chat) -->
              <div class="flex flex-row items-end gap-2 sm:gap-3 w-full animate-bubble-in">
                  <div class="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[16px] shadow-sm backdrop-blur-md">
                      🤖
                  </div>
                  <div class="flex flex-col items-start max-w-[85%]">
                      <div class="px-4 py-3 rounded-[20px] rounded-bl-[4px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg relative overflow-hidden">
                          <p class="text-[16px] sm:text-[18px] font-medium leading-relaxed text-white/80 relative z-10 break-words whitespace-pre-wrap">Toca el botón azul para hablar.</p>
                      </div>
                  </div>
              </div>

            </div>
          </div>

          <!-- CONTENEDOR GUEST -->
          <div id="bubble-guest" class="bubble-transition apple-glass rounded-[36px] p-5 sm:p-7 relative overflow-hidden group h-auto w-full">
            <div class="absolute inset-0 bg-gradient-to-bl from-[#FF9F0A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div class="flex items-center justify-between mb-5 relative z-10 flex-row-reverse">
              <div class="flex items-center gap-4 flex-row-reverse">
                <div class="scanner-pill min-w-[56px] min-h-[36px] h-auto rounded-[18px] flex flex-wrap items-center justify-center px-3 py-1 gap-1.5 shadow-[0_0_15px_rgba(255,159,10,0.15)] relative flex-row-reverse">
                  <div class="absolute inset-0 rounded-[18px] border border-[#FF9F0A]/20 animate-pulse pointer-events-none"></div>
                  <span id="iconos-guest" class="text-[16px] tracking-[0.1em] text-center leading-tight drop-shadow-md">👤🇺🇸</span>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em]">Huésped</p>
                  <p id="lang-guest" class="text-[14px] font-semibold text-transparent bg-clip-text bg-gradient-to-l from-[#FF9F0A] to-[#FF375F]">Inglés</p>
                </div>
              </div>
              <div id="typing-guest" class="hidden items-center gap-1.5 opacity-80">
                <div class="w-2 h-2 bg-gradient-to-l from-[#FF9F0A] to-[#FF375F] rounded-full animate-bounce shadow-[0_0_8px_#FF9F0A]"></div>
                <div class="w-2 h-2 bg-gradient-to-l from-[#FF9F0A] to-[#FF375F] rounded-full animate-bounce shadow-[0_0_8px_#FF9F0A]" style="animation-delay: 0.15s"></div>
                <div class="w-2 h-2 bg-gradient-to-l from-[#FF9F0A] to-[#FF375F] rounded-full animate-bounce shadow-[0_0_8px_#FF9F0A]" style="animation-delay: 0.3s"></div>
              </div>
            </div>
            
            <!-- Aquí se inyectan las burbujas futuristas (Alineadas a la derecha por defecto) -->
            <div id="texto-guest" class="min-h-[48px] relative z-10 w-full transition-all duration-300 flex flex-col justify-center">
              
              <!-- Burbuja Inicial por defecto -->
              <div class="flex flex-row-reverse items-end gap-2 sm:gap-3 w-full animate-bubble-in">
                  <div class="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[16px] shadow-sm backdrop-blur-md">
                      🤖
                  </div>
                  <div class="flex flex-col items-end max-w-[85%]">
                      <div class="px-4 py-3 rounded-[20px] rounded-br-[4px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg relative overflow-hidden">
                          <p class="text-[16px] sm:text-[18px] font-medium leading-relaxed text-white/80 relative z-10 break-words whitespace-pre-wrap text-right">Toca el botón naranja para responder.</p>
                      </div>
                  </div>
              </div>

            </div>
          </div>

        </div>

        <!-- ZONA DE CONTROLES -->
        <div class="pb-12 pt-6 px-6 z-20 w-full absolute bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent">
          <div class="apple-glass rounded-[48px] p-5 flex items-center justify-between max-w-sm mx-auto relative overflow-hidden">
            
            <div class="flex items-center gap-2 relative">
              <button id="btn-cancelar-staff" class="btn-cancelar opacity-0 scale-50 pointer-events-none w-14 h-14 rounded-full apple-glass-red flex items-center justify-center text-red-400 active:scale-90 absolute -top-16 left-1 z-30">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div class="relative flex items-center justify-center z-10 w-20 h-20">
                <div id="wave-staff" class="onda-voz absolute inset-0 rounded-full blur-[2px] transition-all duration-300 pointer-events-none"></div>
                <button id="btn-grabar-staff" class="w-16 h-16 rounded-full bg-gradient-to-br from-[#5E5CE6] to-[#0A84FF] flex items-center justify-center shadow-[0_10px_30px_rgba(10,132,255,0.5)] active:scale-90 transition-transform duration-300 relative z-20 outline-none border border-white/20 cursor-pointer">
                  <svg class="w-7 h-7 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="w-[2px] h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent z-10"></div>

            <div class="flex items-center gap-2 flex-row-reverse relative">
              <button id="btn-cancelar-guest" class="btn-cancelar opacity-0 scale-50 pointer-events-none w-14 h-14 rounded-full apple-glass-red flex items-center justify-center text-red-400 active:scale-90 absolute -top-16 right-1 z-30">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div class="relative flex items-center justify-center z-10 w-20 h-20">
                <div id="wave-guest" class="onda-voz absolute inset-0 rounded-full blur-[2px] transition-all duration-300 pointer-events-none"></div>
                <button id="btn-grabar-guest" class="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF375F] to-[#FF9F0A] flex items-center justify-center shadow-[0_10px_30px_rgba(255,159,10,0.5)] active:scale-90 transition-transform duration-300 relative z-20 outline-none border border-white/20 cursor-pointer">
                  <svg class="w-7 h-7 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },
  
  iniciar: async () => {
    const btnGrabarStaff = document.getElementById('btn-grabar-staff');
    const btnGrabarGuest = document.getElementById('btn-grabar-guest');
    const btnCancelarStaff = document.getElementById('btn-cancelar-staff');
    const btnCancelarGuest = document.getElementById('btn-cancelar-guest');
    
    const waveStaff = document.getElementById('wave-staff');
    const waveGuest = document.getElementById('wave-guest');

    const bubbleStaff = document.getElementById('bubble-staff');
    const bubbleGuest = document.getElementById('bubble-guest');
    const typingStaff = document.getElementById('typing-staff');
    const typingGuest = document.getElementById('typing-guest');
    const textoStaff = document.getElementById('texto-staff');
    const textoGuest = document.getElementById('texto-guest');
    const langStaff = document.getElementById('lang-staff');
    const langGuest = document.getElementById('lang-guest');
    const iconosStaff = document.getElementById('iconos-staff');
    const iconosGuest = document.getElementById('iconos-guest');
    
    const WORKER_URL = "https://asistente-backend.auraradio-cloud.workers.dev/";
    
    let memoriaIdiomas = {
      staff: { iso: "es", nombre: "Español", bandera: "🇲🇽" },
      guest: { iso: "en", nombre: "Inglés", bandera: "🇺🇸" }
    };

    let grabandoRol = null; 
    let mediaRecorder = null;
    let audioChunks = [];
    let timeoutReset = null;
    let vocesDisponibles = [];
    let canceladoManualmente = false;
    let motorVozIniciado = false;
    
    let audioCtx = null;
    let analyser = null;
    let dataArray = null;
    let animacionOnda = null;
    let volumenMaximoDetectado = 0;
    let tiempoInicio = 0;

    const cargarVoces = () => { vocesDisponibles = window.speechSynthesis.getVoices(); };
    cargarVoces();
    if (window.speechSynthesis.onvoiceschanged !== undefined) window.speechSynthesis.onvoiceschanged = cargarVoces;

    const iniciarMotorVoz = () => {
      if (!motorVozIniciado && 'speechSynthesis' in window) {
        const silentUtterance = new SpeechSynthesisUtterance('');
        silentUtterance.volume = 0;
        window.speechSynthesis.speak(silentUtterance);
        motorVozIniciado = true;
      }
    };

    // ==============================================================================
    // GENERADOR DE BURBUJAS ESTILO WHATSAPP/IMESSAGE ULTRA FUTURISTA
    // ==============================================================================
    const renderizarDialogo = (hablantes, mostrarTraduccion, alineacionRight, tema) => {
      if (!hablantes || hablantes.length === 0) return "";
      
      return '<div class="flex flex-col gap-4 w-full mt-2">' + hablantes.map((h, index) => {
        const texto = mostrarTraduccion ? (h.frase_traducida || h.texto_traducido || "...") : (h.frase_original || h.texto_original || "...");
        const delay = index * 0.15; // Efecto cascada si hay varios hablando
        
        // Define los colores de la burbuja dependiendo de si está en la zona Staff (Azul) o Guest (Naranja)
        const bgClases = tema === "staff" 
            ? "bg-gradient-to-br from-[#0A84FF]/20 to-[#5E5CE6]/20 border-[#0A84FF]/30" 
            : "bg-gradient-to-bl from-[#FF9F0A]/20 to-[#FF375F]/20 border-[#FF9F0A]/30";

        if (alineacionRight) {
          // Burbuja alineada a la DERECHA (Sent message)
          return `
          <div class="flex flex-row-reverse items-end gap-2 sm:gap-3 w-full animate-bubble-in" style="animation-delay: ${delay}s; opacity: 0; animation-fill-mode: forwards;">
              <div class="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-[16px] shadow-sm backdrop-blur-md z-10">
                  ${h.icono_persona}
              </div>
              <div class="flex flex-col items-end max-w-[85%]">
                  <span class="text-[9px] sm:text-[10px] text-white/40 mr-1 mb-1 font-semibold tracking-widest uppercase">${h.nombre_idioma}</span>
                  <div class="px-4 sm:px-5 py-3 sm:py-4 rounded-[22px] rounded-br-[6px] ${bgClases} border backdrop-blur-xl shadow-lg relative overflow-hidden">
                      <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>
                      <p class="text-[16px] sm:text-[18px] font-medium leading-relaxed text-white/95 relative z-10 break-words whitespace-pre-wrap text-right">${texto}</p>
                  </div>
              </div>
          </div>`;
        } else {
          // Burbuja alineada a la IZQUIERDA (Received message)
          return `
          <div class="flex flex-row items-end gap-2 sm:gap-3 w-full animate-bubble-in" style="animation-delay: ${delay}s; opacity: 0; animation-fill-mode: forwards;">
              <div class="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-[16px] shadow-sm backdrop-blur-md z-10">
                  ${h.icono_persona}
              </div>
              <div class="flex flex-col items-start max-w-[85%]">
                  <span class="text-[9px] sm:text-[10px] text-white/40 ml-1 mb-1 font-semibold tracking-widest uppercase">${h.nombre_idioma}</span>
                  <div class="px-4 sm:px-5 py-3 sm:py-4 rounded-[22px] rounded-bl-[6px] ${bgClases} border backdrop-blur-xl shadow-lg relative overflow-hidden">
                      <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>
                      <p class="text-[16px] sm:text-[18px] font-medium leading-relaxed text-white/95 relative z-10 break-words whitespace-pre-wrap text-left">${texto}</p>
                  </div>
              </div>
          </div>`;
        }
      }).join('') + '</div>';
    };
    // ==============================================================================

    const setEstadoVisual = (estado, rolFuente = null) => {
      bubbleStaff.className = "bubble-transition apple-glass rounded-[36px] p-5 sm:p-7 relative overflow-hidden group h-auto w-full";
      bubbleGuest.className = "bubble-transition apple-glass rounded-[36px] p-5 sm:p-7 relative overflow-hidden group h-auto w-full flex-row-reverse";
      
      typingStaff.classList.add('hidden');
      typingGuest.classList.add('hidden');
      typingStaff.classList.remove('flex');
      typingGuest.classList.remove('flex');

      btnCancelarStaff.classList.replace('opacity-100', 'opacity-0');
      btnCancelarStaff.classList.replace('scale-100', 'scale-50');
      btnCancelarStaff.classList.add('pointer-events-none');
      btnCancelarGuest.classList.replace('opacity-100', 'opacity-0');
      btnCancelarGuest.classList.replace('scale-100', 'scale-50');
      btnCancelarGuest.classList.add('pointer-events-none');
      
      waveStaff.style.transform = "scale(1)";
      waveGuest.style.transform = "scale(1)";
      waveStaff.classList.remove('onda-activa-staff');
      waveGuest.classList.remove('onda-activa-guest');

      clearTimeout(timeoutReset);

      if (estado === "grabando") {
        if (rolFuente === "staff") {
          bubbleStaff.classList.add('scale-105', 'border-[#0A84FF]/40', 'bg-[#0A84FF]/10');
          bubbleGuest.classList.add('scale-95', 'opacity-30', 'blur-[4px]');
          btnCancelarStaff.classList.replace('opacity-0', 'opacity-100');
          btnCancelarStaff.classList.replace('scale-50', 'scale-100');
          btnCancelarStaff.classList.remove('pointer-events-none');
          waveStaff.classList.add('onda-activa-staff'); 
        } else {
          bubbleGuest.classList.add('scale-105', 'border-[#FF9F0A]/40', 'bg-[#FF9F0A]/10');
          bubbleStaff.classList.add('scale-95', 'opacity-30', 'blur-[4px]');
          btnCancelarGuest.classList.replace('opacity-0', 'opacity-100');
          btnCancelarGuest.classList.replace('scale-50', 'scale-100');
          btnCancelarGuest.classList.remove('pointer-events-none');
          waveGuest.classList.add('onda-activa-guest'); 
        }
      } 
      else if (estado === "procesando") {
        if (rolFuente === "staff") {
          typingGuest.classList.remove('hidden');
          typingGuest.classList.add('flex');
          bubbleGuest.classList.add('border-[#FF9F0A]/30', 'bg-[#FF9F0A]/5');
        } else {
          typingStaff.classList.remove('hidden');
          typingStaff.classList.add('flex');
          bubbleStaff.classList.add('border-[#0A84FF]/30', 'bg-[#0A84FF]/5');
        }
      }
      else if (estado === "recibiendo") {
        timeoutReset = setTimeout(() => { setEstadoVisual("idle"); }, 4000);
      }
    };

    const reproducirVozInteligente = (texto, iso, iconoDominante, audioBase64FallBack) => {
      if (audioBase64FallBack) {
        try {
          const reproductor = new Audio("data:audio/mp3;base64," + audioBase64FallBack);
          reproductor.play().catch(e => {
            console.warn("Autoplay bloqueado. Pasando a voz local...");
            usarVozNativa(texto, iso, iconoDominante);
          });
          return;
        } catch(e) { console.error("Fallo audio base64:", e); }
      }
      usarVozNativa(texto, iso, iconoDominante);
    };

    const usarVozNativa = (texto, iso, iconoDominante) => {
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        synth.cancel();

        let vocesFrescas = synth.getVoices();
        if (vocesFrescas.length > 0) vocesDisponibles = vocesFrescas;

        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = iso === 'es' ? 'es-MX' : (iso === 'en' ? 'en-US' : iso);
        utterance.rate = 1.05;

        let vocesIdioma = vocesDisponibles.filter(v => v.lang.toLowerCase().startsWith(iso.toLowerCase()));
        let vozSeleccionada = null;

        if (vocesIdioma.length > 0) {
          const esHombre = iconoDominante === '👨' || iconoDominante === '👦';
          if (esHombre) {
            vozSeleccionada = vocesIdioma.find(v => /(male|hombre|alvaro|jorge|carlos)/i.test(v.name));
          } else {
            vozSeleccionada = vocesIdioma.find(v => /(female|mujer|monica|paulina|helena)/i.test(v.name));
          }
          if (!vozSeleccionada) vozSeleccionada = vocesIdioma.find(v => v.name.includes('Google') || v.name.includes('Natural')) || vocesIdioma[0];
          utterance.voice = vozSeleccionada;
        }

        synth.speak(utterance);
      }
    };

    const enviarAudioAlServidor = async (audioBlob, rol) => {
      setEstadoVisual("procesando", rol);
      try {
        const formData = new FormData();
        const extension = audioBlob.type.includes('mp4') ? 'm4a' : 'webm';
        formData.append('audio', audioBlob, `grabacion.${extension}`);
        formData.append('rol', rol);
        formData.append('idiomaContrario', rol === "staff" ? memoriaIdiomas.guest.iso : memoriaIdiomas.staff.iso);

        const respuesta = await fetch(WORKER_URL, { method: 'POST', body: formData });
        if (!respuesta.ok) throw new Error("Error HTTP " + respuesta.status);
        
        const data = await respuesta.json();
        
        if (data.debug_error) {
            console.error("%c🚨 ERROR FORENSE DE GEMINI/BACKEND 🚨", "color: white; background: red; font-size: 16px; font-weight: bold; padding: 4px;");
            console.error("Detalle exacto del error:", data.debug_error);
        }

        const dominante = data.hablantes[0];
        const grupoVisual = data.hablantes.map(h => `${h.icono_persona}${h.bandera}`).join("  ");
        const multiNombre = data.hablantes.length > 1 ? dominante.nombre_idioma + " (+)" : dominante.nombre_idioma;
        
        if (rol === "staff") {
          memoriaIdiomas.staff = { iso: dominante.iso, nombre: dominante.nombre_idioma, bandera: dominante.bandera };
          iconosStaff.textContent = grupoVisual;
          langStaff.textContent = multiNombre;
          
          // Staff dice algo (Original, Alineado Derecha, Tema Staff)
          textoStaff.innerHTML = renderizarDialogo(data.hablantes, false, true, "staff");
          
          iconosGuest.textContent = `${memoriaIdiomas.guest.bandera}`;
          langGuest.textContent = data.nombre_destino;
          // Guest lo escucha traducido (Traducido, Alineado Izquierda, Tema Guest)
          textoGuest.innerHTML = renderizarDialogo(data.hablantes, true, false, "guest");
        } else {
          memoriaIdiomas.guest = { iso: dominante.iso, nombre: dominante.nombre_idioma, bandera: dominante.bandera };
          iconosGuest.textContent = grupoVisual;
          langGuest.textContent = multiNombre;
          
          // Guest dice algo (Original, Alineado Derecha, Tema Guest)
          textoGuest.innerHTML = renderizarDialogo(data.hablantes, false, true, "guest");
          
          iconosStaff.textContent = `${memoriaIdiomas.staff.bandera}`;
          langStaff.textContent = data.nombre_destino;
          // Staff lo escucha traducido (Traducido, Alineado Izquierda, Tema Staff)
          textoStaff.innerHTML = renderizarDialogo(data.hablantes, true, false, "staff");
        }

        setEstadoVisual("recibiendo", rol);
        
        if (data.texto_traducido.includes("No se detectó voz") || data.debug_error) {
           setTimeout(() => setEstadoVisual("idle"), 3000);
           return; 
        }

        reproducirVozInteligente(data.texto_traducido, data.iso_destino, dominante.icono_persona, data.audio_voz);

      } catch (error) {
        console.error("%c🚨 ERROR DE RED/FETCH 🚨", "color: white; background: orange; font-size: 14px;", error.message);
        
        // Bloque de error estilo chat futurista
        const errorHtml = `
          <div class="flex flex-row items-center gap-2 w-full animate-bubble-in mt-2 justify-center">
              <div class="px-4 py-3 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-md shadow-lg">
                  <p class="text-[16px] font-medium text-red-400">Error de red, intenta de nuevo.</p>
              </div>
          </div>`;
          
        if (rol === "staff") textoStaff.innerHTML = errorHtml;
        else textoGuest.innerHTML = errorHtml;
        setEstadoVisual("idle");
      }
    };

    const renderizarOndas = () => {
      if (!grabandoRol || !analyser) return;
      animacionOnda = requestAnimationFrame(renderizarOndas);
      analyser.getByteFrequencyData(dataArray);
      
      let suma = 0;
      for (let i = 0; i < dataArray.length; i++) suma += dataArray[i];
      let promedio = suma / dataArray.length;
      
      if (promedio > volumenMaximoDetectado) volumenMaximoDetectado = promedio;

      let escala = 1 + (promedio / 110); 
      if (escala > 1.9) escala = 1.9;

      if (grabandoRol === 'staff') waveStaff.style.transform = `scale(${escala})`;
      else waveGuest.style.transform = `scale(${escala})`;
    };

    const iniciarGrabacion = async (rol) => {
      iniciarMotorVoz();
      window.speechSynthesis.cancel(); 
      canceladoManualmente = false;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        volumenMaximoDetectado = 0;
        tiempoInicio = Date.now();

        let mimeType = '';
        if (typeof MediaRecorder.isTypeSupported === 'function') {
          if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) mimeType = 'audio/webm;codecs=opus';
          else if (MediaRecorder.isTypeSupported('audio/webm')) mimeType = 'audio/webm';
          else if (MediaRecorder.isTypeSupported('audio/mp4')) mimeType = 'audio/mp4';
        }

        mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) audioChunks.push(e.data); };

        mediaRecorder.onstop = () => {
          cancelAnimationFrame(animacionOnda);
          waveStaff.style.transform = "scale(1)";
          waveGuest.style.transform = "scale(1)";

          if (mediaRecorder.stream) mediaRecorder.stream.getTracks().forEach(t => t.stop());
          
          if (canceladoManualmente) {
            setEstadoVisual("idle");
            const cancelHtml = `
              <div class="flex flex-row items-center gap-2 w-full animate-bubble-in mt-2 justify-center">
                  <div class="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                      <p class="text-[14px] font-medium text-white/50">Grabación cancelada.</p>
                  </div>
              </div>`;
            if (rol === "staff") textoStaff.innerHTML = cancelHtml;
            else textoGuest.innerHTML = cancelHtml;
            return;
          }

          let duracion = Date.now() - tiempoInicio;
          
          if (duracion < 800 || volumenMaximoDetectado < 5) {
            const shortHtml = `
              <div class="flex flex-row items-center gap-2 w-full animate-bubble-in mt-2 justify-center">
                  <div class="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                      <p class="text-[14px] font-medium text-white/50">Audio vacío o muy corto.</p>
                  </div>
              </div>`;
            if (rol === "staff") textoStaff.innerHTML = shortHtml;
            else textoGuest.innerHTML = shortHtml;
            setEstadoVisual("idle");
            return;
          }

          const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
          audioChunks = [];
          enviarAudioAlServidor(audioBlob, rol);
        };

        mediaRecorder.start();
        grabandoRol = rol;
        setEstadoVisual("grabando", rol);
        renderizarOndas(); 

      } catch (err) {
        alert("Permite el acceso al micrófono.");
        setEstadoVisual("idle");
      }
    };

    const detenerGrabacion = () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      grabandoRol = null;
    };

    btnGrabarStaff.addEventListener('click', () => {
      if (grabandoRol === "staff") detenerGrabacion();
      else { if (grabandoRol) detenerGrabacion(); iniciarGrabacion("staff"); }
    });

    btnGrabarGuest.addEventListener('click', () => {
      if (grabandoRol === "guest") detenerGrabacion();
      else { if (grabandoRol) detenerGrabacion(); iniciarGrabacion("guest"); }
    });

    btnCancelarStaff.addEventListener('click', (e) => {
      e.stopPropagation(); 
      canceladoManualmente = true;
      detenerGrabacion();
    });

    btnCancelarGuest.addEventListener('click', (e) => {
      e.stopPropagation();
      canceladoManualmente = true;
      detenerGrabacion();
    });
    
    document.getElementById('btn-cerrar-traductor').addEventListener('click', () => {
        if (typeof window.cerrarTraductor === 'function') window.cerrarTraductor();
        else window.history.back();
    });
  }
};