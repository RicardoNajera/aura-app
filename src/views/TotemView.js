export default {
  html: () => `
    <canvas id="quantum-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
    <div class="relative z-10 w-full max-w-4xl mx-auto mt-10 p-8 flex flex-col h-[75vh]">
      <div class="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-2xl backdrop-blur-md">
        <div id="chat-container" class="flex-1 overflow-y-auto space-y-4 mb-4">
           <div class="text-fuchsia-400 font-mono text-sm">AI > Sistema Flash iniciado. ¿En qué puedo ayudarte?</div>
        </div>
        <div class="flex space-x-2">
          <input type="text" id="ai-input" class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white font-sans focus:outline-none focus:border-fuchsia-500" placeholder="Escribe un comando...">
          <button id="ai-btn" class="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-xl text-white font-mono font-bold">ENVIAR</button>
        </div>
      </div>
    </div>
  `,
  init: async () => {
    const btn = document.getElementById('ai-btn');
    const input = document.getElementById('ai-input');
    const chat = document.getElementById('chat-container');

    const enviar = () => {
      if (!input.value) return;
      chat.innerHTML += \`<div class="text-white text-right text-sm">\${input.value} <span class="text-slate-500">< TÚ</span></div>\`;
      setTimeout(() => {
        chat.innerHTML += \`<div class="text-emerald-400 font-mono text-sm">AI > Solicitud de "\${input.value}" procesada en red.</div>\`;
        chat.scrollTop = chat.scrollHeight;
      }, 500);
      input.value = '';
    };

    btn.addEventListener('click', enviar);
    input.addEventListener('keypress', (e) => e.key === 'Enter' && enviar());

    const canvas = document.getElementById('quantum-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = '#030508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return () => console.log("Limpiando procesos del Tótem...");
  }
};
