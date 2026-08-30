export const mockSituations = [
  {
    id: 1,
    title: 'Llegada tarde a clase',
    description: 'Necesitas explicar por qué llegaste después de que el profesor cerró la puerta.',
    createdAt: '2026-08-20T08:00:00.000Z',
    alibis: [
      {
        id: 1,
        title: 'Falla inesperada del metro',
        story: 'El metro se detuvo entre estaciones y los pasajeros tuvimos que esperar instrucciones durante veinte minutos.',
        credibilityIndex: 4.4,
      },
      {
        id: 2,
        title: 'Ayuda a un estudiante nuevo',
        story: 'Un estudiante nuevo no encontraba el bloque y lo acompañé hasta la oficina de información antes de ir a clase.',
        credibilityIndex: 3.8,
      },
      {
        id: 3,
        title: 'Cambio de salón sin aviso',
        story: 'Fui primero al salón publicado en el horario y allí me informaron que la clase había cambiado de bloque.',
        credibilityIndex: 4.7,
      },
    ],
  },
  {
    id: 2,
    title: 'Entrega tardía de un trabajo',
    description: 'El plazo terminó anoche y necesitas justificar por qué no pudiste subir el archivo.',
    createdAt: '2026-08-21T10:30:00.000Z',
    alibis: [
      {
        id: 4,
        title: 'Archivo dañado al exportar',
        story: 'El documento se dañó durante la exportación final y tuve que reconstruir las últimas páginas desde una copia anterior.',
        credibilityIndex: 4.1,
      },
      {
        id: 5,
        title: 'Interrupción del servicio de internet',
        story: 'El proveedor tuvo una falla en el sector y la conexión regresó después del cierre de la plataforma.',
        credibilityIndex: 3.9,
      },
      {
        id: 6,
        title: 'Plataforma académica bloqueada',
        story: 'La plataforma rechazó el archivo varias veces y guardé capturas con la hora de cada intento.',
        credibilityIndex: 4.8,
      },
    ],
  },
  {
    id: 3,
    title: 'Ausencia en una exposición',
    description: 'Tu grupo presentó el proyecto, pero tú no pudiste llegar a la exposición.',
    createdAt: '2026-08-22T14:15:00.000Z',
    alibis: [
      {
        id: 7,
        title: 'Cita médica reprogramada',
        story: 'La clínica adelantó una cita que llevaba varias semanas esperando y coincidió con la hora de la presentación.',
        credibilityIndex: 4.5,
      },
      {
        id: 8,
        title: 'Emergencia familiar menor',
        story: 'Tuve que acompañar a un familiar a una consulta inesperada y avisé al grupo antes de que comenzara la clase.',
        credibilityIndex: 4.0,
      },
      {
        id: 9,
        title: 'Confusión con el horario',
        story: 'La última versión del cronograma mostraba una hora diferente y preparé mi llegada con base en ese documento.',
        credibilityIndex: 3.2,
      },
    ],
  },
  {
    id: 4,
    title: 'Cámara apagada en clase virtual',
    description: 'El profesor exige mantener la cámara encendida durante toda la sesión.',
    createdAt: '2026-08-23T16:45:00.000Z',
    alibis: [
      {
        id: 10,
        title: 'Actualización obligatoria del controlador',
        story: 'La cámara dejó de ser reconocida después de una actualización y el sistema pidió reinstalar el controlador.',
        credibilityIndex: 4.3,
      },
      {
        id: 11,
        title: 'Conexión inestable',
        story: 'Activar el video desconectaba la llamada, así que mantuve el audio para no perder la explicación.',
        credibilityIndex: 4.6,
      },
      {
        id: 12,
        title: 'Préstamo temporal del computador',
        story: 'Tuve que conectarme desde un equipo prestado que no tenía cámara disponible.',
        credibilityIndex: 3.7,
      },
    ],
  },
  {
    id: 5,
    title: 'Salida anticipada del laboratorio',
    description: 'Necesitas explicar por qué abandonaste el laboratorio antes de finalizar la práctica.',
    createdAt: '2026-08-24T18:20:00.000Z',
    alibis: [
      {
        id: 13,
        title: 'Malestar repentino',
        story: 'Comencé a sentir mareo y preferí salir para evitar una emergencia dentro del laboratorio.',
        credibilityIndex: 4.2,
      },
      {
        id: 14,
        title: 'Llamada urgente de casa',
        story: 'Recibí una llamada familiar urgente y avisé a un compañero antes de retirarme.',
        credibilityIndex: 3.8,
      },
      {
        id: 15,
        title: 'Material equivocado',
        story: 'Llevé la guía correspondiente a otra práctica y salí a imprimir la versión correcta antes de que cerrara la papelería.',
        credibilityIndex: 3.5,
      },
    ],
  },
]
