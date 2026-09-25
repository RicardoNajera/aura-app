export default {
  html: () => `
    <!-- Fondo Cuántico IA -->
    <canvas id="ia-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
    
    <div class="relative z-10 w-full max-w-5xl mx-auto mt-4 p-4 flex flex-col h-[82vh]">
      
      <!-- Encabezado Planet IA -->
      <div class="text-center mb-6">
        <h1 class="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          PLANET IA
        </h1>
        <p class="text-xs text-blue-400 font-mono tracking-widest mt-2 uppercase">Núcleo Aura Activo // Conserje Holográfico</p>
      </div>

      <!-- Caparazón de Cristal y Gradiente -->
      <div class="flex-1 relative rounded-3xl p-[2px] bg-gradient-to-b from-rose-500 via-purple-500 to-blue-600 shadow-[0_0_40px_rgba(168,85,247,0.25)] flex flex-col transition-all">
        <div class="flex-1 bg-[#030508]/90 backdrop-blur-xl rounded-[23px] flex flex-col overflow-hidden">
          
          <!-- Ventana de Chat -->
          <div id="chat-container" class="flex-1 overflow-y-auto p-6 space-y-6 font-sans">
             
             <!-- Burbuja de Bienvenida IA -->
             <div class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-blue-500 p-[2px] shadow-[0_0_15px_rgba(168,85,247,0.6)] shrink-0">
                  <div class="w-full h-full bg-[#030508] rounded-full flex items-center justify-center">
                    <span class="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-blue-400 font-mono tracking-widest">IA</span>
                  </div>
                </div>
                <div class="p-4 rounded-2xl rounded-tl-none bg-purple-900/10 border border-purple-500/30 text-slate-200 text-sm max-w-[80%] shadow-lg backdrop-blur-md leading-relaxed">
                  Saludos. Soy <strong>Planet IA</strong>. Mi núcleo Aura está sincronizado con las operaciones de Planet Hollywood. ¿En qué puedo asombrarte hoy?
                </div>
             </div>
             
          </div>

          <!-- Controles de Entrada -->
          <div class="p-4 bg-[#050810]/80 border-t border-purple-500/20 flex items-center space-x-3">
            <input type="text" id="ai-input" class="flex-1 bg-[#0a0e17] border border-purple-500/30 rounded-xl px-5 py-3 text-slate-200 font-sans focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder-slate-600 shadow-inner" placeholder="Introduce tu consulta en la matriz...">
            <button id="ai-btn" class="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 hover:from-rose-500 hover:via-purple-500 hover:to-blue-500 text-white font-mono text-sm font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95">
              ENVIAR
            </button>
          </div>

        </div>
      </div>
    </div>
  `,
  init: async () => {
    // 1. Lógica del Chat
    const btn = document.getElementById('ai-btn');
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('chat-container');

    const enviar = () => {
      const texto = input.value.trim();
      if (!texto) return;

      // Burbuja del Usuario (Tonos Azules)
      chat.innerHTML += `
        <div class="flex items-start justify-end space-x-4">
          <div class="p-4 rounded-2xl rounded-tr-none bg-blue-900/20 border border-blue-500/30 text-white text-sm max-w-[80%] shadow-lg backdrop-blur-md leading-relaxed">
            ${texto}
          </div>
          <div class="w-10 h-10 rounded-full bg-slate-800 border border-blue-500/50 flex items-center justify-center shrink-0">
            <span class="text-[10px] font-mono text-blue-300">TÚ</span>
          </div>
        </div>
      `;
      
      input.value = '';
      chat.scrollTop = chat.scrollHeight;

      // Respuesta simulada de Planet IA (Tonos Rojos/Morados)
      setTimeout(() => {
        chat.innerHTML += `
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-purple-500 p-[2px] shadow-[0_0_15px_rgba(244,63,94,0.6)] shrink-0">
              <div class="w-full h-full bg-[#030508] rounded-full flex items-center justify-center">
                <span class="text-[10px] font-bold text-rose-400 font-mono tracking-widest">IA</span>
              </div>
            </div>
            <div class="p-4 rounded-2xl rounded-tl-none bg-rose-900/10 border border-rose-500/30 text-slate-200 text-sm max-w-[80%] shadow-lg backdrop-blur-md leading-relaxed">
              Solicitud procesada: <span class="text-rose-400 font-mono">"${texto}"</span>. El Núcleo Aura responde con eficiencia.
            </div>
          </div>
        `;
        chat.scrollTop = chat.scrollHeight;
      }, 600);
    };

    btn.addEventListener('click', enviar);
    input.addEventListener('keypress', (e) => e.key === 'Enter' && enviar());

    // 2. Motor Gráfico del Canvas (Rojo, Morado, Azul)
    const canvas = document.getElementById('ia-canvas');
    let animationFrameId;
    
    if (canvas) {
      const ctx = canvas.getContext('2d', { alpha: false });
      let width, height;

      const resizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      let timeVar = 0;
      // Paleta de colores IA Aura
      const aiColors = [
        { r: 244, g: 63, b: 94 },   // Rosa/Rojo (rose-500)
        { r: 168, g: 85, b: 247 },  // Morado (purple-500)
        { r: 59, g: 130, b: 246 }   // Azul (blue-500)
      ];

      const drawNeuralWaves = () => {
        animationFrameId = requestAnimationFrame(drawNeuralWaves);
        ctx.fillStyle = '#020305'; // Fondo ultra oscuro
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'screen';

        timeVar += 0.005; 
        const centerY = height / 2;

        for (let i = 0; i < aiColors.length; i++) {
          const c = aiColors[i];
          const phaseOffset = i * (Math.PI / 1.2);

          ctx.beginPath();
          ctx.lineWidth = 4;
          ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.15)`;

          for (let x = 0; x <= width + 40; x += 40) {
            const y = centerY + 
                      Math.sin(x * 0.002 + timeVar + phaseOffset) * 
                      Math.cos(x * 0.001 - timeVar) * 150;
                      
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';
      };
      
      drawNeuralWaves();
    }

    // 3. Limpieza de memoria al cambiar de vista
    return () => {
      console.log("Apagando Núcleo Visual de Planet IA...");
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }
};