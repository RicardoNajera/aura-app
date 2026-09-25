export default {
  html: () => `
    <style>
      /* Fondo animado acelerado por GPU (Cero lag en móviles de bajos recursos) */
      @keyframes aurora {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .bg-aurora {
        background: linear-gradient(-45deg, #020305, #080512, #050810, #0a030d);
        background-size: 400% 400%;
        animation: aurora 15s ease infinite;
      }
      
      /* Animación elegante de entrada de mensajes */
      @keyframes slideUpFade {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .msg-anim {
        animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      }

      /* Scrollbar minimalista e invisible */
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
    </style>

    <!-- Fondo de Rendimiento Ultra Ligero -->
    <div class="fixed inset-0 w-full h-full bg-aurora -z-10"></div>
    
    <!-- Contenedor adaptativo: usa 'dvh' para no cortarse con los teclados en móviles -->
    <div class="relative z-10 w-full h-[100dvh] max-w-3xl mx-auto flex flex-col pt-8 pb-4 px-4 sm:px-6">
      
      <!-- Encabezado Diamante -->
      <div class="text-center mb-6 shrink-0 msg-anim">
        <h1 class="text-2xl sm:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 tracking-[0.3em] uppercase">
          AURA <span class="font-bold text-white">IA</span>
        </h1>
        <div class="w-12 h-[1px] bg-white/20 mx-auto mt-3"></div>
      </div>

      <!-- Caparazón de Cristal (Glassmorphism Limpio) -->
      <div class="flex-1 w-full bg-white/[0.02] backdrop-blur-xl rounded-[2rem] border border-white/10 flex flex-col overflow-hidden shadow-2xl relative">
        
        <!-- Zona de Chat (Aquí ocurre la magia de empujar hacia arriba) -->
        <div id="chat-container" class="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 flex flex-col">
           
           <!-- Este div vacío empuja todo el contenido hacia abajo al principio -->
           <div class="mt-auto"></div>
           
           <!-- Burbuja de Bienvenida IA -->
           <div class="flex items-end space-x-3 msg-anim w-full">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center shrink-0 border border-white/5">
                <span class="text-[9px] font-bold text-slate-300 font-mono">IA</span>
              </div>
              <div class="px-5 py-3.5 rounded-2xl rounded-bl-none bg-white/[0.04] border border-white/5 text-slate-300 text-sm max-w-[85%] leading-relaxed font-light">
                Bienvenido. ¿En qué le asisto hoy?
              </div>
           </div>
           
        </div>

        <!-- Barra de Entrada Flotante -->
        <div class="p-4 sm:p-5">
          <div class="flex items-end space-x-2 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10 focus-within:border-white/30 transition-all shadow-inner">
            <textarea id="ai-input" rows="1" class="flex-1 bg-transparent border-none px-3 py-2 text-slate-200 text-sm font-light focus:outline-none focus:ring-0 resize-none max-h-24 placeholder-slate-600" placeholder="Consulte al conserje..."></textarea>
            
            <button id="ai-btn" class="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shrink-0 active:scale-90 group flex items-center justify-center">
              <svg class="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
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

    // Hace que el input crezca si el texto es muy largo sin romper el diseño
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

      // Burbuja del Usuario (Diseño oscuro elegante)
      chat.innerHTML += `
        <div class="flex items-end justify-end space-x-3 msg-anim w-full">
          <div class="px-5 py-3.5 rounded-2xl rounded-br-none bg-slate-800/80 border border-slate-700 text-slate-100 text-sm max-w-[85%] leading-relaxed font-light shadow-sm">
            ${texto}
          </div>
        </div>
      `;
      
      input.value = '';
      input.style.height = 'auto';
      scrollToBottom();

      const loadingId = 'loading-' + Date.now();
      
      // Animación de Pensando (Elegante y sutil)
      chat.innerHTML += `
        <div id="${loadingId}" class="flex items-end space-x-3 msg-anim w-full">
          <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5">
            <span class="text-[9px] font-bold text-slate-400 font-mono">IA</span>
          </div>
          <div class="px-5 py-3.5 rounded-2xl rounded-bl-none bg-transparent text-slate-500 text-xs italic tracking-widest flex items-center space-x-2">
            <span class="animate-pulse">Sincronizando...</span>
          </div>
        </div>
      `;
      scrollToBottom();

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // Nunca se quedará pasmado

        const response = await fetch('https://asistente-backend.auraradio-cloud.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: texto }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();
        
        document.getElementById(loadingId)?.remove();

        const respuestaIA = data.reply || "Hubo una breve interferencia en la red.";

        // Respuesta final de la IA (Diseño destacado pero limpio)
        chat.innerHTML += `
          <div class="flex items-end space-x-3 msg-anim w-full">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-slate-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <span class="text-[9px] font-bold text-black font-mono">IA</span>
            </div>
            <div class="px-5 py-3.5 rounded-2xl rounded-bl-none bg-white/10 border border-white/20 text-slate-100 text-sm max-w-[85%] leading-relaxed font-light shadow-lg backdrop-blur-md">
              ${respuestaIA}
            </div>
          </div>
        `;
        scrollToBottom();

      } catch (error) {
        document.getElementById(loadingId)?.remove();
        
        chat.innerHTML += `
          <div class="flex items-end space-x-3 msg-anim w-full">
            <div class="px-5 py-3.5 rounded-2xl rounded-bl-none bg-red-900/20 border border-red-500/20 text-red-300/80 text-sm font-light">
              Conexión temporalmente interrumpida.
            </div>
          </div>
        `;
        scrollToBottom();
      }
    };

    btn.addEventListener('click', enviar);
    input.addEventListener('keypress', (e) => {
      // Envía con Enter, salta línea con Shift+Enter
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviar();
      }
    });
  }
};