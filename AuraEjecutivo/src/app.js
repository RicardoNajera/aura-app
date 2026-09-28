import TableroEjecutivoView from './vistas/TableroEjecutivoView.js';

const iniciarApp = async () => {
  const contenedor = document.getElementById('app-root');
  contenedor.innerHTML = TableroEjecutivoView.html();
  if (TableroEjecutivoView.iniciar) await TableroEjecutivoView.iniciar();
};

window.addEventListener('DOMContentLoaded', iniciarApp);
