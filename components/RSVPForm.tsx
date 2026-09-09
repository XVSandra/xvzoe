"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { evento } from "@/config/evento";
import { db } from "@/lib/firebase";

type RSVPFormProps = {
  nombreInvitado: string;
  pasesAsignados: number;
  codigoInvitado: string;
};

export default function RSVPForm({
  nombreInvitado,
  pasesAsignados,
  codigoInvitado,
}: RSVPFormProps) {
  const [asistencia, setAsistencia] = useState("Sí asistiré");
  const [cantidadConfirmada, setCantidadConfirmada] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [confirmacionExistente, setConfirmacionExistente] = useState(false);
  const [cargandoConfirmacion, setCargandoConfirmacion] = useState(true);

  useEffect(() => {
    const cargarConfirmacionExistente = async () => {
      if (!codigoInvitado) {
        setCargandoConfirmacion(false);
        return;
      }

      try {
        const refConfirmacion = doc(db, "confirmaciones", codigoInvitado);
        const snapshot = await getDoc(refConfirmacion);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setConfirmacionExistente(true);
          setAsistencia(data.asistencia || "Sí asistiré");
          setCantidadConfirmada(Number(data.cantidadConfirmada || 1));
        }
      } catch (error) {
        console.error("Error cargando confirmación existente:", error);
      } finally {
        setCargandoConfirmacion(false);
      }
    };

    cargarConfirmacionExistente();
  }, [codigoInvitado]);

  const opcionesCantidad =
    asistencia === "Sí asistiré"
      ? Array.from({ length: pasesAsignados }, (_, i) => i + 1)
      : [0];

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigoInvitado) {
      toast.error("No se encontró el código de invitación.");
      return;
    }

    try {
      setEnviando(true);

      await setDoc(doc(db, "confirmaciones", codigoInvitado), {
        codigo: codigoInvitado,
        nombre: nombreInvitado,
        asistencia,
        pasesAsignados,
        cantidadConfirmada:
          asistencia === "No asistiré" ? 0 : cantidadConfirmada,
        fechaConfirmacion: new Date(),
      });

      toast.success(
        confirmacionExistente
          ? "Confirmación actualizada correctamente."
          : "Confirmación enviada correctamente."
      );

      setConfirmacionExistente(true);
    } catch (error) {
      console.error("Error enviando confirmación:", error);
      toast.error("Hubo un error al enviar la confirmación.");
    } finally {
      setEnviando(false);
    }
  };

  if (cargandoConfirmacion) {
    return (
      <div className="max-w-xl mx-auto px-6">
        <div className="relative bg-[#F6E8D1]/95 border border-[#A98342]/45 shadow-xl p-8 text-center">
          <div className="absolute inset-3 border border-[#A98342]/20 pointer-events-none" />
          <p
            className="relative z-10 text-[#493B34] text-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Cargando confirmación...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={manejarSubmit}
      className="relative max-w-2xl mx-auto bg-[#F6E8D1]/95 border border-[#A98342]/45 shadow-2xl px-6 py-10 md:px-10 md:py-12"
    >
      <div className="absolute inset-3 border border-[#A98342]/20 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-14 md:w-20 bg-[#9A7437]/60" />
          <span className="text-[#9A7437] text-2xl">❦</span>
          <span className="text-[#6E171A] text-lg">✦</span>
          <span className="text-[#9A7437] text-2xl">❦</span>
          <span className="h-px w-14 md:w-20 bg-[#9A7437]/60" />
        </div>

        <div className="text-center mb-9">
          <p
            className="uppercase tracking-[0.28em] text-[#9A7437] text-sm md:text-base font-semibold mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            RSVP
          </p>

          <h3
            className="text-5xl md:text-6xl font-normal text-[#6E171A] leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Confirma tu asistencia
          </h3>

          <div
            className="mt-5 text-lg md:text-xl text-[#493B34] leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <p>Agradecemos tu respuesta a más tardar el</p>
            <p className="font-semibold text-[#9A7437] text-2xl md:text-3xl mt-1">
              {evento.rsvp.fechaLimite}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-[#FBF3E4] border border-[#A98342]/30 p-5 text-center">
            <p
              className="uppercase tracking-[0.2em] text-xs md:text-sm text-[#9A7437] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Invitación para
            </p>
            <p
              className="text-2xl md:text-3xl text-[#6E171A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {nombreInvitado}
            </p>
          </div>

          <div className="bg-[#FBF3E4] border border-[#A98342]/30 p-5 text-center">
            <p
              className="uppercase tracking-[0.2em] text-xs md:text-sm text-[#9A7437] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Pases asignados
            </p>
            <p
              className="text-4xl text-[#6E171A]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {pasesAsignados}
            </p>
          </div>
        </div>

        {confirmacionExistente && (
          <div
            className="mb-7 bg-[#EEF3E8] border border-[#7B8F62]/35 text-[#4D5F3B] px-5 py-4 text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Tu confirmación ya fue registrada. Puedes actualizarla si necesitas
            hacer algún cambio.
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              className="block uppercase tracking-[0.18em] text-sm font-semibold text-[#6E171A] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Confirmación
            </label>

            <select
              value={asistencia}
              onChange={(e) => {
                setAsistencia(e.target.value);
                setCantidadConfirmada(
                  e.target.value === "No asistiré" ? 0 : 1
                );
              }}
              className="w-full bg-[#FFF9EF] border border-[#A98342]/45 px-4 py-3 text-[#241B18] outline-none focus:ring-2 focus:ring-[#9A7437]/30"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <option>Sí asistiré</option>
              <option>No asistiré</option>
            </select>
          </div>

          <div>
            <label
              className="block uppercase tracking-[0.18em] text-sm font-semibold text-[#6E171A] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Cantidad de asistentes confirmados
            </label>

            <select
              value={cantidadConfirmada}
              onChange={(e) =>
                setCantidadConfirmada(Number(e.target.value))
              }
              disabled={asistencia === "No asistiré"}
              className="w-full bg-[#FFF9EF] border border-[#A98342]/45 px-4 py-3 text-[#241B18] outline-none focus:ring-2 focus:ring-[#9A7437]/30 disabled:bg-[#E9E1D5] disabled:text-[#8A8178]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {opcionesCantidad.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="block mx-auto mt-9 px-10 py-3 border border-[#9A7437] bg-[#6E171A] text-[#FFF4E3] uppercase tracking-[0.15em] text-sm md:text-base font-semibold hover:bg-[#9A7437] transition disabled:opacity-60"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {enviando
            ? "Guardando..."
            : confirmacionExistente
            ? "Actualizar confirmación"
            : "Enviar confirmación"}
        </button>

        <div className="flex items-center justify-center gap-4 mt-9">
          <span className="h-px w-14 md:w-20 bg-[#9A7437]/60" />
          <span className="text-[#9A7437] text-xl">❦</span>
          <span className="h-px w-14 md:w-20 bg-[#9A7437]/60" />
        </div>
      </div>
    </form>
  );
}
