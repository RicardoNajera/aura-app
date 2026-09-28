import { conciergeIaServicio } from '../servicios/conciergeIaServicio.js';

export default {
  html: () => `
    <style>
      /* --- OPTIMIZACIÓN GAMA BAJA Y EFECTOS APPLE INTELLIGENCE --- */
      :root {
        --audio-scale: 1;
        --audio-glow: 0;
      }
      
      /* GPU Accelerated Animations (Solo Opacity y Transform) */
      @keyframes breatheSoft {
        0% { transform: scale(0.98); opacity: 0.6; }
        50% { transform: scale(1.02); opacity: 0.9; }
        100% { transform: scale(0.98); opacity: 0.6; }
      }

      @keyframes spinAura {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.05); }
        100% { transform: rotate(360deg) scale(1); }
      }

      /* Efecto Siri iOS 18 Optimizado: Animar opacidad, NO box-shadow */
      @keyframes siriEdgeGlow {
        0% { opacity: 0.4; }
        50% { opacity: 1; }
        100% { opacity: 0.4; }
      }

      /* --- CONTENEDOR PRINCIPAL SIRI EFFECT --- */
      .apple-siri-glow {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        z-index: 100;
        box-shadow: inset 0 0 30px rgba(255,42,122,0.3), inset 0 0 60px rgba(168,85,247,0.2), inset 0 0 15px rgba(0,184,255,0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: opacity;
      }
      
      .is-listening .apple-siri-glow {
        animation: siriEdgeGlow 3s ease-in-out infinite;
      }

      /* --- FONDO APPLE INTELLIGENCE --- */
      .bg-shape {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        will-change: transform, opacity;
      }
      
      .shape-1 { 
        width: 60vw; height: 60vw; 
        background: #ff2a7a; 
        top: -20%; left: -10%; 
        animation: floatAura1 12s infinite ease-in-out alternate; 
      }
      .shape-2 { 
        width: 70vw; height: 70vw; 
        background: #00b8ff; 
        bottom: -20%; right: -10%; 
        animation: floatAura2 15s infinite ease-in-out alternate; 
      }
      .shape-3 { 
        width: 50vw; height: 50vw; 
        background: #a855f7; 
        top: 20%; left: 20%; 
        animation: floatAura3 10s infinite ease-in-out alternate; 
      }

      @keyframes floatAura1 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(10%, 10%) scale(1.1); } }
      @keyframes floatAura2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-10%, -10%) scale(1.15); } }
      @keyframes floatAura3 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(15%, -15%) scale(1.05); } }

      /* Transición ultra rápida para el fondo sincronizado con la voz */
      .is-listening #apple-auroras {
        opacity: calc(0.3 + var(--audio-glow) * 0.6);
        transition: opacity 0.05s ease-out;
      }

      /* --- EL ORBE INTERACTIVO (Ultra-Ligero) --- */
      .ai-orb-container {
        position: relative;
        width: 86px;
        height: 86px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 50;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        will-change: transform;
      }

      .ai-orb-container:hover { transform: scale(1.08); }
      .ai-orb-container:active { transform: scale(0.92); }

      /* Envoltura Auras con respuesta instantánea (0.05s) estilo Siri */
      .orb-wrapper {
        position: absolute;
        inset: -15px;
        border-radius: 50%;
        pointer-events: none;
        transition: transform 0.05s ease-out, opacity 0.05s ease-out;
        will-change: transform, opacity;
      }

      .orb-aura {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        filter: blur(12px); 
        opacity: 0.7;
        will-change: transform;
      }

      .orb-aura-1 { background: radial-gradient(circle at 30% 30%, #ff2a7a 0%, transparent 60%); animation: spinAura 8s linear infinite; }
      .orb-aura-2 { background: radial-gradient(circle at 70% 70%, #00b8ff 0%, transparent 60%); animation: spinAura 10s linear infinite reverse; }
      .orb-aura-3 { background: radial-gradient(circle at 50% 10%, #a855f7 0%, transparent 50%); animation: spinAura 6s linear infinite; }

      .ai-orb-idle .orb-wrapper {
        animation: breatheSoft 4s infinite ease-in-out;
      }

      /* Escucha super fluida */
      .ai-orb-listening .orb-wrapper {
        transform: scale(calc(1 + (var(--audio-scale) - 1) * 1.2));
      }
      .ai-orb-listening .orb-aura {
        opacity: calc(0.6 + var(--audio-glow));
      }

      /* Centro del Orbe */
      .orb-core {
        position: absolute;
        inset: 12px;
        background: rgba(15, 15, 20, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        box-shadow: inset 0 0 15px rgba(0,0,0,0.8);
        transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .ai-orb-listening .orb-core {
        background: rgba(25, 10, 30, 0.95);
        border-color: rgba(168, 85, 247, 0.5);
        box-shadow: inset 0 0 20px rgba(0,0,0,0.9);
      }
      
      .scroll-oculto::-webkit-scrollbar { width: 4px; }
      .scroll-oculto::-webkit-scrollbar-track { background: transparent; }
      .scroll-oculto::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
    </style>

    <div class="fixed inset-0 w-full h-full bg-black text-white flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden z-0">
      
      <!-- Fondo Real del Resort con Efecto Apple Intelligence -->
      <div id="fondo-apple-wrapper" class="absolute inset-0 w-full h-full bg-black -z-30 transition-transform duration-700 ease-in-out will-change-transform overflow-hidden">
          <div id="fondo-apple-img" class="absolute inset-0 w-full h-full bg-resort-noche bg-cover bg-center opacity-40 transition-opacity duration-700"></div>
          
          <!-- Auroras de Fondo interactuando con la voz -->
          <div id="apple-auroras" class="absolute inset-0 transition-opacity duration-700 opacity-20 mix-blend-screen pointer-events-none">
              <div class="bg-shape shape-1"></div>
              <div class="bg-shape shape-2"></div>
              <div class="bg-shape shape-3"></div>
          </div>
      </div>
      
      <!-- CONTENEDOR PRINCIPAL UNIFICADO -->
      <div id="main-container" class="relative w-full h-full max-w-[1600px] max-h-[96vh] rounded-2xl sm:rounded-[2.5rem] flex flex-col lg:flex-row overflow-hidden shadow-2xl bg-black/60 backdrop-blur-lg border border-white/10 transition-all duration-700">
          
          <!-- Borde perimetral brillante tipo Apple Intelligence -->
          <div class="apple-siri-glow"></div>

          <!-- Capa de oscurecimiento dinámico (Se activa al hablar) -->
          <div id="capa-cristal-foco" class="absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none bg-black/50 z-0 will-change-opacity"></div>

          <!-- BARRA LATERAL -->
          <nav class="order-last lg:order-first w-full lg:w-24 flex lg:flex-col items-center justify-around lg:justify-start py-4 lg:py-10 gap-2 lg:gap-8 z-20 shrink-0 bg-black/20 lg:bg-transparent">
              <div class="flex flex-col items-center gap-1 lg:gap-2 text-[#eab308] cursor-pointer group">
                  <svg class="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  <span class="text-[8px] lg:text-[9px] uppercase tracking-widest font-medium">Inicio</span>
              </div>
              <div class="flex flex-col items-center gap-1 lg:gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors group">
                  <svg class="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
                  <span class="text-[8px] lg:text-[9px] uppercase tracking-widest">Servicios</span>
              </div>
              <div class="flex flex-col items-center gap-1 lg:gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors group">
                  <svg class="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                  <span class="text-[8px] lg:text-[9px] uppercase tracking-widest text-center">Eventos</span>
              </div>
              <div class="flex flex-col items-center gap-1 lg:gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors group">
                  <svg class="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  <span class="text-[8px] lg:text-[9px] uppercase tracking-widest">Cocina</span>
              </div>
              <div class="flex flex-col items-center gap-1 lg:gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors group">
                  <svg class="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                  <span class="text-[8px] lg:text-[9px] uppercase tracking-widest">Spa</span>
              </div>
              <div class="hidden lg:flex flex-col items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors group mt-auto mb-2">
                  <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span class="text-[9px] uppercase tracking-widest">Info</span>
              </div>
          </nav>

          <!-- ÁREA IZQUIERDA: Textos y Botones -->
          <div class="w-full lg:w-5/12 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full overflow-y-auto relative z-20">
              <div>
                  <div class="flex items-center gap-3 mb-6 lg:mb-8">
                      <div class="w-11 h-11 lg:w-14 lg:h-14 rounded-full border-[1.5px] border-white/60 flex items-center justify-center font-bold text-xl lg:text-2xl tracking-tighter bg-black/40 shadow-lg">ph</div>
                      <div class="flex flex-col">
                          <span class="text-2xl lg:text-3xl font-medium tracking-wide leading-none text-white/90">planet hollywood</span>
                          <span class="text-[10px] lg:text-[11px] tracking-[0.4em] font-light mt-1 text-white/60">CANCUN</span>
                      </div>
                  </div>

                  <div class="transition-all duration-700 will-change-opacity" id="panel-saludo">
                      <h2 class="text-3xl lg:text-4xl font-semibold mb-2 lg:mb-3 tracking-tight">¡Hola!</h2>
                      <p class="text-gray-300 font-light text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed pr-2">
                          Soy <span class="text-white font-medium">Luna</span>, tu asistente personal.<br>
                          Estoy aquí para hacer que tu estancia sea inolvidable. ¿En qué puedo ayudarte hoy?
                      </p>

                      <div class="flex flex-col gap-2.5 w-full max-w-sm">
                          <button onclick="alert('Módulo de Reservas')" class="group flex items-center gap-4 py-3 px-5 rounded-2xl w-full text-left bg-black/20 hover:bg-white/10 border border-white/10 transition-colors">
                              <div class="w-8 h-8 rounded-full bg-[#ff2a7a]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                  <svg class="w-4 h-4 text-[#ff2a7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path></svg>
                              </div>
                              <span class="text-[13px] font-light tracking-wide text-white/90">Reservar Restaurante</span>
                          </button>
                          
                          <button onclick="alert('Módulo Room Service')" class="group flex items-center gap-4 py-3 px-5 rounded-2xl w-full text-left bg-black/20 hover:bg-white/10 border border-white/10 transition-colors">
                              <div class="w-8 h-8 rounded-full bg-[#00b8ff]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                  <svg class="w-4 h-4 text-[#00b8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              </div>
                              <span class="text-[13px] font-light tracking-wide text-white/90">Room Service</span>
                          </button>
                          
                          <button class="group flex items-center gap-4 py-3 px-5 rounded-2xl w-full text-left bg-black/20 hover:bg-white/10 border border-white/10 transition-colors">
                              <div class="w-8 h-8 rounded-full bg-[#a855f7]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                  <svg class="w-4 h-4 text-[#a855f7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                              </div>
                              <span class="text-[13px] font-light tracking-wide text-white/90">Actividades y Entretenimiento</span>
                          </button>
                          
                          <button class="group flex items-center gap-4 py-3 px-5 rounded-2xl w-full text-left bg-black/20 hover:bg-white/10 border border-white/10 transition-colors">
                              <div class="w-8 h-8 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                  <svg class="w-4 h-4 text-[#2dd4bf]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                              </div>
                              <span class="text-[13px] font-light tracking-wide text-white/90">Spa & Wellness</span>
                          </button>
                      </div>
                  </div>
              </div>

              <div class="hidden lg:block mt-6 text-4xl lg:text-5xl font-light transform -rotate-3 text-white/20 transition-opacity duration-700 will-change-opacity" id="vibes-text">
                  Good Vibes Only <span class="text-[#ff2a7a]/40 text-3xl lg:text-4xl inline-block ml-2 mb-1">♡</span>
              </div>
          </div>

          <!-- ÁREA DERECHA: Chat IA -->
          <div class="flex-1 relative flex flex-col z-20 pointer-events-none">
              
              <!-- Reloj y Clima Flotante -->
              <div class="absolute top-8 right-8 flex items-center gap-6 pointer-events-none transition-opacity duration-500 will-change-opacity" id="header-clima">
                  <div class="flex items-center gap-2">
                      <svg class="w-6 h-6 text-yellow-400/90" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18z"></path></svg>
                      <span class="text-sm font-medium text-white/90 drop-shadow-md">28°C Cancún</span>
                  </div>
                  <div class="h-8 w-px bg-white/20"></div>
                  <div class="flex flex-col text-right drop-shadow-md">
                      <span class="text-base font-semibold tracking-wide text-white/90" id="reloj-luna">--:--</span>
                      <span class="text-[11px] text-white/60 tracking-wide mt-0.5" id="fecha-luna">--</span>
                  </div>
              </div>

              <!-- CONTENEDOR PRINCIPAL IA -->
              <div class="absolute inset-0 flex flex-col pt-24 pb-8 px-6 lg:px-12 pointer-events-none">
                  
                  <!-- HISTORIAL DE CHAT -->
                  <div id="cuerpo-chat" class="w-full max-w-2xl mx-auto flex-1 overflow-y-auto flex flex-col space-y-4 pointer-events-auto pr-2 pb-6 scroll-oculto transition-all duration-700 will-change-opacity">
                      <div class="mt-auto"></div>
                      
                      <!-- Mensaje Inicial -->
                      <div class="flex items-end space-x-3 anim-subir w-full">
                          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#00b8ff] flex items-center justify-center shrink-0 border border-white/20 shadow-lg">
                              <span class="text-[9px] font-bold text-white font-mono">IA</span>
                          </div>
                          <div class="px-5 py-3.5 rounded-2xl rounded-bl-none bg-black/60 backdrop-blur-md border border-white/10 text-slate-100 text-sm max-w-[85%] leading-relaxed font-light shadow-lg">
                              ¡Hola! Soy Luna. ¿Te gustaría ver el menú de nuestro restaurante insignia, reservar una sesión de Spa, o prefieres conocer las actividades de hoy?
                          </div>
                      </div>
                  </div>

                  <!-- ZONA DE CONTROLES INFERIORES (Fluid Morphing) -->
                  <div class="w-full max-w-xl mx-auto flex flex-col items-center justify-end relative">
                      
                      <!-- Espacio Compartido (Chat manual vs Transcripción) -->
                      <div class="relative w-full h-[60px] mb-4 pointer-events-auto">
                          
                          <!-- CHAT MANUAL -->
                          <div id="contenedor-input-ia" class="absolute inset-0 w-full flex items-end space-x-3 bg-black/50 p-2 rounded-2xl border border-white/10 focus-within:border-[#a855f7]/50 focus-within:bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg z-20 opacity-100 scale-100 translate-y-0 will-change-transform">
                              <textarea id="input-ia" rows="1" class="flex-1 bg-transparent border-none px-4 py-2.5 text-slate-100 text-[15px] font-light focus:outline-none focus:ring-0 resize-none max-h-32 placeholder-white/40 scroll-oculto" placeholder="Escribe un mensaje a Luna..."></textarea>
                              
                              <button id="btn-enviar-ia" class="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shrink-0 active:scale-95 group flex items-center justify-center">
                                  <svg class="w-5 h-5 transition-transform transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#00b8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                              </button>
                          </div>

                          <!-- TEXTO VIVO FLOTANTE -->
                          <div id="texto-vivo-container" class="absolute inset-0 w-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 scale-95 translate-y-4 pointer-events-none z-10 will-change-transform">
                              <div class="w-full max-w-md bg-black/70 backdrop-blur-lg px-6 py-3.5 rounded-2xl border border-white/10 shadow-lg text-center">
                                  <p id="texto-vivo" class="text-[15px] font-light text-white italic tracking-wide truncate">
                                      "Te escucho..."
                                  </p>
                              </div>
                          </div>
                      </div>

                      <!-- BOTÓN ORBE TIPO APPLE -->
                      <div id="contenedor-micro" class="relative flex flex-col items-center justify-center pointer-events-auto transition-all duration-500 w-full">
                          
                          <div id="btn-micro-luna" class="ai-orb-container ai-orb-idle group">
                              <div class="orb-wrapper">
                                  <div class="orb-aura orb-aura-1"></div>
                                  <div class="orb-aura orb-aura-2"></div>
                                  <div class="orb-aura orb-aura-3"></div>
                              </div>
                              
                              <div class="orb-core">
                                  <!-- Mic -->
                                  <svg id="icono-micro" class="w-7 h-7 text-white/90 transition-all duration-300 transform group-hover:scale-110 opacity-100 scale-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                  </svg>
                                  
                                  <!-- Stop -->
                                  <svg id="icono-stop" class="w-7 h-7 text-rose-400 absolute transition-all duration-300 opacity-0 scale-50" fill="currentColor" viewBox="0 0 24 24">
                                      <rect x="7" y="7" width="10" height="10" rx="3"></rect>
                                  </svg>
                              </div>
                          </div>

                          <span id="label-micro" class="text-[10px] font-medium text-white/50 tracking-[0.2em] uppercase mt-4 transition-opacity duration-300">
                              Presiona para hablar
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  `,
  iniciar: async () => {
    // 1. RELOJ Y FECHA
    const actualizarFechaYHora = () => {
      const ahora = new Date();
      let horas = ahora.getHours();
      let minutos = ahora.getMinutes();
      const ampm = horas >= 12 ? 'PM' : 'AM';
      horas = horas % 12;
      horas = horas ? horas : 12; 
      minutos = minutos < 10 ? '0' + minutos : minutos;
      
      const elReloj = document.getElementById('reloj-luna');
      if (elReloj) elReloj.textContent = `${horas}:${minutos} ${ampm}`;

      const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      
      const elFecha = document.getElementById('fecha-luna');
      if (elFecha) elFecha.textContent = `${dias[ahora.getDay()]}, ${ahora.getDate()} ${meses[ahora.getMonth()]}`;
    };
    actualizarFechaYHora();
    setInterval(actualizarFechaYHora, 1000);


    // 2. REFERENCIAS DEL DOM
    const mainContainer = document.getElementById('main-container');
    const capaCristalFoco = document.getElementById('capa-cristal-foco');
    const fondoWrapper = document.getElementById('fondo-apple-wrapper');
    const fondoImg = document.getElementById('fondo-apple-img');
    const panelSaludo = document.getElementById('panel-saludo');
    const vibesText = document.getElementById('vibes-text');
    const headerClima = document.getElementById('header-clima');
    const cuerpoChat = document.getElementById('cuerpo-chat');
    const btnMicro = document.getElementById('btn-micro-luna');
    const iconoMicro = document.getElementById('icono-micro');
    const iconoStop = document.getElementById('icono-stop');
    const labelMicro = document.getElementById('label-micro');
    const contenedorInputIa = document.getElementById('contenedor-input-ia');
    const textoVivoContainer = document.getElementById('texto-vivo-container');
    const textoVivo = document.getElementById('texto-vivo');
    const inputIa = document.getElementById('input-ia');

    
    // 3. LÓGICA DE VOZ Y VISUALIZADOR (Optimizados para ultra-sensibilidad estilo Siri)
    let isRecording = false;
    let recognition = null;
    let transcripcionAcumulada = "";
    
    let audioContext;
    let analyser;
    let microphoneStream;
    let dataArray;
    let animFrameId;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'es-MX';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcripcionAcumulada += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (textoVivo) {
          let textoMostrar = (transcripcionAcumulada + interim).trim();
          if (textoMostrar.length > 0) {
              textoMostrar = textoMostrar.charAt(0).toUpperCase() + textoMostrar.slice(1);
          }
          textoVivo.textContent = `"${textoMostrar}"`;
        }
      };

      recognition.onerror = (event) => {
        console.warn("Error voz:", event.error);
        if(textoVivo) textoVivo.textContent = "Reintentando escucha...";
      };
    }

    const detenerAnimacionAudio = () => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (microphoneStream) {
            microphoneStream.getTracks().forEach(track => track.stop());
            microphoneStream = null;
        }
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
            audioContext = null;
        }
        document.documentElement.style.setProperty('--audio-scale', '1');
        document.documentElement.style.setProperty('--audio-glow', '0');
    };

    const iniciarAnimacionAudio = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            microphoneStream = stream;
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            
            // Mayor resolución para detectar mejor la voz
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            let smoothedVolume = 0; // Para la caída fluida tipo iOS

            const renderFrame = () => {
                if (!isRecording) return; // Evitar que siga corriendo tras parar
                
                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                let max = 0;
                
                // Obtenemos promedio y pico máximo
                for(let i = 0; i < bufferLength; i++) { 
                    sum += dataArray[i]; 
                    if (dataArray[i] > max) max = dataArray[i];
                }
                const average = sum / bufferLength; 
                
                // Mezcla de promedio y picos: sube hiper-rápido al hablar
                const instantVolume = (average * 0.6) + (max * 0.4);
                
                // Easing (suavizado matemático): Sube rápido (ataque), baja un poco más suave (decay)
                smoothedVolume = smoothedVolume * 0.6 + instantVolume * 0.4;
                
                // Cálculos muy sensibles (divisores más pequeños = más reacción)
                const scale = 1 + (smoothedVolume / 90); 
                const glow = (smoothedVolume / 60);
                
                document.documentElement.style.setProperty('--audio-scale', scale.toString());
                document.documentElement.style.setProperty('--audio-glow', glow.toString());
                
                animFrameId = requestAnimationFrame(renderFrame);
            };
            renderFrame();
            
        } catch (err) {
            console.error("Mic error", err);
            document.documentElement.style.setProperty('--audio-scale', '1.05');
            document.documentElement.style.setProperty('--audio-glow', '0.5');
        }
    };

    const toggleDictado = async () => {
        if (!isRecording) {
            isRecording = true;
            transcripcionAcumulada = "";
            if (textoVivo) textoVivo.textContent = '"Te escucho..."';
            
            mainContainer.classList.add('is-listening');
            
            capaCristalFoco.classList.replace('opacity-0', 'opacity-100');
            fondoWrapper?.classList.add('scale-105');
            fondoImg?.classList.replace('opacity-40', 'opacity-15');
            
            panelSaludo?.classList.add('opacity-20', 'pointer-events-none');
            vibesText?.classList.replace('opacity-100', 'opacity-0');
            headerClima?.classList.replace('opacity-100', 'opacity-20');
            cuerpoChat?.classList.replace('opacity-100', 'opacity-30');
            
            contenedorInputIa.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            contenedorInputIa.classList.add('opacity-0', 'scale-95', 'translate-y-4', 'pointer-events-none');
            
            textoVivoContainer.classList.remove('opacity-0', 'scale-95', 'translate-y-4', 'pointer-events-none');
            textoVivoContainer.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            
            btnMicro.classList.remove('ai-orb-idle');
            btnMicro.classList.add('ai-orb-listening');
            
            iconoMicro.classList.replace('opacity-100', 'opacity-0');
            iconoMicro.classList.replace('scale-100', 'scale-50');
            iconoStop.classList.replace('opacity-0', 'opacity-100');
            iconoStop.classList.replace('scale-50', 'scale-100');
            
            labelMicro.textContent = "ESCUCHANDO · TOCA PARA ENVIAR";
            labelMicro.classList.add('text-rose-400');

            iniciarAnimacionAudio();
            if (recognition) { try { recognition.start(); } catch(e) {} }

        } else {
            isRecording = false;
            let textoFinal = textoVivo.textContent.replace(/^"|"$/g, '').trim();

            mainContainer.classList.remove('is-listening');
            
            capaCristalFoco.classList.replace('opacity-100', 'opacity-0');
            fondoWrapper?.classList.remove('scale-105');
            fondoImg?.classList.replace('opacity-15', 'opacity-40');
            
            panelSaludo?.classList.remove('opacity-20', 'pointer-events-none');
            vibesText?.classList.replace('opacity-0', 'opacity-100');
            headerClima?.classList.replace('opacity-20', 'opacity-100');
            cuerpoChat?.classList.replace('opacity-30', 'opacity-100');
            
            contenedorInputIa.classList.remove('opacity-0', 'scale-95', 'translate-y-4', 'pointer-events-none');
            contenedorInputIa.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            
            textoVivoContainer.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            textoVivoContainer.classList.add('opacity-0', 'scale-95', 'translate-y-4', 'pointer-events-none');
            
            btnMicro.classList.remove('ai-orb-listening');
            btnMicro.classList.add('ai-orb-idle');
            
            iconoStop.classList.replace('opacity-100', 'opacity-0');
            iconoStop.classList.replace('scale-100', 'scale-50');
            iconoMicro.classList.replace('opacity-0', 'opacity-100');
            iconoMicro.classList.replace('scale-50', 'scale-100');
            
            labelMicro.textContent = "PRESIONA PARA HABLAR";
            labelMicro.classList.remove('text-rose-400');

            detenerAnimacionAudio();
            if (recognition) { try { recognition.stop(); } catch(e) {} }
            
            if (textoFinal && textoFinal !== "Te escucho..." && textoFinal !== "Reintentando escucha...") {
                let mensajeProcesado = textoFinal.charAt(0).toUpperCase() + textoFinal.slice(1);
                if (!/[.!?]$/.test(mensajeProcesado)) { mensajeProcesado += "."; }
                
                transcripcionAcumulada = "";
                textoVivo.textContent = '"Te escucho..."';
                
                await enviarMensajeA_IA(mensajeProcesado);
            }
        }
    };


    // 4. LÓGICA DEL PANEL DE CHAT Y COMUNICACIÓN IA
    const hacerScrollAbajo = () => {
      if (cuerpoChat) cuerpoChat.scrollTo({ top: cuerpoChat.scrollHeight, behavior: 'smooth' });
    };

    const enviarMensajeA_IA = async (texto) => {
      if (!texto) return;

      cuerpoChat.innerHTML += `
        <div class="flex items-end justify-end space-x-3 anim-subir w-full">
          <div class="px-5 py-3 rounded-2xl rounded-br-none bg-white/10 border border-white/10 text-white text-[15px] max-w-[85%] leading-relaxed font-light shadow-lg backdrop-blur-md">
            ${texto}
          </div>
        </div>
      `;
      hacerScrollAbajo();

      const idCarga = 'carga-' + Date.now();
      cuerpoChat.innerHTML += `
        <div id="${idCarga}" class="flex items-end space-x-3 anim-subir w-full">
          <div class="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-[#a855f7]/40 shadow-inner">
            <span class="text-[9px] font-bold text-[#a855f7] font-mono">IA</span>
          </div>
          <div class="px-5 py-3 rounded-2xl rounded-bl-none bg-black/30 backdrop-blur-md border border-white/5 text-[#a855f7] text-xs italic tracking-widest flex items-center space-x-2">
            <span class="animate-pulse">Luna está pensando...</span>
          </div>
        </div>
      `;
      hacerScrollAbajo();

      const respuestaIA = await conciergeIaServicio.consultarLuna(texto);
      
      document.getElementById(idCarga)?.remove();

      cuerpoChat.innerHTML += `
        <div class="flex items-end space-x-3 anim-subir w-full">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#00b8ff] flex items-center justify-center shrink-0 shadow-lg border border-white/20">
            <span class="text-[9px] font-bold text-white font-mono">IA</span>
          </div>
          <div class="px-5 py-3.5 rounded-2xl rounded-bl-none bg-black/60 backdrop-blur-md border border-white/10 text-slate-100 text-[15px] max-w-[85%] leading-relaxed font-light shadow-lg">
            ${respuestaIA}
          </div>
        </div>
      `;
      hacerScrollAbajo();
    };

    if (inputIa) {
      inputIa.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 128) + 'px';
        hacerScrollAbajo();
      });

      inputIa.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const texto = inputIa.value.trim();
          inputIa.value = '';
          inputIa.style.height = 'auto';
          enviarMensajeA_IA(texto);
        }
      });
    }

    // 5. ASIGNACIÓN DE EVENTOS
    document.getElementById('btn-micro-luna')?.addEventListener('click', toggleDictado);
    
    document.getElementById('btn-enviar-ia')?.addEventListener('click', () => {
      const texto = inputIa?.value.trim();
      if(texto) {
        if(inputIa) {
            inputIa.value = '';
            inputIa.style.height = 'auto';
        }
        enviarMensajeA_IA(texto);
      }
    });
  }
};