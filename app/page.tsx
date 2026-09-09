"use client";

import { evento } from "@/config/evento";
import "@fontsource/great-vibes";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";
import "aos/dist/aos.css";

import AOS from "aos";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Howl } from "howler";
import { addDoc, collection } from "firebase/firestore";
import { obtenerInvitado } from "@/lib/firestoreRest";

import { db } from "@/lib/firebase";
import RSVPForm from "@/components/RSVPForm";
import ContadorElegante from "@/components/ContadorElegante";


export default function Page() {
  const [nombreInvitado, setNombreInvitado] = useState("Invitado especial");
const [pasesAsignados, setPasesAsignados] = useState(1);
const [codigoInvitado, setCodigoInvitado] = useState("");
  const [audio, setAudio] = useState<Howl | null>(null);
  const [sonando, setSonando] = useState(false);
  const [mensajeLibro, setMensajeLibro] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState("");

  const enviarMensajeLibro = async () => {
    if (!mensajeLibro.trim()) {
      setMensajeEnviado("Por favor escribe un mensaje antes de enviar.");
      return;
    }

    try {
      await addDoc(collection(db, "libroVisitas"), {
  codigo: codigoInvitado || "sin-codigo",
  nombre: nombreInvitado,
  mensaje: mensajeLibro.trim(),
  timestamp: new Date(),
});

      setMensajeEnviado("¡Gracias por tu mensaje!");
      setMensajeLibro("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setMensajeEnviado("Hubo un error al enviar tu mensaje. Intenta de nuevo.");
    }
  };

useEffect(() => {
  AOS.init({ duration: 1200, once: true });

  const cargarInvitado = async () => {
    const params = new URLSearchParams(window.location.search);
    const codigoUrl = params.get("codigo");

    if (!codigoUrl) {
      setNombreInvitado("Invitado especial");
      setPasesAsignados(1);
      setCodigoInvitado("");
      return;
    }

    try {
      setCodigoInvitado(codigoUrl);

     const invitado = await obtenerInvitado(codigoUrl);

console.log("Código recibido:", codigoUrl);
console.log("Datos invitado:", invitado);

if (invitado) {
  setNombreInvitado(invitado.nombre);
  setPasesAsignados(invitado.pases);
} else {
  setNombreInvitado("Invitado no encontrado");
  setPasesAsignados(1);
}
    } 



catch (error: any) {
  console.error("Error leyendo invitado:", error);

  setNombreInvitado(
    error?.code
      ? `Error: ${error.code}`
      : "Error al cargar invitado"
  );

  setPasesAsignados(1);
}

  };

  cargarInvitado();

  const musica = new Howl({
    src: ["/musica.mp3"],
    html5: true,
    volume: 0.4,
    loop: true,
  });

  setAudio(musica);

  return () => {
    musica.unload();
  };
}, []);
  const toggleMusica = () => {
    if (!audio) return;
    if (sonando) {
      audio.pause();
    } else {
      audio.play();
    }
    setSonando(!sonando);
  };

  const fotosGaleria = [
    "/images/galeria/foto1.jpg",
    "/images/galeria/foto2.jpg",
    "/images/galeria/foto3.jpg",
    "/images/galeria/foto4.jpg",
    "/images/galeria/foto5.jpg",
    "/images/galeria/foto6.jpg",
  ];

  return (
    <div
      className="relative text-[#241B18] text-lg md:text-xl font-medium scroll-smooth overflow-hidden min-h-screen bg-gradient-to-b from-[#F5E9D5] via-[#FBF4E8] to-[#E8D6BC]"
      style={{ fontFamily: "'Quicksand', sans-serif" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/images/flores-orilla.png"
          alt="Decoración floral"
          className="w-full h-full object-cover opacity-[0.07] grayscale"
        />
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <button
        className="fixed top-3 right-3 w-10 h-10 md:top-4 md:right-4 md:w-12 md:h-12 flex items-center justify-center bg-[#B08D57]/95 text-[#241B18] rounded-full border border-[#E7C77B]/60 shadow-lg z-50 hover:bg-[#6E171A] hover:text-white transition"
        onClick={toggleMusica}
        aria-label={sonando ? "Pausar música" : "Reproducir música"}
        title={sonando ? "Pausar música" : "Reproducir música"}
      >
        <span className="text-sm md:text-base">{sonando ? "Ⅱ" : "▶"}</span>
      </button>

   <section className="relative w-full bg-[#14090A] overflow-hidden">
  <img
    src="/images/portada-zoe.png"
    alt="Invitación de XV años de Zoé"
    className="block w-full h-auto md:w-auto md:h-screen md:max-w-full md:mx-auto object-contain"
  />
</section>

<section
  className="relative overflow-hidden my-16 mx-4 md:mx-16 text-center"
  data-aos="zoom-in"
>
  <div
    className="
      relative
      max-w-4xl
      mx-auto
      bg-[#F6E8D1]/95
      border
      border-[#A98342]/50
      shadow-2xl
      px-7
      py-16
      md:px-14
      md:py-20
    "
  >
    {/* Marco interior */}
    <div className="absolute inset-3 border border-[#A98342]/25 pointer-events-none" />

    {/* Ornamento superior */}
    <div className="relative z-10 flex items-center justify-center gap-4 mb-10">
      <span className="h-px w-16 md:w-28 bg-[#9A7437]/60" />
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="text-[#6E171A] text-lg">✦</span>
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="h-px w-16 md:w-28 bg-[#9A7437]/60" />
    </div>

    {/* Texto principal */}
    <p
      className="
        relative
        z-10
        text-4xl
        sm:text-5xl
        md:text-7xl
        text-[#6E171A]
        leading-tight
      "
      style={{ fontFamily: "'Great Vibes', cursive" }}
    >
      Una noche detrás de la máscara,
      <br />
      un recuerdo para toda la vida.
    </p>

    {/* Texto secundario */}
    <p
      className="
        relative
        z-10
        mt-8
        text-lg
        md:text-2xl
        text-[#493B34]
        leading-relaxed
        max-w-2xl
        mx-auto
      "
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      Hay momentos que se convierten en recuerdos para siempre.
      <br className="hidden md:block" />
      Gracias por formar parte de uno de los más especiales de mi vida.
    </p>

    {/* Detalle */}
    <div
      className="
        relative
        z-10
        mt-10
        uppercase
        tracking-[0.28em]
        text-sm
        md:text-base
        text-[#9A7437]
        font-semibold
      "
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      XV años · Elegancia · Misterio · Celebración
    </div>

    {/* Ornamento inferior */}
    <div className="relative z-10 flex items-center justify-center gap-4 mt-10">
      <span className="h-px w-16 md:w-28 bg-[#9A7437]/60" />
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="text-[#6E171A] text-lg">✦</span>
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="h-px w-16 md:w-28 bg-[#9A7437]/60" />
    </div>

    {/* Decoraciones de esquina */}
    <div className="absolute top-5 left-6 text-[#9A7437]/50 text-4xl">❧</div>
    <div className="absolute top-5 right-6 text-[#9A7437]/50 text-4xl scale-x-[-1]">❧</div>
    <div className="absolute bottom-5 left-6 text-[#9A7437]/50 text-4xl rotate-180">❧</div>
    <div className="absolute bottom-5 right-6 text-[#9A7437]/50 text-4xl rotate-180 scale-x-[-1]">❧</div>
  </div>
</section>
<section
  className="relative py-20 md:py-24 px-4 md:px-6 text-center z-10 overflow-hidden"
  data-aos="fade-up"
>
  <div className="relative max-w-4xl mx-auto bg-[#F6E8D1]/95 border border-[#A98342]/50 shadow-2xl px-6 py-14 md:px-14 md:py-16">
    {/* Marco interior */}
    <div className="absolute inset-3 border border-[#A98342]/25 pointer-events-none" />

    {/* Esquinas */}
    <div className="absolute top-5 left-6 text-[#9A7437]/45 text-4xl">❧</div>
    <div className="absolute top-5 right-6 text-[#9A7437]/45 text-4xl scale-x-[-1]">❧</div>
    <div className="absolute bottom-5 left-6 text-[#9A7437]/45 text-4xl rotate-180">❧</div>
    <div className="absolute bottom-5 right-6 text-[#9A7437]/45 text-4xl rotate-180 scale-x-[-1]">❧</div>

    <div className="relative z-10">
      {/* Ornamento */}
      <div className="flex items-center justify-center gap-4 mb-7">
        <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
        <span className="text-[#9A7437] text-2xl">❦</span>
        <span className="text-[#6E171A] text-lg">✦</span>
        <span className="text-[#9A7437] text-2xl">❦</span>
        <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
      </div>

      <p
        className="uppercase tracking-[0.38em] text-[#9A7437] text-xs md:text-sm font-semibold mb-7"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Reserva la fecha
      </p>

      {/* Fecha */}
      <div className="flex flex-col items-center">
        <span
          className="text-[64px] sm:text-[76px] md:text-[108px] leading-[0.82] text-[#6E171A] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {evento.fecha.dia}
        </span>

        <span
          className="mt-4 text-4xl sm:text-5xl md:text-6xl text-[#6E171A] capitalize"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          de {evento.fecha.mes}
        </span>

        <div className="flex items-center justify-center gap-4 my-5">
          <span className="h-px w-12 md:w-20 bg-[#9A7437]/55" />
          <span className="text-[#9A7437] text-base">✦</span>
          <span className="h-px w-12 md:w-20 bg-[#9A7437]/55" />
        </div>

        <span
          className="text-3xl md:text-4xl tracking-[0.28em] text-[#9A7437] font-semibold"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {evento.fecha.anio}
        </span>
      </div>

      <p
        className="mt-9 text-3xl sm:text-4xl md:text-6xl text-[#6E171A] leading-tight"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        Una noche de máscaras, elegancia
        <br className="hidden md:block" />
        y recuerdos para siempre
      </p>

      {/* Separador antes del contador */}
      <div className="flex items-center justify-center gap-4 mt-10 mb-4">
        <span className="h-px w-14 md:w-28 bg-[#9A7437]/45" />
        <span className="text-[#9A7437] text-xl">❦</span>
        <span className="h-px w-14 md:w-28 bg-[#9A7437]/45" />
      </div>

      <ContadorElegante />

      <div className="flex items-center justify-center gap-4 mt-9">
        <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
        <span className="text-[#9A7437] text-xl">❦</span>
        <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
      </div>
    </div>
  </div>
</section>

<section
  className="relative py-24 px-6 bg-gradient-to-b from-[#16090A] via-[#3A0F12] to-[#16090A] text-[#F8EBD3] text-center overflow-hidden z-10"
  data-aos="fade-up"
>
  {/* Resplandor central */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.12),transparent_60%)] pointer-events-none" />

  {/* Marco exterior */}
  <div className="absolute inset-5 md:inset-10 border border-[#B08D57]/35 pointer-events-none" />

  {/* Esquinas decorativas */}
  <div className="absolute top-6 left-5 md:top-8 md:left-8 text-[#B08D57]/40 text-3xl md:text-5xl">❦</div>
  <div className="absolute top-6 right-5 md:top-8 md:right-8 text-[#B08D57]/40 text-3xl md:text-5xl scale-x-[-1]">❦</div>
  <div className="absolute bottom-6 left-5 md:bottom-8 md:left-8 text-[#B08D57]/40 text-3xl md:text-5xl rotate-180">❦</div>
  <div className="absolute bottom-6 right-5 md:bottom-8 md:right-8 text-[#B08D57]/40 text-3xl md:text-5xl rotate-180 scale-x-[-1]">❦</div>

  <div className="relative z-10 max-w-4xl mx-auto">

    {/* Ornamento superior */}
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className="h-px w-14 md:w-24 bg-[#B08D57]/60" />
      <span className="text-[#D8B76D] text-2xl">❦</span>
      <span className="text-[#8A1F24] text-lg">✦</span>
      <span className="text-[#D8B76D] text-2xl">❦</span>
      <span className="h-px w-14 md:w-24 bg-[#B08D57]/60" />
    </div>

    {/* Título */}
    <h2
      className="text-5xl md:text-7xl font-normal text-[#E7C77B] mb-5"
      style={{ fontFamily: "'Great Vibes', cursive" }}
    >
      Con mucho amor me acompañan
    </h2>

    <p
      className="text-lg md:text-2xl text-[#E8D9C4] max-w-2xl mx-auto mb-14 leading-relaxed"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      Quienes han llenado mi vida de amor, guía y recuerdos,
      hoy están conmigo en esta noche tan especial.
    </p>

    <div className="grid md:grid-cols-2 gap-10 md:gap-14">

      {/* Padres */}
      <div
        className="relative bg-black/20 border border-[#B08D57]/30 px-6 py-10 shadow-xl"
        data-aos="fade-right"
      >
        <div className="absolute inset-2 border border-[#B08D57]/15 pointer-events-none" />

        <p
          className="relative z-10 uppercase tracking-[0.28em] text-[#D8B76D] text-sm md:text-base font-semibold mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Mis Padres
        </p>

        <div className="relative z-10 flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-[#B08D57]/60" />
          <span className="text-[#B08D57]">✦</span>
          <span className="h-px w-12 bg-[#B08D57]/60" />
        </div>

        <div
          className="relative z-10 space-y-3 text-xl md:text-2xl text-[#FFF4E3]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {evento.familia.padres.map((nombre) => (
            <p key={nombre}>{nombre}</p>
          ))}
        </div>
      </div>

      {/* Padrinos */}
      <div
        className="relative bg-black/20 border border-[#B08D57]/30 px-6 py-10 shadow-xl"
        data-aos="fade-left"
      >
        <div className="absolute inset-2 border border-[#B08D57]/15 pointer-events-none" />

        <p
          className="relative z-10 uppercase tracking-[0.28em] text-[#D8B76D] text-sm md:text-base font-semibold mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Mis Padrinos
        </p>

        <div className="relative z-10 flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-[#B08D57]/60" />
          <span className="text-[#B08D57]">✦</span>
          <span className="h-px w-12 bg-[#B08D57]/60" />
        </div>

        <div
          className="relative z-10 space-y-3 text-xl md:text-2xl text-[#FFF4E3]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {evento.familia.padrinos.map((nombre) => (
            <p key={nombre}>{nombre}</p>
          ))}
        </div>
      </div>

    </div>

    {/* Mensaje final */}
    <p
      className="mt-14 text-4xl md:text-6xl text-[#E7C77B] leading-tight"
      style={{ fontFamily: "'Great Vibes', cursive" }}
      data-aos="fade-up"
    >
      Gracias por ser parte de mi historia
      <br />
      y acompañarme en esta noche inolvidable.
    </p>

    {/* Ornamento inferior */}
    <div className="flex items-center justify-center gap-4 mt-10">
      <span className="h-px w-14 md:w-24 bg-[#B08D57]/60" />
      <span className="text-[#D8B76D] text-2xl">❦</span>
      <span className="text-[#8A1F24] text-lg">✦</span>
      <span className="text-[#D8B76D] text-2xl">❦</span>
      <span className="h-px w-14 md:w-24 bg-[#B08D57]/60" />
    </div>

  </div>
</section>

   <section
  className="relative py-20 md:py-24 px-4 md:px-6 text-center z-10 overflow-hidden"
  data-aos="fade-up"
>
  <div className="max-w-5xl mx-auto">

    {/* Encabezado */}
    <div className="flex items-center justify-center gap-4 mb-5">
      <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="text-[#6E171A] text-lg">✦</span>
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
    </div>

    <h2
      className="text-5xl sm:text-6xl md:text-7xl text-[#6E171A] mb-4 font-normal"
      style={{ fontFamily: "'Great Vibes', cursive" }}
    >
      Detalles del Evento
    </h2>

    <p
      className="text-lg md:text-2xl text-[#493B34] max-w-2xl mx-auto mb-14"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      Todo está preparado para compartir una noche inolvidable.
    </p>

    {/* Tarjeta principal */}
    <div className="relative bg-[#FBF3E4]/95 border border-[#A98342]/45 shadow-2xl px-6 py-12 md:px-12">

      <div className="absolute inset-3 border border-[#A98342]/20 pointer-events-none" />

      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

        {/* Información */}
        <div className="space-y-10 text-center md:text-left">

          {/* Fecha */}
          <div>
            <p
              className="uppercase tracking-[0.25em] text-[#9A7437] text-sm font-semibold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Fecha y hora
            </p>

            <p
              className="text-3xl md:text-4xl text-[#6E171A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {evento.fecha.texto}
            </p>

            <p
              className="text-xl md:text-2xl text-[#493B34]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              7:00 pm
            </p>
          </div>

          {/* Lugar */}
          <div>
            <p
              className="uppercase tracking-[0.25em] text-[#9A7437] text-sm font-semibold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Lugar
            </p>

            <p
              className="text-3xl md:text-4xl text-[#6E171A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {evento.lugar.nombre}
            </p>

            <p
              className="mt-2 text-lg md:text-xl text-[#493B34]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {evento.lugar.direccion}
            </p>

            <a
              href={evento.lugar.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 px-7 py-3 border border-[#9A7437] bg-[#6E171A] text-[#FFF4E3] uppercase tracking-[0.16em] text-sm font-semibold hover:bg-[#9A7437] transition"
            >
              Ver ubicación
            </a>
          </div>

          {/* Vestimenta */}
          <div>
            <p
              className="uppercase tracking-[0.25em] text-[#9A7437] text-sm font-semibold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Código de vestimenta
            </p>

            <p
              className="text-3xl text-[#6E171A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Formal
            </p>
          </div>

          {/* Obsequios */}
          <div>
            <p
              className="uppercase tracking-[0.25em] text-[#9A7437] text-sm font-semibold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Obsequios
            </p>

            <p
              className="text-3xl text-[#6E171A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Lluvia de sobres
            </p>
          </div>

        </div>

        {/* Fotografía del salón */}
        <div className="relative">
          <div className="absolute -inset-3 border border-[#A98342]/35" />

          <img
            src="/images/jardin-miniatura.jpg"
            alt={evento.lugar.nombre}
            className="relative w-full max-w-md mx-auto aspect-[4/3] object-cover shadow-xl"
          />

          <div
            className="mt-6 text-[#9A7437] text-xl tracking-[0.4em]"
          >
            ❦ ✦ ❦
          </div>
        </div>

      </div>
    </div>

    {/* Ornamento inferior */}
    <div className="flex items-center justify-center gap-4 mt-12">
      <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="text-[#6E171A] text-lg">✦</span>
      <span className="text-[#9A7437] text-2xl">❦</span>
      <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
    </div>

  </div>
</section>


<section
  className="relative pt-4 md:pt-6 pb-2 px-4 md:px-6 z-10 overflow-hidden"
  data-aos="fade-up"
>
  <div className="max-w-4xl mx-auto text-center">
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute inset-3 border border-[#A98342]/15 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.08),transparent_68%)] pointer-events-none" />
      <img
        src="/images/zoe-itinerario.png"
        alt="Ilustración victoriana de Zoé con antifaz"
        className="relative z-10 block w-full h-auto object-contain"
      />
    </div>
  </div>
</section>

<section
  className="relative pt-8 md:pt-10 pb-24 px-5 md:px-6 z-10 overflow-hidden"
  data-aos="fade-up"
>
  <div className="max-w-5xl mx-auto text-center">

    <p
      className="uppercase tracking-[0.3em] text-[#9A7437] text-sm md:text-base font-semibold mb-3"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      Una noche para recordar
    </p>

    <h2
      className="text-6xl md:text-8xl text-[#6E171A] mb-5 font-normal"
      style={{ fontFamily: "'Great Vibes', cursive" }}
    >
      Itinerario
    </h2>

    <p
      className="text-[#493B34] text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      Momentos especiales preparados con mucho cariño para disfrutar juntos
      esta noche inolvidable.
    </p>

    <div className="relative max-w-4xl mx-auto bg-[#F6E8D1]/92 border border-[#A98342]/45 shadow-2xl px-5 py-10 md:px-10 md:py-12">
      <div className="absolute inset-3 border border-[#A98342]/20 pointer-events-none" />

      <div className="relative z-10">
        {/* Línea central */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#9A7437]/10 via-[#9A7437]/65 to-[#9A7437]/10 md:-translate-x-1/2" />

        {[
          {
            hora: "7:00 pm",
            titulo: "Recepción",
            detalle: "Bienvenida a nuestros invitados",
          },
          {
            hora: "7:45 pm",
            titulo: "Vals",
            detalle: "Un momento especial para celebrar mis XV años",
          },
          {
            hora: "8:15 pm",
            titulo: "Brindis",
            detalle: "Celebremos juntos esta noche inolvidable",
          },
          {
            hora: "8:30 pm",
            titulo: "Cena",
            detalle: "Compartamos una deliciosa cena en familia y amigos",
          },
          {
            hora: "9:00 pm",
            titulo: "Fotos",
            detalle: "Un momento para guardar recuerdos de esta noche",
          },
          {
            hora: "Después",
            titulo: "¡Fiesta!",
            detalle: "A bailar y disfrutar juntos",
          },
        ].map((item, index) => (
          <div
            key={`${item.hora}-${item.titulo}`}
            className={`relative flex items-stretch mb-8 last:mb-0 ${
              index % 2 === 0 ? "md:justify-start" : "md:justify-end"
            }`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={index * 90}
          >
            {/* Medallón de la línea */}
            <div className="absolute left-5 md:left-1/2 top-7 -translate-x-1/2 z-20 flex items-center justify-center w-7 h-7 bg-[#F6E8D1] border border-[#9A7437]/70 rotate-45 shadow-sm">
              <span className="-rotate-45 text-[#6E171A] text-xs">✦</span>
            </div>

            {/* Tarjeta */}
            <div
              className={`ml-11 md:ml-0 w-[calc(100%-2.75rem)] md:w-[43%] relative bg-[#FFF9EF]/85 border border-[#A98342]/35 px-5 py-5 sm:px-6 sm:py-6 text-left shadow-lg ${
                index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
            >
              <div className="absolute inset-2 border border-[#A98342]/15 pointer-events-none" />

              <div className="relative z-10">
                <p
                  className="uppercase tracking-[0.22em] text-[#9A7437] text-sm md:text-base font-semibold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.hora}
                </p>

                <h3
                  className="text-4xl md:text-5xl text-[#6E171A] mb-2 font-normal leading-none"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  {item.titulo}
                </h3>

                <p
                  className="text-[#493B34] text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.detalle}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="h-px w-14 md:w-20 bg-[#9A7437]/50" />
          <span className="text-[#9A7437] text-xl">❦</span>
          <span className="h-px w-14 md:w-20 bg-[#9A7437]/50" />
        </div>
      </div>
    </div>
  </div>
</section>

      <section
        className="relative py-20 md:py-24 px-4 md:px-6 text-center z-10 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
            <span className="text-[#9A7437] text-2xl">❦</span>
            <span className="text-[#6E171A] text-lg">✦</span>
            <span className="text-[#9A7437] text-2xl">❦</span>
            <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
          </div>

          <p
            className="uppercase tracking-[0.32em] text-[#9A7437] text-sm md:text-base font-semibold mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recuerdos especiales
          </p>

          <h2
            className="text-6xl md:text-8xl font-normal text-[#6E171A] mb-5"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Galería
          </h2>

          <p
            className="max-w-2xl mx-auto text-xl md:text-2xl text-[#493B34] mb-12 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Quince años de momentos, sueños y recuerdos nos han traído hasta
            esta noche. Acompáñame a celebrar una nueva etapa de mi historia.
          </p>

          <div className="relative bg-[#F6E8D1]/90 border border-[#A98342]/45 shadow-2xl px-4 py-8 md:px-8 md:py-10">
            <div className="absolute inset-3 border border-[#A98342]/20 pointer-events-none" />

            <div className="relative z-10 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4">
              {fotosGaleria.map((foto, index) => (
                <div
                  key={foto}
                  className="shrink-0 w-[88%] sm:w-[48%] md:w-[32%] lg:w-[24%] snap-center"
                >
                  <div className="relative bg-[#E7D4B5] p-2 border border-[#9A7437]/50 shadow-xl">
                    <div className="absolute inset-1 border border-[#9A7437]/25 pointer-events-none" />
                    <img
                      src={foto}
                      alt={`Foto de ${evento.nombre} ${index + 1}`}
                      className="relative w-full aspect-[3/4] object-cover grayscale-[8%] hover:grayscale-0 hover:scale-[1.02] transition duration-500"
                    />
                  </div>

                  <div className="mt-4 text-[#9A7437] text-lg tracking-[0.35em]">
                    ❦ ✦ ❦
                  </div>
                </div>
              ))}
            </div>

            <p
              className="relative z-10 mt-2 uppercase tracking-[0.2em] text-sm md:text-base text-[#6E171A] font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Desliza para descubrir más recuerdos
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
            <span className="text-[#9A7437] text-2xl">❦</span>
            <span className="text-[#6E171A] text-lg">✦</span>
            <span className="text-[#9A7437] text-2xl">❦</span>
            <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-5 md:px-6 text-center relative z-10" data-aos="zoom-in-up">
        <h2
          className="text-5xl md:text-6xl font-normal text-[#6E171A] mb-2"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          ¿Podrás acompañarme en este día tan especial?
        </h2>
      </section>

      <section className="py-16 relative z-10" data-aos="fade-up">
     
<RSVPForm
  nombreInvitado={nombreInvitado}
  pasesAsignados={pasesAsignados}
  codigoInvitado={codigoInvitado}
/>
      </section>

      <section
        className="relative py-20 md:py-24 px-4 md:px-6 text-center z-10 overflow-hidden"
        data-aos="fade-up"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
            <span className="text-[#9A7437] text-2xl">❦</span>
            <span className="text-[#6E171A] text-lg">✦</span>
            <span className="text-[#9A7437] text-2xl">❦</span>
            <span className="h-px w-14 md:w-24 bg-[#9A7437]/60" />
          </div>

          <p
            className="uppercase tracking-[0.3em] text-[#9A7437] text-sm md:text-base font-semibold mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Un recuerdo para siempre
          </p>

          <h2
            className="text-6xl md:text-8xl font-normal text-[#6E171A] mb-5"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Libro de visitas
          </h2>

          <p
            className="max-w-2xl mx-auto text-xl md:text-2xl text-[#493B34] mb-12 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Déjame unas palabras, un deseo o un recuerdo especial para guardar
            de esta noche.
          </p>

          <div className="relative bg-[#F6E8D1]/95 border border-[#A98342]/45 shadow-2xl px-6 py-10 md:px-12 md:py-12">
            <div className="absolute inset-3 border border-[#A98342]/20 pointer-events-none" />

            <div className="relative z-10">
              <p
                className="uppercase tracking-[0.2em] text-[#9A7437] text-sm font-semibold mb-3 text-left max-w-2xl mx-auto"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Tu mensaje
              </p>

              <textarea
                value={mensajeLibro}
                onChange={(e) => setMensajeLibro(e.target.value)}
                className="w-full max-w-2xl h-44 p-5 border border-[#A98342]/45 bg-[#FFF9EF] text-[#241B18] text-lg md:text-xl outline-none focus:ring-2 focus:ring-[#9A7437]/30 resize-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>

              <button
                onClick={enviarMensajeLibro}
                className="mt-7 px-10 py-3 border border-[#9A7437] bg-[#6E171A] text-[#FFF4E3] uppercase tracking-[0.16em] text-sm md:text-base font-semibold hover:bg-[#9A7437] transition"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Enviar mensaje
              </button>

              {mensajeEnviado && (
                <p
                  className={`mt-5 font-semibold ${
                    mensajeEnviado.includes("Gracias")
                      ? "text-[#4D5F3B]"
                      : "text-[#8A1F24]"
                  }`}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {mensajeEnviado}
                </p>
              )}

              <div className="flex items-center justify-center gap-4 mt-10">
                <span className="h-px w-14 md:w-20 bg-[#9A7437]/60" />
                <span className="text-[#9A7437] text-xl">❦</span>
                <span className="h-px w-14 md:w-20 bg-[#9A7437]/60" />
              </div>
            </div>
          </div>

          <p
            className="mt-12 text-4xl md:text-5xl text-[#6E171A] leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Gracias por ser parte de este día tan especial.
          </p>
        </div>
      </section>

      </div>
  );
}
