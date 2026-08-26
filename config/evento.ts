export const evento = {
  nombre: "Zoé",
  nombreCompleto: "Zoé",

  fecha: {
    iso: "2026-11-20T19:00:00",
    texto: "20 de noviembre de 2026",
    dia: "20",
    mes: "noviembre",
    anio: "2026",
  },

  rsvp: {
    fechaLimite: "06 de noviembre de 2026",
  },

  lugar: {
    nombre: "Salón Palladium",
    direccion:
      "Blvd. Lázaro Cárdenas 1085, Las Flores, 21330 Mexicali, B.C.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n%20Palladium%20Blvd.%20L%C3%A1zaro%20C%C3%A1rdenas%201085%20Mexicali",
  },

  familia: {
    padres: [
      "María Elena Ruiz Paredes",
      "Salomón Cárdenas Fierro",
    ],

    padrinos: [
      "Rocío Ruiz Paredes",
      "Lennin Hansmann Vasquez",
    ],
  },

  hashtag: "",

  textos: {
    tituloAdmin: "XV Zoé",
    mensajeWhatsApp:
      "Con mucha ilusión te compartimos la invitación a los XV años de Zoé.",
  },
} as const;