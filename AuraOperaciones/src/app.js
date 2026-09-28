import InicioTurnoView from './vistas/InicioTurnoView.js';
import MenuOficioView from './vistas/MenuOficioView.js';
import { sesionTrabajadorServicio } from './servicios/sesionTrabajadorServicio.js';

const enrutador = async () => {
  const contenedor = document.getElementById('mobile-container');
  const trabajador = sesionTrabajadorServicio.obtenerTrabajador();

  contenedor.innerHTML = ''; 

  if (trabajador && trabajador.subArea) {
    contenedor.innerHTML = MenuOficioView.html(trabajador);
    if (MenuOficioView.iniciar) await MenuOficioView.iniciar(trabajador);
  } else {
    contenedor.innerHTML = InicioTurnoView.html();
    if (InicioTurnoView.iniciar) await InicioTurnoView.iniciar();
  }
};

window.addEventListener('DOMContentLoaded', enrutador);
window.cerrarSesion = () => {
  sesionTrabajadorServicio.limpiarTrabajador();
  enrutador();
};
window.iniciarSesion = (dept, subArea) => {
  sesionTrabajadorServicio.guardarTrabajador({ departamento: dept, subArea: subArea, nombre: 'Colaborador VIP' });
  enrutador();
};
