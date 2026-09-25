export default {
  html: () => `
    <style>
      /* Animación GPU de colores vibrantes (Cero impacto en CPU) */
      @keyframes fluidColors {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .bg-aurora-gpu {
        background: linear-gradient(-45deg, #4c0070, #91005a, #0a236e, #2d004d);
        background-size: 400% 400%;
        animation: fluidColors 15s ease infinite;
        transform: translateZ(0); /* Aceleración por hardware */
      }

      /* Animación de entrada de los mensajes */
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .msg-anim {
        animation: slideUpFade 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }
      
      /* Scrollbar universal limpio */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.25); border-radius: 10px; }
    </style>

    <!-- CAPA 1: Fondo Visual (Fijo en el fondo de toda la pantalla, detrás de tu nav) -->
    <div class="fixed inset-0 w-full h-full bg-aurora-gpu" style="z-index: -1;"></div>
    
    <!-- CAPA 2: Contenedor Maestro (Respeta el pt-16 y el tamaño de #app de tu index.html) -->
    <div class="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 box-border">
      
      <!-- CAPA 3: Ventana de Cristal (Se estira perfectamente sin salirse ni encimarse) -->
      <div class="w-full max-w-5xl h-full flex flex-col bg-black/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        <!-- ENCABEZADO (Bloqueado arriba) -->
        <div class="w-full shrink-0 pt-5 sm:pt-7 pb-4 text-center bg-gradient-to-b from-black/60 to-transparent border-b border-white/5">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 tracking-[0.3em] uppercase drop-shadow-lg">
            AURA <span class="font-bold text-white">IA</span>
          </h1>
          <div class="w-12 sm:w-16 h-[1px] bg-white/30 mx-auto mt-2"></div>
        </div>

        <!-- ÁREA DE CHAT (Flex-1: Toma el espacio exacto del centro y hace scroll) -->
        <div id="chat-container" class="flex-1 w-full overflow-y-auto p-4 sm:p-6 flex flex-col space-y-4 sm:space-y-6">
           
           <div class="mt-auto"></div>
           
           <!-- Mensaje Inicial de la IA -->
           <div class="flex items-end space-x-3 msg-anim w-full">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-800 to-blue-800 flex items-center justify-center shrink-0 border border-white/20 shadow-lg">
                <span class="text-[9px] sm:text-[11px] font-bold text-white font-mono">IA</span>
              </div>
              <div class="px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl rounded-bl-none bg-white/[0.08] border border-white/10 text-slate-100 text-sm sm:text-base max-w-[90%] sm:max-w-[80%] leading-relaxed font-light shadow-md backdrop-blur-sm">
                Bienvenido al sistema corporativo. ¿En qué le puedo asistir?
              </div>
           </div>
        </div>

        <!-- ÁREA DE ENTRADA (Bloqueada abajo) -->
        <div class="w-full shrink-0 p-3 sm:p-5 bg-black/60 backdrop-blur-xl border-t border-white/10">
          <div class="max-w-4xl mx-auto flex items-end space-x-2 sm:space-x-3 bg-black/60 p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-white/10 focus-within:border-purple-500/60 transition-all shadow-inner">
            <textarea id="ai-input" rows="1" class="flex-1 bg-transparent border-none px-4 py-2 sm:py-3 text-slate-100 text-sm sm:text-base font-light focus:outline-none focus:ring-0 resize-none max-h-24 sm:max-h-32 placeholder-slate-400" placeholder="Consulte al conserje..."></textarea>
            
            <button id="ai-btn" class="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-500 text-white transition-all shrink-0 active:scale-95 group flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
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

    // Autoajuste de altura del área de texto
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
        <div class="flex items-end justify-end space-x-3 msg-anim w-full">
          <div class="px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl rounded-br-none bg-blue-900/60 border border-blue-500/40 text-white text-sm sm:text-base max-w-[90%] sm:max-w-[80%] leading-relaxed font-light shadow-md backdrop-blur-md">
            ${texto}
          </div>
        </div>
      `;
      
      input.value = '';
      input.style.height = 'auto';
      scrollToBottom();

      const loadingId = 'loading-' + Date.now();
      
      chat.innerHTML += `
        <div id="${loadingId}" class="flex items-end space-x-3 msg-anim w-full">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 border border-purple-500/40 shadow-inner">
            <span class="text-[9px] sm:text-[11px] font-bold text-purple-400 font-mono">IA</span>
          </div>
          <div class="px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl rounded-bl-none bg-transparent text-purple-300/80 text-xs sm:text-sm italic tracking-widest flex items-center space-x-2">
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

        const respuestaIA = data.reply || "Error en la señal. Intente de nuevo.";

        chat.innerHTML += `
          <div class="flex items-end space-x-3 msg-anim w-full">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-white/20">
              <span class="text-[9px] sm:text-[11px] font-bold text-white font-mono">IA</span>
            </div>
            <div class="px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl rounded-bl-none bg-white/[0.1] border border-white/20 text-slate-100 text-sm sm:text-base max-w-[90%] sm:max-w-[80%] leading-relaxed font-light shadow-xl backdrop-blur-md">
              ${respuestaIA}
            </div>
          </div>
        `;
        scrollToBottom();

      } catch (error) {
        document.getElementById(loadingId)?.remove();
        
        chat.innerHTML += `
          <div class="flex items-end space-x-3 msg-anim w-full">
            <div class="px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl rounded-bl-none bg-red-900/40 border border-red-500/40 text-red-200 text-sm sm:text-base font-light backdrop-blur-md">
              Conexión interrumpida con el núcleo Aura.
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