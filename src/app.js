import TraductorView from './vistas/TraductorView.js';

const enrutador = async () => {
  const contenedor = document.getElementById('mobile-container');
  if (!contenedor) return;

  contenedor.innerHTML = TraductorView.html();
  if (TraductorView.iniciar) {
    await TraductorView.iniciar();
  }
};

window.addEventListener('DOMContentLoaded', enrutador);

// Si TraductorView tiene un botón de "volver/cerrar", evita que intente regresar a vistas inexistentes
window.cerrarTraductor = () => {
  // Se mantiene en el traductor o reinicia la vista
  enrutador();
};