export default {
  html: () => `
    <div class="flex items-center justify-center h-full w-full relative z-10">
      <div class="bg-slate-900/90 border border-slate-700 p-8 rounded-2xl flex flex-col items-center backdrop-blur-md">
        <div id="radio-status" class="text-slate-400 font-mono text-xs mb-4">ESPERANDO CONEXIÓN...</div>
        <button id="radio-ptt" class="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 active:border-emerald-500 flex items-center justify-center font-bold text-slate-400 hover:text-white transition-all select-none">
          PTT
        </button>
      </div>
    </div>
  `,
  init: async () => {
    const btn = document.getElementById('radio-ptt');
    const status = document.getElementById('radio-status');
    
    status.textContent = 'ENLACE WSS:// ABIERTO';

    const startPtt = () => {
      btn.classList.add('border-emerald-500', 'text-emerald-400');
      status.textContent = 'TRANSMITIENDO...';
    };

    const stopPtt = () => {
      btn.classList.remove('border-emerald-500', 'text-emerald-400');
      status.textContent = 'ENLACE WSS:// ABIERTO';
    };

    btn.addEventListener('mousedown', startPtt);
    window.addEventListener('mouseup', stopPtt);
    btn.addEventListener('touchstart', startPtt, {passive: false});
    window.addEventListener('touchend', stopPtt);

    return () => {
      console.log("Cerrando WebSockets de la Radio...");
      window.removeEventListener('mouseup', stopPtt);
      window.removeEventListener('touchend', stopPtt);
    };
  }
};
