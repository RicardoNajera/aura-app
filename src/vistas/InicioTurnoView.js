export default {
  html: () => `
    <div class="flex-1 fondo-operaciones overflow-y-auto flex flex-col p-6 text-white pb-12">
      <!-- Cabecera Logo -->
      <div class="flex items-center justify-center gap-3 mt-6 mb-10 anim-entrar" style="animation-delay: 0.1s">
        <div class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-bold text-lg tracking-tighter bg-black/50">ph</div>
        <div class="flex flex-col">
          <span class="text-lg font-semibold tracking-widest leading-none uppercase">Operaciones</span>
          <span class="text-[9px] tracking-[0.3em] font-light mt-1 text-emerald-400">ACCESO PERSONAL</span>
        </div>
      </div>

      <div class="mb-6 anim-entrar" style="animation-delay: 0.2s">
        <h2 class="text-2xl font-light text-white">Inicio de <span class="font-semibold text-emerald-400">Turno</span></h2>
        <p class="text-xs text-slate-400 mt-1 font-light">Selecciona tu área o escanea tu credencial.</p>
      </div>

      <!-- Tarjeta Lector QR -->
      <div class="panel-cristal rounded-2xl p-5 mb-8 border border-white/5 flex items-center gap-4 anim-entrar cursor-pointer hover:border-emerald-500/30 transition-colors" onclick="alert('Abriendo cámara para gafete...')" style="animation-delay: 0.3s">
        <div class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
        </div>
        <div>
          <h3 class="font-medium text-sm">Escaneo Rápido (QR)</h3>
          <p class="text-[11px] text-slate-400">Gafete de colaborador</p>
        </div>
      </div>

      <!-- Selector Manual de Áreas -->
      <h3 class="text-[10px] uppercase tracking-widest text-slate-500 mb-4 anim-entrar" style="animation-delay: 0.4s">Selector Manual</h3>
      
      <div class="grid grid-cols-2 gap-3 anim-entrar" style="animation-delay: 0.5s">
        <!-- Dept 1 -->
        <div onclick="window.iniciarSesion('Mantenimiento', 'Electromecánico')" class="tarjeta-oficio panel-cristal rounded-2xl p-4 border border-indigo-500/20 text-center cursor-pointer">
          <span class="text-2xl block mb-2">⚡</span>
          <h4 class="text-[11px] font-semibold text-indigo-300">Electromecánica</h4>
        </div>
        <!-- Dept 2 -->
        <div onclick="window.iniciarSesion('Mantenimiento', 'Pintor')" class="tarjeta-oficio panel-cristal rounded-2xl p-4 border border-rose-500/20 text-center cursor-pointer">
          <span class="text-2xl block mb-2">🎨</span>
          <h4 class="text-[11px] font-semibold text-rose-300">Pintura / MICI</h4>
        </div>
        <!-- Dept 3 -->
        <div onclick="window.iniciarSesion('Cocina', 'Mecánico de Cocina')" class="tarjeta-oficio panel-cristal rounded-2xl p-4 border border-amber-500/20 text-center cursor-pointer">
          <span class="text-2xl block mb-2">🔥</span>
          <h4 class="text-[11px] font-semibold text-amber-300">Mecánico Cocina</h4>
        </div>
        <!-- Dept 4 -->
        <div onclick="window.iniciarSesion('Albercas', 'Alberquero')" class="tarjeta-oficio panel-cristal rounded-2xl p-4 border border-cyan-500/20 text-center cursor-pointer">
          <span class="text-2xl block mb-2">💧</span>
          <h4 class="text-[11px] font-semibold text-cyan-300">Alberquero</h4>
        </div>
        <!-- Genérico -->
        <div onclick="window.iniciarSesion('Áreas Públicas', 'Limpieza')" class="tarjeta-oficio panel-cristal rounded-2xl p-4 border border-slate-500/20 text-center cursor-pointer col-span-2">
          <span class="text-xl block mb-1">🧹</span>
          <h4 class="text-[11px] font-semibold text-slate-300">Áreas Públicas / Otro</h4>
        </div>
      </div>

    </div>
  `,
  iniciar: async () => {}
};
