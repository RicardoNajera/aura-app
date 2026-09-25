export default {
  html: () => `
    <style>
      /* Bloqueo estricto para evitar scroll de la ventana en móviles */
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
      
      /* Animación de GPU ultraligera (Cero CPU) */
      @keyframes fluidColors {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .bg-aurora-gpu {
        /* Gradiente: Morado profundo, Rosa magenta, Azul cuántico, Violeta oscuro */
        background: linear-gradient(-45deg, #2e0249, #6d0c4b, #0b2057, #1b0235);
        background-size: 400% 400%;
        animation: fluidColors 12s ease infinite;
        /* Forzamos al teléfono a usar su tarjeta gráfica dedicada */
        transform: translateZ(0);
        will-change: background-position;
      }

      /* Animación de entrada de mensajes acelerada */
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(15px) translateZ(0); }
        to { opacity: 1; transform: translateY(0) translateZ(0); }
      }
      .msg-anim {
        animation: slideUpFade 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        will-change: transform, opacity;
      }
      
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
    </style>

    <!-- Fondo GPU de Colores -->
    <div class="fixed inset-0 w-full h-full bg-aurora-gpu -z-10"></div>
    
    <!-- Contenedor Maestro Adaptable (100dvh) -->
    <div class="relative z-10 w-full h-[100dvh] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      
      <!-- Interfaz Central Glassmorphism -->
      <div class="w-full max-w-4xl h-full bg-black/20 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] border border-white/10 flex flex-col overflow-hidden shadow-2xl relative">
        
        <!-- Encabezado adaptable -->
        <div class="text-center pt-5 sm:pt-7 pb-2 shrink-0 msg-anim">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 tracking-[0.3em] uppercase drop-shadow-md">
            AURA <span class="font-bold text-white">IA</span>
          </h1>
          <div class="w-8 sm:w-12 h-[1px] bg-white/20 mx-auto mt-2 sm:mt-3"></div>
        </div>

        <!-- Zona de Chat -->
        <div id="chat-container" class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 flex flex-col">
           <div class="mt-auto"></div>
           
           <div class="flex items-end space-x-2 sm:space-x-3 msg-anim w-full">
              <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-purple-800 to-blue-800 flex items-center justify-center shrink-0 border border-white/10 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                <span class="text-[8px] sm:text-[9px] font-bold text-white font-mono">IA</span>
              </div>
              <div class="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl rounded-bl-none bg-white/[0.06] border border-white/10 text-slate-200 text-xs sm:text-sm max-w-[90%] sm:max-w-[85%] leading-relaxed font-light shadow-md">
                Bienvenido a Aura. ¿En qué le puedo asistir?
              </div>
           </div>
        </div>

        <!-- Barra de Entrada Flotante -->
        <div class="p-3 sm:p-5 bg-black/30 backdrop-blur-md border-t border-white/10 shrink-0">
          <div class="flex items-end space-x-2 bg-black/50 p-1.5 sm:p-2 rounded-2xl border border-white/10 focus-within:border-purple-500/50 transition-all shadow-inner">
            <textarea id="ai-input" rows="1" class="flex-1 bg-transparent border-none px-3 py-2 text-slate-100 text-xs sm:text-sm font-light focus:outline-none focus:ring-0 resize-none max-h-20 sm:max-h-28 placeholder-slate-400" placeholder="Escriba aquí..."></textarea>
            
            <button id="ai-btn" class="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white transition-all shrink-0 active:scale-90 group flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 transition-all transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  init: async () => {
    const btn = document.getElementById('ai-btn');
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('chat-container');

    input.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
      scrollToBottom();
    });

    const scrollToBottom = () => {
      chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    };

    const enviar = async () => {
      const texto = input.value.trim();
      if (!texto) return;

      chat.innerHTML += `
        <div class="flex items-end justify-end space-x-2 sm:space-x-3 msg-anim w-full">
          <div class="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl rounded-br-none bg-blue-900/40 border border-blue-500/30 text-white text-xs sm:text-sm max-w-[90%] sm:max-w-[85%] leading-relaxed font-light shadow-md backdrop-blur-sm">
            ${texto}
          </div>
        </div>
      `;
      
      input.value = '';
      input.style.height = 'auto';
      scrollToBottom();

      const loadingId = 'loading-' + Date.now();
      
      chat.innerHTML += `
        <div id="${loadingId}" class="flex items-end space-x-2 sm:space-x-3 msg-anim w-full">
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-purple-500/30">
            <span class="text-[8px] sm:text-[9px] font-bold text-purple-400 font-mono">IA</span>
          </div>
          <div class="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl rounded-bl-none bg-transparent text-purple-300/70 text-[10px] sm:text-xs italic tracking-widest flex items-center space-x-2">
            <span class="animate-pulse">Procesando...</span>
          </div>
        </div>
      `;
      scrollToBottom();

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch('https://asistente-backend.auraradio-cloud.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: texto }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();
        
        document.getElementById(loadingId)?.remove();

        const respuestaIA = data.reply || "Hubo un error de transmisión.";

        chat.innerHTML += `
          <div class="flex items-end space-x-2 sm:space-x-3 msg-anim w-full">
            <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              <span class="text-[8px] sm:text-[9px] font-bold text-white font-mono">IA</span>
            </div>
            <div class="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl rounded-bl-none bg-white/[0.08] border border-white/20 text-slate-100 text-xs sm:text-sm max-w-[90%] sm:max-w-[85%] leading-relaxed font-light shadow-lg backdrop-blur-md">
              ${respuestaIA}
            </div>
          </div>
        `;
        scrollToBottom();

      } catch (error) {
        document.getElementById(loadingId)?.remove();
        
        chat.innerHTML += `
          <div class="flex items-end space-x-2 sm:space-x-3 msg-anim w-full">
            <div class="px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl rounded-bl-none bg-red-900/30 border border-red-500/30 text-red-200 text-xs sm:text-sm font-light backdrop-blur-sm">
              Conexión interrumpida.
            </div>
          </div>
        `;
        scrollToBottom();
      }
    };

    btn.addEventListener('click', enviar);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviar();
      }
    });
  }
};