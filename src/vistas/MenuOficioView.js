import { uiDinamicaServicio } from '../servicios/uiDinamicaServicio.js';

export default {
  html: (trabajador) => {
    const ui = uiDinamicaServicio.obtenerMenuPorOficio(trabajador.subArea);
    const color = ui.color;

    const grillaHerramientas = ui.herramientas.map(h => `
      <div onclick="alert('Abriendo: ${h.titulo}')" class="tarjeta-oficio panel-cristal rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer">
        <span class="text-xl mb-1.5">${h.icono}</span>
        <span class="text-[10px] font-semibold text-white leading-tight">${h.titulo}</span>
      </div>
    `).join('');

    const promptsHtml = ui.prompts.map(p => `
      <button onclick="window.consultarCopiloto('${p}')" class="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300 whitespace-nowrap active:bg-white/20 transition-colors">
        ${p}
      </button>
    `).join('');

    return `
      <div class="flex-1 fondo-operaciones flex flex-col overflow-hidden text-white relative">
        
        <!-- Header Flotante -->
        <header class="pt-10 pb-4 px-6 panel-cristal border-b border-white/5 shrink-0 z-10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-${color}-500/20 border border-${color}-500/40 flex items-center justify-center text-lg">
              ${ui.iconoGlobal}
            </div>
            <div>
              <h1 class="text-sm font-bold tracking-wide">${trabajador.subArea}</h1>
              <div class="flex items-center gap-1.5 text-[9px] text-${color}-400 font-medium tracking-widest uppercase">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399] animate-pulse"></span>
                Turno Activo
              </div>
            </div>
          </div>
          <button onclick="window.cerrarSesion()" class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 active:text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        </header>

        <!-- Contenido Desplazable -->
        <div class="flex-1 overflow-y-auto p-5 pb-24 scroll-smooth">
          
          <!-- Botones de Acción Rápida PTT / Traductor -->
          <div class="flex gap-3 mb-6 anim-entrar" style="animation-delay: 0.1s">
            <button onclick="alert('Abriendo Walkie-Talkie Digital: Canal ${trabajador.departamento}')" class="flex-1 panel-cristal py-3 rounded-xl border border-white/5 text-xs font-semibold flex items-center justify-center gap-2 active:bg-white/10">
              <span class="text-base">📻</span> Radio PTT
            </button>
            <!-- Modificado: Ahora llama a abrirVistaTraductor() -->
            <button onclick="window.abrirVistaTraductor()" class="flex-1 panel-cristal py-3 rounded-xl border border-white/5 text-xs font-semibold flex items-center justify-center gap-2 active:bg-white/10">
              <span class="text-base">🌐</span> Traductor
            </button>
          </div>

          <!-- Módulo IA Copiloto (Estilo Terminal / Chat Integrado) -->
          <div class="panel-cristal rounded-2xl border border-${color}-500/30 p-4 mb-6 anim-entrar shadow-[0_5px_20px_rgba(0,0,0,0.4)]" style="animation-delay: 0.2s">
            <div class="flex items-center justify-between mb-3">
              <span class="text-[11px] font-bold text-${color}-300 uppercase tracking-widest flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Copiloto Aura IA
              </span>
            </div>

            <!-- Caja de Chat IA -->
            <div id="pantalla-ia" class="w-full h-32 bg-black/60 rounded-xl border border-white/5 p-3 overflow-y-auto text-[11px] font-mono text-slate-300 mb-3">
              > Sistema técnico inicializado para ${trabajador.subArea}.<br>
              > Listo para consultas operativas.
            </div>

            <div class="flex gap-2 mb-3">
              <input id="input-pregunta" type="text" placeholder="Escribe tu duda técnica..." class="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-${color}-500/50">
              <button onclick="window.enviarPregunta()" class="bg-${color}-600/80 text-white px-3 rounded-lg text-xs font-medium border border-${color}-500 active:scale-95 transition-transform">Ir</button>
            </div>

            <div class="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
              ${promptsHtml}
            </div>
          </div>

          <!-- Cuadrícula de Herramientas del Oficio -->
          <h3 class="text-[10px] uppercase tracking-widest text-slate-400 mb-3 anim-entrar" style="animation-delay: 0.3s">Herramientas Operativas</h3>
          <div class="grid grid-cols-2 gap-3 anim-entrar" style="animation-delay: 0.4s">
            ${grillaHerramientas}
          </div>

        </div>
        
        <!-- Sombra difuminada inferior -->
        <div class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div>
      </div>
    `;
  },
  iniciar: async (trabajador) => {
    // Se eliminó window.abrirTraductor de aquí, ya que ahora lo gestiona app.js

    const pantallaIa = document.getElementById('pantalla-ia');

    window.consultarCopiloto = (pregunta) => {
      pantallaIa.innerHTML += `<br><span class="text-white">> ${pregunta}</span>`;
      pantallaIa.scrollTop = pantallaIa.scrollHeight;
      
      setTimeout(() => {
        pantallaIa.innerHTML += `<br><span class="text-emerald-400">✓ Parámetro verificado. Protocolo seguro para ${trabajador.subArea}. Regístrelo al terminar.</span>`;
        pantallaIa.scrollTop = pantallaIa.scrollHeight;
      }, 600);
    };

    window.enviarPregunta = () => {
      const input = document.getElementById('input-pregunta');
      if (input.value.trim()) {
        window.consultarCopiloto(input.value.trim());
        input.value = '';
      }
    };
  }
};