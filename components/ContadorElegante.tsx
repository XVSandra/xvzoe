"use client";

import { useEffect, useState } from "react";

import { evento } from "@/config/evento";

const EVENT_DATE = new Date(evento.fecha.iso);

function calcularTiempo() {
  const diff = EVENT_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return {
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
    };
  }

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

export default function ContadorElegante() {
  const [tiempo, setTiempo] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    setTiempo(calcularTiempo());

    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const items = [
    { label: "Días", value: tiempo.dias },
    { label: "Horas", value: tiempo.horas },
    { label: "Minutos", value: tiempo.minutos },
    { label: "Segundos", value: tiempo.segundos },
  ];

  return (
    <div className="text-center relative z-10">
      <h2
        className="text-3xl md:text-4xl font-semibold text-[#6E171A] mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        La noche se acerca
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {items.map((item) => (
          <div
            key={item.label}
            className="relative overflow-hidden bg-[#FBF3E4]/90 backdrop-blur-md rounded-2xl shadow-lg border border-[#A98342]/45 px-4 py-6"
          >
            <p
              className="text-4xl md:text-5xl font-semibold text-[#9A7437]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {String(item.value).padStart(2, "0")}
            </p>

            <p
              className="text-base md:text-lg uppercase tracking-[0.12em] text-[#6E171A] font-semibold mt-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}