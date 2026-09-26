export default {
  html: () => `
    <style>
      /* Fondo dinámico simulando el ambiente de la piscina/noche */
      @keyframes fluidColors {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .bg-ambient {
        background: linear-gradient(-45deg, #0a0e17, #1a1025, #0d1b2a, #000000);
        background-size: 400% 400%;
        animation: fluidColors 20s ease infinite;
        transform: translateZ(0);
      }
      
      /* Efecto Cristal (Glassmorphism) */
      .glass-panel {
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255, 255, 255, 0.05);
      }

      /* Botones del menú interactivo */
      .menu-btn {
        background: rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.15);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .menu-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
        transform: translateX(8px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      /* Texto Neón */
      .neon-text {
        color: #ff6b6b;
        text-shadow: 0 0 5px #ff6b6b, 0 0 15px #ff2a2a;
        font-family: 'Brush Script MT', cursive;
      }
      
      /* Animación del micrófono flotante */
      @keyframes pulse-ring {
        0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(168, 85, 247, 0); }
        100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
      }
      .mic-pulse {
        animation: pulse-ring 2.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    </style>

    <!-- CAPA 1: Fondo General -->
    <div class="fixed inset-0 w-full h-full bg-ambient flex z-0">
      
      <!-- CAPA 2: Imagen de Fondo Simulada (Asistente y Piscina) -->
      <div class="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen" style="background-image: url('https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2000&auto=format&fit=crop');"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

      <!-- BARRA LATERAL IZQUIERDA (Navegación) -->
      <div class="w-20 md:w-24 h-full glass-panel flex flex-col items-center py-8 z-10 shrink-0 shadow-2xl">
        <div class="space-y-10 flex flex-col items-center text-white/50">
          <button class="hover:text-white transition flex flex-col items-center gap-1 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span class="text-[10px]">Inicio</span>
          </button>
          <button class="hover:text-white transition flex flex-col items-center gap-1 group text-white">
            <svg class="w-6 h-6 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            <span class="text-[10px]">Servicios</span>
          </button>
          <button class="hover:text-white transition flex flex-col items-center gap-1 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-[10px]">Entretenimiento</span>
          </button>
          <button class="hover:text-white transition flex flex-col items-center gap-1 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            <span class="text-[10px]">Restaurantes</span>
          </button>
          <button class="hover:text-white transition flex flex-col items-center gap-1 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9zM13 3.512V9H7.512A9.025 9.025 0 0113 3.512zM7.512 11H13v5.488A9.025 9.025 0 017.512 11zM15 11h5.488A9.025 9.025 0 0115 16.488V11z"></path></svg>
            <span class="text-[10px]">Spa</span>
          </button>
          <button class="hover:text-white transition flex flex-col items-center gap-1 group">
            <svg class="w-6 h-6 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-[10px]">Información</span>
          </button>
        </div>
      </div>

      <!-- CONTENIDO PRINCIPAL -->
      <div class="flex-1 flex flex-col relative z-10 p-8 md:p-12 overflow-hidden">
        
        <!-- Encabezado: Logo y Clima/Reloj -->
        <header class="flex justify-between items-start w-full">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-xl bg-black/40 backdrop-blur-sm">ph</div>
            <div>
              <h1 class="text-2xl font-bold tracking-tight leading-none">planet hollywood</h1>
              <p class="text-sm font-light tracking-[0.2em] text-white/80">CANCUN</p>
            </div>
          </div>
          
          <div class="flex items-center gap-6 text-right">
            <div class="flex items-center gap-2">
              <svg class="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <div class="text-left">
                <p class="text-xl font-bold leading-none">28°C</p>
                <p class="text-xs font-light text-white/70">Cancún</p>
              </div>
            </div>
            <div class="w-px h-8 bg-white/20"></div>
            <div class="text-right">
              <p id="live-time" class="text-xl font-bold leading-none">5:42 PM</p>
              <p id="live-date" class="text-xs font-light text-white/70">Sáb, 26 Abr</p>
            </div>
          </div>
        </header>

        <!-- Cuerpo Central -->
        <main class="flex-1 flex mt-12 relative w-full">
          
          <!-- Columna Izquierda: Saludo y Menú -->
          <div class="w-full max-w-lg flex flex-col justify-center">
            <div class="mb-10">
              <h2 class="text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-purple-200">¡Hola!</h2>
              <h3 class="text-2xl font-medium mb-4 text-white/90">Soy Luna, tu asistente personal.</h3>
              <p class="text-white/70 text-lg leading-relaxed font-light">
                Estoy aquí para hacer que tu estancia sea inolvidable. ¿En qué puedo ayudarte hoy?
              </p>
            </div>

            <!-- Botones de Acción -->
            <div class="flex flex-col gap-3 w-full max-w-md">
              <button class="menu-btn rounded-full px-6 py-4 flex items-center gap-4 text-left w-full group">
                <div class="text-pink-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg></div>
                <span class="font-medium text-[15px]">Reservar Restaurante</span>
              </button>
              
              <button class="menu-btn rounded-full px-6 py-4 flex items-center gap-4 text-left w-full">
                <div class="text-blue-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>
                <span class="font-medium text-[15px]">Room Service</span>
              </button>

              <button class="menu-btn rounded-full px-6 py-4 flex items-center gap-4 text-left w-full">
                <div class="text-purple-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg></div>
                <span class="font-medium text-[15px]">Actividades y Entretenimiento</span>
              </button>

              <button class="menu-btn rounded-full px-6 py-4 flex items-center gap-4 text-left w-full">
                <div class="text-teal-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg></div>
                <span class="font-medium text-[15px]">Spa & Wellness</span>
              </button>

              <button class="menu-btn rounded-full px-6 py-4 flex items-center gap-4 text-left w-full">
                <div class="text-yellow-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                <span class="font-medium text-[15px]">Información del Hotel</span>
              </button>

              <button id="btn-hablar" class="menu-btn rounded-full px-6 py-4 flex items-center gap-4 text-left w-full border-pink-500/50 bg-gradient-to-r from-pink-500/20 to-transparent">
                <div class="text-pink-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg></div>
                <span class="font-medium text-[15px]">Hablar con Luna</span>
              </button>
            </div>
            
            <!-- Firma Inferior -->
            <div class="mt-10 ml-4">
              <p class="neon-text text-3xl transform -rotate-6">Good Vibes</p>
              <p class="neon-text text-3xl transform -rotate-6 ml-8">Only ♡</p>
            </div>
          </div>

          <!-- Columna Derecha: Elementos Flotantes de Luna -->
          <div class="flex-1 relative flex flex-col items-end justify-between pb-8">
            <div class="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-[200px] text-right shadow-2xl mt-12">
              <p class="text-white/80 font-light text-sm italic">"Más que una estancia... una experiencia Hollywood."</p>
            </div>
            
            <div class="flex flex-col items-center gap-3">
              <button class="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl mic-pulse hover:scale-105 transition-transform border-2 border-white/20">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </button>
              <span class="text-white/80 text-sm font-medium tracking-wide">Toca para hablar con Luna</span>
            </div>
          </div>

        </main>
      </div>
    </div>
  `,
  init: async () => {
    // Lógica para actualizar el reloj en tiempo real
    const updateTime = () => {
      const now = new Date();
      
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      minutes = minutes < 10 ? '0' + minutes : minutes;
      
      const timeString = `${hours}:${minutes} ${ampm}`;
      
      const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const dateString = `${dias[now.getDay()]}, ${now.getDate()} ${meses[now.getMonth()]}`;

      const timeEl = document.getElementById('live-time');
      const dateEl = document.getElementById('live-date');
      
      if(timeEl) timeEl.textContent = timeString;
      if(dateEl) dateEl.textContent = dateString;
    };

    updateTime();
    setInterval(updateTime, 60000);

    // Animación de interacción para los botones
    const btnHablar = document.getElementById('btn-hablar');
    if(btnHablar) {
      btnHablar.addEventListener('click', () => {
        // Aquí podrías desencadenar la apertura del chat modal o interfaz de voz
        btnHablar.innerHTML = `
          <div class="text-pink-500 animate-spin"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>
          <span class="font-medium text-[15px]">Conectando...</span>
        `;
        setTimeout(() => {
          alert('Interfaz de voz de Luna inicializada.');
          // Restaurar botón
          btnHablar.innerHTML = `
            <div class="text-pink-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg></div>
            <span class="font-medium text-[15px]">Hablar con Luna</span>
          `;
        }, 1500);
      });
    }
  }
};