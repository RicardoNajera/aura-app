import LunaView from './vistas/LunaView.js';

const enrutador = async () => {
  const contenedor = document.getElementById('app-root');
  contenedor.innerHTML = LunaView.html();
  if (LunaView.iniciar) await LunaView.iniciar();
};

window.addEventListener('DOMContentLoaded', enrutador);
