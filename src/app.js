import InicioTurnoView from './vistas/InicioTurnoView.js';
import MenuOficioView from './vistas/MenuOficioView.js';
import TraductorView from './vistas/TraductorView.js'; // Importamos la nueva vista
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

// --- NUEVAS FUNCIONES DE NAVEGACIÓN PARA EL TRADUCTOR ---

window.abrirVistaTraductor = async () => {
  const contenedor = document.getElementById('mobile-container');
  // Cargamos el HTML de la vista del traductor
  contenedor.innerHTML = TraductorView.html();
  // Inicializamos su lógica (micrófono, animaciones, etc.)
  if (TraductorView.iniciar) await TraductorView.iniciar();
};

window.cerrarTraductor = () => {
  // Al cerrar el traductor, llamamos al enrutador para que nos regrese al menú del oficio
  enrutador();
};