export const conciergeIaServicio = {
  consultarLuna: async (texto) => {
    try {
      const controller = new AbortController();
      // 12 segundos de límite
      const idTimeout = setTimeout(() => controller.abort(), 12000);

      // Conexión real a tu backend
      const respuesta = await fetch('https://asistente-backend.auraradio-cloud.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: texto }),
        signal: controller.signal
      });

      clearTimeout(idTimeout);
      const datos = await respuesta.json();
      return datos.reply || "Disculpe, la señal con el núcleo de hospitalidad se interrumpió.";
    } catch (error) {
      return "Problema de conexión con la red Aura. Por favor, revise la conexión.";
    }
  }
};
