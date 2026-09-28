export const metricasServicio = {
  obtenerKPIs: async () => {
    // Simula la llamada a tu backend Aura para traer datos en vivo
    return {
      ocupacion: { valor: '94.2%', tendencia: '+2.1%', estado: 'positivo' },
      nps: { valor: '88', tendencia: '+5 pts', estado: 'positivo' },
      ingresos: { valor: '$142K', tendencia: '-1.2%', estado: 'neutral' },
      incidencias: { valor: '12', tendencia: '-8 hoy', estado: 'positivo' }
    };
  },
  obtenerSaludDepartamentos: () => {
    return [
      { nombre: 'Mantenimiento', score: 92, status: 'Óptimo', color: 'emerald' },
      { nombre: 'Alimentos y Bebidas', score: 85, status: 'Estable', color: 'blue' },
      { nombre: 'Áreas Públicas', score: 74, status: 'Atención', color: 'amber' },
      { nombre: 'Recepción / Front', score: 96, status: 'Excelente', color: 'emerald' }
    ];
  }
};
