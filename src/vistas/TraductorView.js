/* ==========================================================================
   MODULO 1: ESTILOS Y ANIMACIONES CSS
   ========================================================================== */
const moduloAnimacionesYEstilos = {
  obtenerCss: () => `
    <style>
      :root {
        --sat: env(safe-area-inset-top, 0px);
        --sab: env(safe-area-inset-bottom, 0px);
        --sal: env(safe-area-inset-left, 0px);
        --sar: env(safe-area-inset-right, 0px);
      }

      /* Viewport absoluto 100% que previene cualquier desborde */
      .app-viewport-total {
        width: 100vw;
        height: 100vh;
        height: 100dvh;
        max-height: -webkit-fill-available;
        overflow: hidden;
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        padding-left: var(--sal);
        padding-right: var(--sar);
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }

      /* ANIMACIONES RANGER PEGADAS A CADA EXTREMO */
      @keyframes animacion-pop-izquierda {
        0% { opacity: 0; transform: translate3d(-35px, 0, 0) scale(0.96); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }
      
      @keyframes animacion-pop-derecha {
        0% { opacity: 0; transform: translate3d(35px, 0, 0) scale(0.96); }
        100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
      }

      @keyframes animacion-orbe-flotante {
        0% { transform: translate3d(0, 0, 0) scale(1); }
        33% { transform: translate3d(24px, -36px, 0) scale(1.05); }
        66% { transform: translate3d(-18px, 16px, 0) scale(0.95); }
        100% { transform: translate3d(0, 0, 0) scale(1); }
      }

      @keyframes rebote-puntos-escritura {
        0%, 60%, 100% { transform: translate3d(0, 0, 0); }
        30% { transform: translate3d(0, -4px, 0); }
      }

      .punto-escritura {
        animation: rebote-puntos-escritura 1.4s infinite ease-in-out both;
        will-change: transform;
      }

      /* BURBUJA PERSONAL (STAFF) - PEGADA TOTALMENTE AL LADO IZQUIERDO */
      .burbuja-personal {
        background: linear-gradient(135deg, #0ea5e9 0%, #0066ff 100%);
        box-shadow: 0 10px 28px rgba(0, 102, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-bottom-left-radius: 4px !important;
        animation: animacion-pop-izquierda 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        will-change: transform, opacity;
      }

      /* BURBUJA HUÉSPED (GUEST) - PEGADA TOTALMENTE AL LADO DERECHO */
      .burbuja-huesped {
        background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%);
        box-shadow: 0 10px 28px rgba(126, 34, 206, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        border-bottom-right-radius: 4px !important;
        animation: animacion-pop-derecha 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        will-change: transform, opacity;
      }

      .encabezado-cristal {
        background: linear-gradient(to bottom, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.6) 100%);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        padding-top: calc(var(--sat) + 0.75rem);
        padding-bottom: 0.75rem;
        transform: translateZ(0); 
      }

      .pie-pagina-cristal {
        background: rgba(18, 18, 22, 0.72);
        backdrop-filter: blur(32px) saturate(180%);
        -webkit-backdrop-filter: blur(32px) saturate(180%);
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 -8px 36px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        padding-top: 0.75rem;
        padding-bottom: calc(var(--sab) + 0.75rem);
        transform: translateZ(0);
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }

      #wave-staff {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.7) 0%, rgba(59, 130, 246, 0.45) 50%, rgba(0, 102, 255, 0.2) 80%, transparent 100%);
        filter: blur(10px);
        transform: scale(0);
        opacity: 0;
        pointer-events: none;
        will-change: transform, border-radius, opacity;
        transition: opacity 0.25s ease-out;
      }

      #wave-guest {
        position: absolute;
        inset: -6px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(192, 132, 252, 0.7) 0%, rgba(168, 85, 247, 0.45) 50%, rgba(126, 34, 206, 0.2) 80%, transparent 100%);
        filter: blur(10px);
        transform: scale(0);
        opacity: 0;
        pointer-events: none;
        will-change: transform, border-radius, opacity;
        transition: opacity 0.25s ease-out;
      }

      .pastilla-cancelar {
        width: 0px;
        opacity: 0;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        white-space: nowrap;
        overflow: hidden;
        position: absolute;
        top: 50%;
        transform: translateY(-50%) scale(0.9);
      }
      
      #btn-cancelar-staff.activo {
        width: clamp(110px, 30vw, 138px);
        opacity: 1;
        pointer-events: auto;
        transform: translateY(-50%) scale(1) translateX(16px);
      }

      #btn-cancelar-guest.activo {
        width: clamp(110px, 30vw, 138px);
        opacity: 1;
        pointer-events: auto;
        transform: translateY(-50%) scale(1) translateX(-16px);
      }

      .contenedor-lateral {
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .lateral-oculto {
        opacity: 0;
        transform: scale(0.85);
        pointer-events: none;
      }

      @keyframes pop-icono-rostro {
        0% { transform: scale(0) translateY(10px); opacity: 0; }
        60% { transform: scale(1.25) translateY(-2px); opacity: 1; }
        100% { transform: scale(1) translateY(0); opacity: 1; }
      }
      
      .animacion-rostro-pop {
        animation: pop-icono-rostro 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        display: inline-flex;
        will-change: transform, opacity;
      }

      /* TOAST / BANNER DE ESTADO DE RED */
      #banner-red-flotante {
        position: absolute;
        left: 50%;
        bottom: calc(var(--sab) + 84px);
        transform: translate3d(-50%, 18px, 0) scale(0.92);
        opacity: 0;
        pointer-events: none;
        transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        z-index: 40;
      }

      #banner-red-flotante.visible {
        transform: translate3d(-50%, 0, 0) scale(1);
        opacity: 1;
      }

      @keyframes pulso-punto-rojo {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }

      .punto-pulso-red {
        animation: pulso-punto-rojo 1.5s infinite ease-in-out;
      }

      ::-webkit-scrollbar { width: 0px; height: 0px; background: transparent; }
    </style>
  `
};

/* ==========================================================================
   MODULO 2: PLANTILLAS VISUALES DE INTERFAZ HTML
   ========================================================================== */
const moduloPlantillasInterfaz = {
  generarEstructuraPrincipal: () => `
    ${moduloAnimacionesYEstilos.obtenerCss()}

    <div class="app-viewport-total bg-[#050505] text-white font-sans select-none relative">
      
      <!-- Fondos de ambientación lumínica -->
      <div class="absolute -top-20 -left-20 w-[65vw] h-[65vw] max-w-[500px] max-h-[500px] bg-sky-600/15 rounded-full blur-[110px] pointer-events-none" style="animation: animacion-orbe-flotante 15s infinite alternate ease-in-out; will-change: transform;"></div>
      <div class="absolute -bottom-20 -right-20 w-[65vw] h-[65vw] max-w-[460px] max-h-[460px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" style="animation: animacion-orbe-flotante 18s infinite alternate-reverse ease-in-out; will-change: transform;"></div>

      <!-- HEADER FIJO -->
      <header class="encabezado-cristal shrink-0 z-30 flex flex-col items-center justify-center w-full px-4 shadow-xl">
        <div class="flex flex-col items-center justify-center">
          <h1 class="text-[17px] sm:text-[19px] font-bold tracking-wide flex items-center justify-center drop-shadow-md text-center">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600">Planet Hollywood</span>
          </h1>
          <h2 class="text-[10px] font-semibold text-white/60 tracking-[0.22em] uppercase mt-0.5 text-center">Cancún</h2>
        </div>
      </header>

      <!-- ÁREA DE CHAT: ANCHO COMPLETO PARA CONTROLAR EL CONTACTO DIRECTO CON LOS BORDES -->
      <div 
        id="chat-container" 
        class="flex-1 min-h-0 w-full overflow-y-auto px-2 sm:px-4 py-4 z-10 flex flex-col select-none"
        style="overscroll-behavior: contain; -webkit-overflow-scrolling: touch;"
      >
        <div class="w-full flex justify-center mb-4 opacity-60 shrink-0">
          <div class="bg-white/10 border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-bold tracking-widest text-white/80 uppercase shadow">
            Inicio de Conversación
          </div>
        </div>

        <div id="mensajes-wrapper" class="flex flex-col w-full"></div>
        <div id="scroll-anchor" class="w-full h-4 shrink-0 pointer-events-none"></div>
      </div>

      <!-- AVISO FLOTANTE DE CONECTIVIDAD (SOBRE LA BARRA INFERIOR) -->
      <div id="banner-red-flotante" class="pointer-events-none">
        <div id="banner-red-contenido" class="px-4 py-2 rounded-full backdrop-blur-xl shadow-2xl flex items-center gap-2 border text-[11px] font-semibold tracking-wide transition-all">
          <span id="banner-red-indicador" class="w-2.5 h-2.5 rounded-full"></span>
          <span id="banner-red-texto">Comprobando conexión...</span>
        </div>
      </div>

      <!-- FOOTER DINÁMICO ELEVADO -->
      <div id="footer-container" class="pie-pagina-cristal shrink-0 z-30 w-full flex justify-center items-center">
        <div class="flex w-full max-w-2xl justify-between items-center px-3 sm:px-6 relative">
          
          <!-- LADO IZQUIERDO (STAFF) -->
          <div id="wrapper-staff" class="contenedor-lateral flex flex-row items-center gap-3 relative p-1.5">
            <div class="flex flex-col items-center justify-center min-w-[50px] sm:min-w-[60px] max-w-[110px]">
              <div id="iconos-staff" class="flex flex-wrap items-center justify-center gap-1 text-[16px] drop-shadow-md leading-none"></div>
              <p id="lang-staff" class="text-[10px] font-medium text-sky-400 transition-colors mt-1.5 text-center truncate max-w-[70px]"></p>
            </div>

            <div id="container-mic-staff" class="relative flex items-center justify-center rounded-full p-1">
              <div id="wave-staff"></div>
              
              <button id="btn-grabar-staff" class="w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#0066ff] flex items-center justify-center shadow-[0_8px_28px_rgba(0,102,255,0.45)] active:scale-90 transition-transform duration-200 relative z-20 border border-sky-300/40">
                <svg class="w-8 h-8 text-sky-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  <polygon points="12,14.5 13.5,18 12,21.5 10.5,18" fill="#ffffff" opacity="0.95"/>
                </svg>
              </button>

              <button id="btn-cancelar-staff" class="pastilla-cancelar left-[calc(100%-4px)] h-[46px] rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-start backdrop-blur-xl z-10 active:bg-red-500/30 shadow-lg">
                <svg class="w-5 h-5 shrink-0 ml-3 mr-1.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                <span class="text-[12px] sm:text-[13px] font-bold tracking-wide mr-3">Cancelar</span>
              </button>
            </div>
          </div>

          <div id="divisor" class="w-[1px] h-9 bg-white/10 rounded-full transition-opacity duration-300 mx-2 shrink-0"></div>

          <!-- LADO DERECHO (GUEST) -->
          <div id="wrapper-guest" class="contenedor-lateral flex flex-row-reverse items-center gap-3 relative p-1.5">
            <div class="flex flex-col items-center justify-center min-w-[50px] sm:min-w-[60px] max-w-[110px]">
              <div id="iconos-guest" class="flex flex-wrap items-center justify-center gap-1 text-[16px] drop-shadow-md leading-none"></div>
              <p id="lang-guest" class="text-[10px] font-medium text-purple-400 transition-colors mt-1.5 text-center truncate max-w-[70px]"></p>
            </div>

            <div id="container-mic-guest" class="relative flex items-center justify-center rounded-full p-1">
              <button id="btn-cancelar-guest" class="pastilla-cancelar right-[calc(100%-4px)] h-[46px] rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-end backdrop-blur-xl z-10 active:bg-red-500/30 shadow-lg">
                <span class="text-[12px] sm:text-[13px] font-bold tracking-wide ml-3">Cancelar</span>
                <svg class="w-5 h-5 shrink-0 mr-3 ml-1.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <div id="wave-guest"></div>
              
              <button id="btn-grabar-guest" class="w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] rounded-full bg-gradient-to-br from-[#a855f7] to-[#7e22ce] flex items-center justify-center shadow-[0_8px_28px_rgba(126,34,206,0.45)] active:scale-90 transition-transform duration-200 relative z-20 border border-purple-300/40">
                <svg class="w-8 h-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]" viewBox="0 0 24 24">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77" fill="#f3e8ff"/>
                  <polygon points="12,2 8.91,8.26 2,9.27 7,14.14 5.82,21.02 12,17.77" fill="#d8b4fe"/>
                </svg>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `,

  generarBurbujaHtml: (hablantes, rol, textoTraducidoCompleto, isoDestino, iconoPersona, audioBase64) => {
    if (!hablantes || hablantes.length === 0) return "";
    
    const esStaff = rol === "staff";
    const margenContrario = esStaff ? "mr-8 sm:mr-20" : "ml-8 sm:ml-20";
    const alineacion = esStaff ? "justify-start text-left" : "justify-end text-left";
    const claseBurbuja = esStaff ? "burbuja-personal" : "burbuja-huesped";
    
    return hablantes.map((h) => {
      const emojiBandera = `${h.icono_persona || ''}${h.bandera || ''}`;
      const nombreIdioma = h.nombre_idioma || 'Idioma detectado';
      const textoPronunciar = (h.frase_traducida || h.texto_traducida || textoTraducidoCompleto || "").replace(/"/g, '&quot;');
      const isoPronunciar = h.iso || isoDestino || 'en';
      const iconoFinal = h.icono_persona || iconoPersona || '🗣️';
      const audioAttr = audioBase64 || '';

      const tagIdioma = emojiBandera ? `
        <div class="flex items-center gap-1.5 mb-2 opacity-90">
          <span class="text-[12px] bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm shadow border border-white/10">${emojiBandera}</span>
          <span class="text-[9px] font-bold tracking-widest uppercase text-white/60">${nombreIdioma}</span>
        </div>
      ` : '';

      return `
      <div class="flex ${alineacion} w-full my-2.5 shrink-0">
        <div class="w-auto ${margenContrario} rounded-[22px] px-4 sm:px-5 py-3.5 ${claseBurbuja} relative group">
          ${tagIdioma}
          <p class="text-[13px] sm:text-[14px] font-normal leading-snug text-white/60 break-words whitespace-pre-wrap">${h.frase_original || h.texto_original || "..."}</p>
          <div class="h-[1px] w-full bg-gradient-to-r from-white/5 via-white/20 to-white/5 my-2.5 rounded-full"></div>
          
          <div class="flex items-end justify-between gap-3">
            <p class="text-[17px] sm:text-[19px] font-bold leading-snug text-white drop-shadow-md break-words whitespace-pre-wrap tracking-tight flex-1">${h.frase_traducida || h.texto_traducida || "..."}</p>
            
            <button 
              type="button"
              class="btn-repetir-voz p-2 -mr-1 -mb-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white/80 shrink-0"
              data-texto="${textoPronunciar}"
              data-iso="${isoPronunciar}"
              data-icono="${iconoFinal}"
              data-audio="${audioAttr}"
              title="Escuchar de nuevo"
            >
              <svg class="w-4 h-4 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>`;
    }).join('');
  },

  generarHtmlEscribiendo: (rol, idUnico) => {
    const esStaff = rol === "staff";
    const margenContrario = esStaff ? "mr-8 sm:mr-20" : "ml-8 sm:ml-20";
    const claseBurbuja = esStaff ? "burbuja-personal" : "burbuja-huesped";
    return `
      <div id="${idUnico}" class="flex ${esStaff ? 'justify-start' : 'justify-end'} w-full my-2.5 shrink-0">
        <div class="w-auto ${margenContrario} rounded-[22px] px-5 py-3.5 ${claseBurbuja} flex items-center gap-1.5 h-[52px]">
          <div class="w-2.5 h-2.5 bg-white/80 rounded-full punto-escritura" style="animation-delay: 0s"></div>
          <div class="w-2.5 h-2.5 bg-white/80 rounded-full punto-escritura" style="animation-delay: 0.2s"></div>
          <div class="w-2.5 h-2.5 bg-white/80 rounded-full punto-escritura" style="animation-delay: 0.4s"></div>
        </div>
      </div>`;
  },

  generarMensajeSistemaHtml: (mensaje, esError = false) => {
    const colorClase = esError 
      ? "bg-red-500/20 text-red-400 border-red-500/30" 
      : "bg-white/10 text-white/70 border-white/5";
    return `
      <div class="flex w-full justify-center my-1.5 shrink-0">
        <div class="${colorClase} border px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide backdrop-blur-md shadow-sm">
          ${mensaje}
        </div>
      </div>`;
  },

  generarPastillaReintentarHtml: (idPastilla) => `
    <div id="${idPastilla}" class="flex w-full justify-center my-1.5 shrink-0">
      <div class="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide backdrop-blur-md shadow-md flex items-center gap-2">
        <span>Conexión lenta sin respuesta</span>
        <button type="button" class="btn-ejecutar-reintento underline font-bold hover:text-white transition-colors cursor-pointer">
          Reintentar
        </button>
      </div>
    </div>
  `
};

/* ==========================================================================
   MODULO 3: ANIMACIÓN TIPO MEDUSA BIOLUMINISCENTE
   ========================================================================== */
const moduloAnimacionMedusa = {
  idAnimacion: null,
  escalaActual: 1,
  faseRespiracion: 0,

  iniciarMedusa: function(analizador, matrizFrecuencia, elementoOnda, botonActivo) {
    if (!elementoOnda) return;

    this.escalaActual = 1;
    this.faseRespiracion = 0;
    elementoOnda.style.opacity = "1";
    elementoOnda.style.display = "block";

    const animarMedusa = () => {
      this.idAnimacion = requestAnimationFrame(animarMedusa);

      let promedioVoz = 0;
      if (analizador && matrizFrecuencia) {
        analizador.getByteFrequencyData(matrizFrecuencia);
        const bandasVoz = Math.min(matrizFrecuencia.length, 32);
        let suma = 0;
        for (let i = 0; i < bandasVoz; i++) suma += matrizFrecuencia[i];
        promedioVoz = suma / bandasVoz;
      }

      this.faseRespiracion += 0.05 + (promedioVoz / 800);
      
      const r1 = 50 + Math.sin(this.faseRespiracion * 1.2) * 16;
      const r2 = 50 + Math.cos(this.faseRespiracion * 0.9) * 14;
      const r3 = 50 + Math.sin(this.faseRespiracion * 1.5 + 2) * 15;
      const r4 = 50 + Math.cos(this.faseRespiracion * 1.1 + 1) * 18;

      elementoOnda.style.borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${100 - r4}% ${100 - r3}%`;

      let escalaObjetivo = 1.05 + (Math.sin(this.faseRespiracion) * 0.04);
      if (promedioVoz > 3) {
        const factorNormalizado = (promedioVoz - 3) / 100;
        escalaObjetivo = Math.min(1.45, 1.08 + (factorNormalizado * 0.38));
      }

      this.escalaActual += (escalaObjetivo - this.escalaActual) * 0.32;
      elementoOnda.style.transform = `scale(${this.escalaActual.toFixed(3)}) rotate(${(this.faseRespiracion * 12).toFixed(1)}deg)`;

      if (botonActivo) {
        const contraccionBoton = 1 - (this.escalaActual - 1) * 0.08;
        botonActivo.style.transform = `scale(${contraccionBoton.toFixed(3)})`;
      }
    };

    animarMedusa();
  },

  detenerMedusa: function(elementoOnda, botonActivo) {
    if (this.idAnimacion) {
      cancelAnimationFrame(this.idAnimacion);
      this.idAnimacion = null;
    }
    
    if (elementoOnda) {
      elementoOnda.style.opacity = "0";
      elementoOnda.style.transform = "scale(0)";
      elementoOnda.style.borderRadius = "9999px";
    }

    if (botonActivo) {
      botonActivo.style.transform = "";
      botonActivo.style.animation = "none";
    }

    this.escalaActual = 1;
    this.faseRespiracion = 0;
  }
};

/* ==========================================================================
   MODULO 4: SÍNTESIS Y REPRODUCCIÓN DE VOZ (CONTROL TOTAL DE AUDIO)
   ========================================================================== */
const moduloSintesisVoz = {
  vocesDisponibles: [],
  motorIniciado: false,
  reproductorAudioActivo: null,

  cargarVoces: function() {
    if ('speechSynthesis' in window) {
      this.vocesDisponibles = window.speechSynthesis.getVoices();
    }
  },

  iniciarMotorSilencioso: function() {
    if (!this.motorIniciado && 'speechSynthesis' in window) {
      const locucionSilenciosa = new SpeechSynthesisUtterance('');
      locucionSilenciosa.volume = 0;
      window.speechSynthesis.speak(locucionSilenciosa);
      this.motorIniciado = true;
    }
  },

  detenerCualquierAudio: function() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.reproductorAudioActivo) {
      this.reproductorAudioActivo.pause();
      this.reproductorAudioActivo.currentTime = 0;
      this.reproductorAudioActivo = null;
    }
  },

  reproducirTextoVozNativa: function(texto, codigoIso, iconoDominante) {
    if (!('speechSynthesis' in window)) return;

    this.detenerCualquierAudio();
    const locucion = new SpeechSynthesisUtterance(texto);
    
    const mapaIdiomas = {
      'es': 'es-MX',
      'en': 'en-US',
      'zh': 'zh-CN',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-BR',
      'ja': 'ja-JP',
      'ru': 'ru-RU',
      'ko': 'ko-KR'
    };
    
    locucion.lang = mapaIdiomas[(codigoIso || 'en').toLowerCase()] || codigoIso;
    locucion.rate = 1.05;

    if (this.vocesDisponibles.length === 0) this.cargarVoces();
    
    const vocesIdioma = this.vocesDisponibles.filter(v => v.lang.toLowerCase().startsWith((codigoIso || 'en').toLowerCase()));
    
    if (vocesIdioma.length > 0) {
      const esHombre = ['👨', '👦', '👨🏽‍💼'].includes(iconoDominante);
      let vozElegida = vocesIdioma.find(v => (esHombre ? /(male|hombre|alvaro|jorge|carlos)/i : /(female|mujer|monica|paulina|helena)/i).test(v.name));
      
      if (!vozElegida) {
        vozElegida = vocesIdioma.find(v => v.name.includes('Google') || v.name.includes('Natural')) || vocesIdioma[0];
      }
      locucion.voice = vozElegida;
    }
    
    window.speechSynthesis.speak(locucion);
  },

  reproducirAudioOTexto: function(texto, codigoIso, iconoDominante, audioBase64FallBack) {
    this.detenerCualquierAudio();

    if (audioBase64FallBack) {
      try {
        const audio = new Audio("data:audio/mp3;base64," + audioBase64FallBack);
        this.reproductorAudioActivo = audio;
        
        audio.onended = () => { this.reproductorAudioActivo = null; };
        audio.onerror = () => {
          this.reproductorAudioActivo = null;
          this.reproducirTextoVozNativa(texto, codigoIso, iconoDominante);
        };

        audio.play().catch(() => {
          this.reproductorAudioActivo = null;
          this.reproducirTextoVozNativa(texto, codigoIso, iconoDominante);
        });
        return;
      } catch (e) {
        this.reproductorAudioActivo = null;
      }
    }
    this.reproducirTextoVozNativa(texto, codigoIso, iconoDominante);
  }
};

/* ==========================================================================
   MODULO 5: MONITOR REACTIVO DE RED E INTERNET EN TIEMPO REAL
   ========================================================================== */
const moduloMonitorConexion = {
  enLinea: typeof navigator !== 'undefined' ? navigator.onLine : true,
  temporizadorOcultar: null,
  domElementos: {},

  inicializar: function(elementos, alCambiarEstado) {
    this.domElementos = elementos;
    this.enLinea = navigator.onLine;

    // Escucha nativa instantánea sin polling pesado
    window.addEventListener('online', () => this.manejarCambio(true, alCambiarEstado));
    window.addEventListener('offline', () => this.manejarCambio(false, alCambiarEstado));

    // Si ya inicia desconectado, mostrar inmediatamente
    if (!this.enLinea) {
      this.mostrarEstado(false, "Sin conexión a internet");
    }
  },

  // Verificación rápida con HEAD para descartar Wi-Fi sin salida real
  verificarConexionReal: async function() {
    if (!navigator.onLine) return false;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      await fetch(moduloServicioTraduccion.URL_SERVICIO, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return true;
    } catch (e) {
      return false;
    }
  },

  manejarCambio: async function(posibleOnline, callback) {
    if (posibleOnline) {
      this.mostrarEstado('reconectando', "Problema con el Wi-Fi, reconectando...");
      const conexionReal = await this.verificarConexionReal();
      
      if (conexionReal) {
        this.enLinea = true;
        this.mostrarEstado(true, "Conectado. Ya estás en línea.");
        if (callback) callback(true);
      } else {
        this.enLinea = false;
        this.mostrarEstado(false, "Wi-Fi conectado, pero sin salida a internet.");
        if (callback) callback(false);
      }
    } else {
      this.enLinea = false;
      this.mostrarEstado(false, "Sin conexión a internet.");
      if (callback) callback(false);
    }
  },

  mostrarEstado: function(estado, mensaje) {
    const { contenedor, contenido, indicador, texto } = this.domElementos;
    if (!contenedor || !contenido || !indicador || !texto) return;

    if (this.temporizadorOcultar) {
      clearTimeout(this.temporizadorOcultar);
      this.temporizadorOcultar = null;
    }

    texto.textContent = mensaje;
    contenedor.classList.add('visible');

    // Limpiar clases previas de color
    contenido.className = "px-4 py-2 rounded-full backdrop-blur-xl shadow-2xl flex items-center gap-2 border text-[11px] font-semibold tracking-wide transition-all";
    indicador.className = "w-2.5 h-2.5 rounded-full";

    if (estado === true) {
      // Estado: En línea
      contenido.classList.add('bg-emerald-500/25', 'border-emerald-500/40', 'text-emerald-300');
      indicador.classList.add('bg-emerald-400', 'shadow-[0_0_8px_#34d399]');
      
      // Desaparece solo tras confirmar conexión
      this.temporizadorOcultar = setTimeout(() => {
        contenedor.classList.remove('visible');
      }, 2800);
    } else if (estado === 'reconectando') {
      // Estado: Reconectando
      contenido.classList.add('bg-amber-500/25', 'border-amber-500/40', 'text-amber-300');
      indicador.classList.add('bg-amber-400', 'punto-pulso-red', 'shadow-[0_0_8px_#fbbf24]');
    } else {
      // Estado: Desconectado / Sin internet
      contenido.classList.add('bg-red-500/25', 'border-red-500/40', 'text-red-300');
      indicador.classList.add('bg-red-500', 'punto-pulso-red', 'shadow-[0_0_8px_#ef4444]');
    }
  }
};

/* ==========================================================================
   MODULO 6: SERVICIO DE RED Y ENVÍO CON ETIQUETA CORRELACIONAL
   ========================================================================== */
const moduloServicioTraduccion = {
  URL_SERVICIO: "https://asistente-backend.auraradio-cloud.workers.dev/",

  ejecutarFetch: async (blobAudio, rol, idiomaContrario, etiquetaAudio, senalAborto) => {
    const extension = blobAudio.type.includes('mp4') ? 'm4a' : 'webm';
    const formulario = new FormData();
    formulario.append('audio', blobAudio, `audio.${extension}`);
    formulario.append('rol', rol);
    formulario.append('idiomaContrario', idiomaContrario);
    formulario.append('etiqueta', etiquetaAudio);

    const respuesta = await fetch(moduloServicioTraduccion.URL_SERVICIO, { 
      method: 'POST', 
      body: formulario,
      signal: senalAborto
    });

    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    const data = await respuesta.json();
    
    if (!data.etiqueta) data.etiqueta = etiquetaAudio;
    return data;
  }
};

/* ==========================================================================
   MODULO 7: CONTROLADOR PRINCIPAL (EXPORT DEFAULT)
   ========================================================================== */
export default {
  html: () => moduloPlantillasInterfaz.generarEstructuraPrincipal(),
  
  iniciar: async () => {
    const dom = {
      btnGrabarStaff: document.getElementById('btn-grabar-staff'),
      btnGrabarGuest: document.getElementById('btn-grabar-guest'),
      btnCancelarStaff: document.getElementById('btn-cancelar-staff'),
      btnCancelarGuest: document.getElementById('btn-cancelar-guest'),
      waveStaff: document.getElementById('wave-staff'),
      waveGuest: document.getElementById('wave-guest'),
      wrapperStaff: document.getElementById('wrapper-staff'),
      wrapperGuest: document.getElementById('wrapper-guest'),
      containerMicStaff: document.getElementById('container-mic-staff'),
      containerMicGuest: document.getElementById('container-mic-guest'),
      divisor: document.getElementById('divisor'),
      chatContainer: document.getElementById('chat-container'),
      mensajesWrapper: document.getElementById('mensajes-wrapper'),
      scrollAnchor: document.getElementById('scroll-anchor'),
      langStaff: document.getElementById('lang-staff'),
      langGuest: document.getElementById('lang-guest'),
      iconosStaff: document.getElementById('iconos-staff'),
      iconosGuest: document.getElementById('iconos-guest'),
      bannerRed: document.getElementById('banner-red-flotante'),
      bannerRedContenido: document.getElementById('banner-red-contenido'),
      bannerRedIndicador: document.getElementById('banner-red-indicador'),
      bannerRedTexto: document.getElementById('banner-red-texto')
    };

    let state = {
      grabandoRol: null,
      canceladoManualmente: false,
      volumenMaximo: 0,
      tiempoInicio: 0,
      idEscribiendo: null,
      idPastillaReintento: null,
      etiquetaUltimaValida: null,
      contadorTurnos: 0,
      etiquetasProcesadas: new Set(),
      ultimoAudioFallido: null,
      memoriaIdiomas: {
        staff: { iso: "es" },
        guest: { iso: "en" }
      }
    };

    let mediaRecorder = null;
    let audioChunks = [];
    let audioCtx = null;
    let analyser = null;
    let dataArray = null;

    moduloSintesisVoz.cargarVoces();
    if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => moduloSintesisVoz.cargarVoces();
    }

    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        if (dom.chatContainer) {
          dom.chatContainer.scrollTop = dom.chatContainer.scrollHeight;
        }
      });
    };

    const inyectarSistema = (mensaje, esError = false) => {
      const contenedor = dom.mensajesWrapper || dom.chatContainer;
      const html = moduloPlantillasInterfaz.generarMensajeSistemaHtml(mensaje, esError);
      contenedor.insertAdjacentHTML('beforeend', html);
      scrollToBottom();
    };

    const limpiarPastillaReintento = () => {
      if (state.idPastillaReintento) {
        const elemento = document.getElementById(state.idPastillaReintento);
        if (elemento) elemento.remove();
        state.idPastillaReintento = null;
      }
    };

    // Inicializar el vigilante de conectividad reactivo
    moduloMonitorConexion.inicializar({
      contenedor: dom.bannerRed,
      contenido: dom.bannerRedContenido,
      indicador: dom.bannerRedIndicador,
      texto: dom.bannerRedTexto
    }, (estaEnLinea) => {
      if (estaEnLinea) {
        // Al regresar internet, si había un fallo pendiente por red, sugerir reintento
        if (state.ultimoAudioFallido && !state.idPastillaReintento) {
          state.idPastillaReintento = `reintento-${Date.now()}`;
          const contenedor = dom.mensajesWrapper || dom.chatContainer;
          contenedor.insertAdjacentHTML('beforeend', moduloPlantillasInterfaz.generarPastillaReintentarHtml(state.idPastillaReintento));
          scrollToBottom();
        }
      } else {
        // Si se cayó la red mientras estaba en procesamiento, cancelar la espera inútil
        if (state.idEscribiendo) {
          const loader = document.getElementById(state.idEscribiendo);
          if (loader) loader.remove();
          state.idEscribiendo = null;
          setEstadoVisual("idle");
          inyectarSistema("Se interrumpió la conexión durante la traducción.", true);
        }
      }
    });

    const setEstadoVisual = (estado, rolFuente = null) => {
      if (estado === "grabando") {
        dom.divisor.classList.add('opacity-0');
        
        if (rolFuente === "staff") {
          dom.wrapperGuest.classList.add('lateral-oculto');
          dom.btnCancelarStaff.classList.add('activo'); 
        } else {
          dom.wrapperStaff.classList.add('lateral-oculto');
          dom.btnCancelarGuest.classList.add('activo'); 
        }
      } else {
        dom.divisor.classList.remove('opacity-0');
        dom.wrapperStaff.classList.remove('lateral-oculto');
        dom.wrapperGuest.classList.remove('lateral-oculto');
        
        dom.btnCancelarStaff.classList.remove('activo');
        dom.btnCancelarGuest.classList.remove('activo');

        moduloAnimacionMedusa.detenerMedusa(dom.waveStaff, dom.btnGrabarStaff);
        moduloAnimacionMedusa.detenerMedusa(dom.waveGuest, dom.btnGrabarGuest);
        
        if (estado === "procesando") {
          const id = `typing-${Date.now()}`;
          state.idEscribiendo = id;
          const contenedor = dom.mensajesWrapper || dom.chatContainer;
          contenedor.insertAdjacentHTML('beforeend', moduloPlantillasInterfaz.generarHtmlEscribiendo(rolFuente, id));
          scrollToBottom();
        }
      }
    };

    // --------------------------------------------------------------------------
    // PIPELINE DE ENVÍO CON MANEJO DE RED INSTANTÁNEO
    // --------------------------------------------------------------------------
    const enviarAudioAlServidor = (audioBlob, rol) => {
      limpiarPastillaReintento();

      // Validación preventiva instantánea: si no hay red, no esperar timeouts
      if (!moduloMonitorConexion.enLinea) {
        moduloMonitorConexion.mostrarEstado(false, "No hay internet. Audio en espera de red.");
        state.ultimoAudioFallido = { blob: audioBlob, rol: rol };
        setEstadoVisual("idle");
        
        state.idPastillaReintento = `reintento-${Date.now()}`;
        const contenedor = dom.mensajesWrapper || dom.chatContainer;
        contenedor.insertAdjacentHTML('beforeend', moduloPlantillasInterfaz.generarPastillaReintentarHtml(state.idPastillaReintento));
        scrollToBottom();
        return;
      }

      setEstadoVisual("procesando", rol);

      const etiquetaActual = `etiqueta_${Date.now()}_${++state.contadorTurnos}`;
      state.etiquetaUltimaValida = etiquetaActual;
      state.ultimoAudioFallido = { blob: audioBlob, rol: rol };

      const isoContrario = rol === "staff" 
        ? state.memoriaIdiomas.guest.iso 
        : state.memoriaIdiomas.staff.iso;

      const controladores = [new AbortController(), new AbortController(), new AbortController()];
      const temporizadores = [];
      let respuestaProcesada = false;

      const procesarRespuestaConEtiqueta = (data, numIntento) => {
        if (respuestaProcesada) return;
        if (state.etiquetasProcesadas.has(data.etiqueta)) return;
        if (data.etiqueta !== state.etiquetaUltimaValida) return;

        respuestaProcesada = true;
        state.etiquetasProcesadas.add(data.etiqueta);
        state.ultimoAudioFallido = null;

        temporizadores.forEach(t => clearTimeout(t));

        controladores.forEach((ctrl, idx) => {
          if (idx !== (numIntento - 1)) {
            try { ctrl.abort(); } catch (e) { }
          }
        });

        if (state.idEscribiendo) {
          const loader = document.getElementById(state.idEscribiendo);
          if (loader) loader.remove();
          state.idEscribiendo = null;
        }

        const dominante = data.hablantes && data.hablantes.length > 0 ? data.hablantes[0] : null;
        const esSilencio = !dominante || 
                           (data.texto_traducido && data.texto_traducido.includes("No se detectó")) || 
                           data.debug_error || 
                           dominante.nombre_idioma === "Silencio" || 
                           dominante.nombre_idioma === "Error";

        if (!esSilencio) {
          const iconosUnicos = [...new Set(data.hablantes.map(h => h.icono_persona).filter(Boolean))];
          const htmlIconos = iconosUnicos.map((ico, idx) => `<span class="animacion-rostro-pop" style="animation-delay: ${idx * 0.1}s">${ico}</span>`).join('');
          const multiNombre = data.hablantes.length > 1 ? dominante.nombre_idioma + " (+)" : dominante.nombre_idioma;

          if (rol === "staff") {
            state.memoriaIdiomas.staff.iso = dominante.iso;
            if (htmlIconos) dom.iconosStaff.innerHTML = htmlIconos;
            dom.langStaff.textContent = multiNombre;
            if (data.nombre_destino && data.nombre_destino !== "Silencio") dom.langGuest.textContent = data.nombre_destino;
          } else {
            state.memoriaIdiomas.guest.iso = dominante.iso;
            if (htmlIconos) dom.iconosGuest.innerHTML = htmlIconos;
            dom.langGuest.textContent = multiNombre;
            if (data.nombre_destino && data.nombre_destino !== "Silencio") dom.langStaff.textContent = data.nombre_destino;
          }
        }

        const contenedor = dom.mensajesWrapper || dom.chatContainer;
        contenedor.insertAdjacentHTML('beforeend', moduloPlantillasInterfaz.generarBurbujaHtml(
          data.hablantes, 
          rol, 
          data.texto_traducido, 
          data.iso_destino, 
          dominante ? dominante.icono_persona : null, 
          data.audio_voz
        ));
        scrollToBottom();
        setEstadoVisual("idle");

        if (!esSilencio) {
          moduloSintesisVoz.reproducirAudioOTexto(data.texto_traducido, data.iso_destino, dominante.icono_persona, data.audio_voz);
        }
      };

      const dispararIntento = (numIntento) => {
        if (respuestaProcesada || state.etiquetaUltimaValida !== etiquetaActual) return;

        moduloServicioTraduccion
          .ejecutarFetch(audioBlob, rol, isoContrario, etiquetaActual, controladores[numIntento - 1].signal)
          .then(data => procesarRespuestaConEtiqueta(data, numIntento))
          .catch(err => {
            if (err.name === 'AbortError') return;
            // Si el fetch falla de inmediato por desconexión de socket / DNS
            if (!navigator.onLine) {
              moduloMonitorConexion.manejarCambio(false);
            }
          });
      };

      dispararIntento(1);

      temporizadores.push(setTimeout(() => {
        if (moduloMonitorConexion.enLinea) dispararIntento(2);
      }, 2500));

      temporizadores.push(setTimeout(() => {
        if (moduloMonitorConexion.enLinea) dispararIntento(3);
      }, 8000));

      temporizadores.push(setTimeout(() => {
        if (!respuestaProcesada && state.etiquetaUltimaValida === etiquetaActual) {
          controladores.forEach(c => { try { c.abort(); } catch (e) { } });

          if (state.idEscribiendo) {
            const loader = document.getElementById(state.idEscribiendo);
            if (loader) loader.remove();
            state.idEscribiendo = null;
          }
          setEstadoVisual("idle");

          state.idPastillaReintento = `reintento-${Date.now()}`;
          const contenedor = dom.mensajesWrapper || dom.chatContainer;
          contenedor.insertAdjacentHTML('beforeend', moduloPlantillasInterfaz.generarPastillaReintentarHtml(state.idPastillaReintento));
          scrollToBottom();
        }
      }, 15000));
    };

    const iniciarGrabacion = async (rol) => {
      // Bloqueo preventivo si no hay internet
      if (!moduloMonitorConexion.enLinea) {
        moduloMonitorConexion.mostrarEstado(false, "No puedes traducir sin internet.");
        return;
      }

      moduloSintesisVoz.detenerCualquierAudio();
      moduloSintesisVoz.iniciarMotorSilencioso();
      
      state.canceladoManualmente = false;
      limpiarPastillaReintento();

      state.etiquetaUltimaValida = null;

      if (state.idEscribiendo) {
        const loader = document.getElementById(state.idEscribiendo);
        if (loader) loader.remove();
        state.idEscribiendo = null;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') await audioCtx.resume();
        
        const source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 128;
        source.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        state.volumenMaximo = 0;
        state.tiempoInicio = Date.now();

        const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
        const mimeType = mimeTypes.find(t => MediaRecorder.isTypeSupported(t)) || '';

        mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        audioChunks = []; 
        
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunks.push(e.data); };

        mediaRecorder.onstop = () => {
          const elementoOnda = state.grabandoRol === 'staff' ? dom.waveStaff : dom.waveGuest;
          const botonActivo = state.grabandoRol === 'staff' ? dom.btnGrabarStaff : dom.btnGrabarGuest;
          moduloAnimacionMedusa.detenerMedusa(elementoOnda, botonActivo);

          if (mediaRecorder.stream) mediaRecorder.stream.getTracks().forEach(t => t.stop());
          
          if (state.canceladoManualmente) {
            setEstadoVisual("idle");
            inyectarSistema("Grabación cancelada");
            return;
          }

          if (Date.now() - state.tiempoInicio < 800) {
            setEstadoVisual("idle");
            inyectarSistema("Audio muy corto o vacío");
            return;
          }

          const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
          audioChunks = []; 
          enviarAudioAlServidor(audioBlob, rol);
        };

        mediaRecorder.start();
        state.grabandoRol = rol;
        setEstadoVisual("grabando", rol);

        const elementoOnda = rol === 'staff' ? dom.waveStaff : dom.waveGuest;
        const botonActivo = rol === 'staff' ? dom.btnGrabarStaff : dom.btnGrabarGuest;
        moduloAnimacionMedusa.iniciarMedusa(analyser, dataArray, elementoOnda, botonActivo);

      } catch (err) {
        alert("Permite el acceso al micrófono para usar el traductor.");
        setEstadoVisual("idle");
      }
    };

    const detenerGrabacion = () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
      state.grabandoRol = null;
    };

    const handleGrabarClick = (rol) => {
      if (state.grabandoRol === rol) detenerGrabacion();
      else { 
        if (state.grabandoRol) detenerGrabacion(); 
        iniciarGrabacion(rol); 
      }
    };

    dom.btnGrabarStaff.addEventListener('click', () => handleGrabarClick('staff'));
    dom.btnGrabarGuest.addEventListener('click', () => handleGrabarClick('guest'));

    const handleCancelar = (e) => {
      e.stopPropagation(); 
      state.canceladoManualmente = true;
      detenerGrabacion();
    };

    dom.btnCancelarStaff.addEventListener('click', handleCancelar);
    dom.btnCancelarGuest.addEventListener('click', handleCancelar);

    dom.chatContainer.addEventListener('click', (e) => {
      const botonRepetir = e.target.closest('.btn-repetir-voz');
      if (botonRepetir) {
        const texto = botonRepetir.dataset.texto;
        const iso = botonRepetir.dataset.iso;
        const icono = botonRepetir.dataset.icono;
        const audioBase64 = botonRepetir.dataset.audio;
        
        moduloSintesisVoz.reproducirAudioOTexto(texto, iso, icono, audioBase64);
        return;
      }

      const botonReintentar = e.target.closest('.btn-ejecutar-reintento');
      if (botonReintentar && state.ultimoAudioFallido) {
        limpiarPastillaReintento();
        enviarAudioAlServidor(state.ultimoAudioFallido.blob, state.ultimoAudioFallido.rol);
      }
    });
  }
};