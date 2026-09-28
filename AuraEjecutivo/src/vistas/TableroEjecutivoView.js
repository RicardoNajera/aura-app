import { metricasServicio } from '../servicios/metricasServicio.js';

export default {
  html: () => `
    <div class="min-h-full p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto flex flex-col gap-8">
      
      <!-- Cabecera Ejecutiva -->
      <header class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 anim-fade-up" style="animation-delay: 0.1s;">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center font-bold text-2xl tracking-tighter bg-black shadow-lg">
            <span class="texto-oro">ph</span>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-light tracking-wide text-white">Dirección <span class="font-semibold texto-oro">General</span></h1>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-slate-400 tracking-widest uppercase">Planet Hollywood Cancun</span>
              <span class="w-1 h-1 rounded-full bg-slate-600"></span>
              <span class="text-xs text-emerald-400 font-mono" id="fecha-ejecutiva">Cargando...</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="alert('Generando Reporte PDF...')" class="glass-premium px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase hover:bg-white/10 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Exportar
          </button>
          <div class="w-10 h-10 rounded-full bg-slate-800 border border-white/10 overflow-hidden cursor-pointer hover:border-amber-500/50 transition-colors">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" class="w-full h-full object-cover" alt="Director General">
          </div>
        </div>
      </header>

      <!-- Fila 1: KPIs Principales (Tarjetas de Cristal) -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <!-- KPI 1 -->
        <div class="glass-premium rounded-3xl p-6 flex flex-col anim-fade-up" style="animation-delay: 0.2s;">
          <span class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Ocupación Global</span>
          <div class="flex items-end justify-between mt-auto">
            <span class="text-4xl font-light text-white tracking-tight" id="kpi-ocupacion">--</span>
            <span class="text-xs font-medium px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 mb-1" id="kpi-ocupacion-tendencia">--</span>
          </div>
        </div>

        <!-- KPI 2 -->
        <div class="glass-premium rounded-3xl p-6 flex flex-col anim-fade-up" style="animation-delay: 0.3s;">
          <span class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">NPS (Satisfacción)</span>
          <div class="flex items-end justify-between mt-auto">
            <span class="text-4xl font-light text-white tracking-tight" id="kpi-nps">--</span>
            <span class="text-xs font-medium px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 mb-1" id="kpi-nps-tendencia">--</span>
          </div>
        </div>

        <!-- KPI 3 -->
        <div class="glass-premium rounded-3xl p-6 flex flex-col anim-fade-up" style="animation-delay: 0.4s;">
          <span class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Ingresos (RevPAR)</span>
          <div class="flex items-end justify-between mt-auto">
            <span class="text-4xl font-light text-white tracking-tight" id="kpi-ingresos">--</span>
            <span class="text-xs font-medium px-2 py-1 rounded-md bg-slate-500/20 text-slate-300 mb-1" id="kpi-ingresos-tendencia">--</span>
          </div>
        </div>

        <!-- KPI 4 -->
        <div class="glass-premium rounded-3xl p-6 flex flex-col anim-fade-up" style="animation-delay: 0.5s;">
          <span class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">Incidencias Críticas</span>
          <div class="flex items-end justify-between mt-auto">
            <span class="text-4xl font-light text-white tracking-tight" id="kpi-incidencias">--</span>
            <span class="text-xs font-medium px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 mb-1" id="kpi-incidencias-tendencia">--</span>
          </div>
        </div>

      </section>

      <!-- Fila 2: Aura Insights y Salud Departamental -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- Insights Ejecutivos de IA -->
        <div class="lg:col-span-2 glass-premium rounded-3xl p-6 lg:p-8 flex flex-col anim-fade-up shadow-[0_0_40px_rgba(191,149,63,0.05)]" style="animation-delay: 0.6s;">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 p-[1px]">
              <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
                <span class="text-[10px] font-bold texto-oro">IA</span>
              </div>
            </div>
            <h2 class="text-sm font-semibold tracking-widest uppercase text-slate-300">Aura Insights <span class="text-[9px] text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded-full ml-2">En vivo</span></h2>
          </div>
          
          <div class="flex-1 text-sm md:text-base font-light text-slate-300 leading-relaxed space-y-4">
            <p><strong class="text-white font-medium">Resumen Operativo:</strong> La ocupación alcanzó el 94.2% esta mañana. El departamento de Mantenimiento resolvió el 90% de los tickets antes del SLA de 30 minutos. El restaurante Guy Fieri presenta una sobredemanda proyectada para la cena.</p>
            <p><strong class="text-white font-medium">Recomendación Estratégica:</strong> Sugiero liberar 2 técnicos de prevención para apoyar áreas públicas en el bloque 3 debido a la alta afluencia de check-ins programados entre las 15:00 y 17:00 hrs.</p>
          </div>

          <div class="mt-6 pt-5 border-t border-white/10 flex gap-3">
            <input type="text" placeholder="Pregunta a Aura sobre finanzas, operaciones o métricas..." class="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50 text-white placeholder-slate-500">
            <button onclick="alert('Analizando consulta directiva...')" class="bg-amber-600 hover:bg-amber-500 text-white px-6 rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_rgba(217,119,6,0.4)]">Consultar</button>
          </div>
        </div>

        <!-- Salud Departamental -->
        <div class="glass-premium rounded-3xl p-6 flex flex-col anim-fade-up" style="animation-delay: 0.7s;">
          <h2 class="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-6">Termómetro Operativo</h2>
          
          <div id="lista-departamentos" class="space-y-5 flex-1">
            <!-- Renderizado por JS -->
          </div>

          <button onclick="alert('Abriendo vista detallada de departamentos')" class="w-full mt-6 py-3 rounded-xl border border-white/10 text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors">
            Ver Detalles Completo
          </button>
        </div>

      </section>

    </div>
  `,
  iniciar: async () => {
    // 1. Poner la fecha actual
    const fechaEl = document.getElementById('fecha-ejecutiva');
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    fechaEl.innerText = new Date().toLocaleDateString('es-MX', opciones).toUpperCase();

    // 2. Cargar KPIs
    const kpis = await metricasServicio.obtenerKPIs();
    document.getElementById('kpi-ocupacion').innerText = kpis.ocupacion.valor;
    document.getElementById('kpi-ocupacion-tendencia').innerText = kpis.ocupacion.tendencia;
    
    document.getElementById('kpi-nps').innerText = kpis.nps.valor;
    document.getElementById('kpi-nps-tendencia').innerText = kpis.nps.tendencia;
    
    document.getElementById('kpi-ingresos').innerText = kpis.ingresos.valor;
    document.getElementById('kpi-ingresos-tendencia').innerText = kpis.ingresos.tendencia;
    
    document.getElementById('kpi-incidencias').innerText = kpis.incidencias.valor;
    document.getElementById('kpi-incidencias-tendencia').innerText = kpis.incidencias.tendencia;

    // 3. Cargar Termómetro de Departamentos
    const depts = metricasServicio.obtenerSaludDepartamentos();
    const contenedorDepts = document.getElementById('lista-departamentos');
    
    contenedorDepts.innerHTML = depts.map(d => `
      <div>
        <div class="flex justify-between items-end mb-2">
          <span class="text-sm font-medium text-white">${d.nombre}</span>
          <span class="text-[10px] text-${d.color}-400 font-bold uppercase">${d.status}</span>
        </div>
        <div class="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
          <div class="h-full bg-${d.color}-500 rounded-full" style="width: ${d.score}%"></div>
        </div>
      </div>
    `).join('');
  }
};
