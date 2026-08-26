"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

type AdminPasswordGateProps = {
  children: React.ReactNode;
};

export default function AdminPasswordGate({
  children,
}: AdminPasswordGateProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autorizado, setAutorizado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAutorizado(Boolean(user));
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setAutorizado(true);
    } catch (error) {
      console.error("Error iniciando sesión:", error);
      setError("Correo o contraseña incorrectos.");
    }
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    setAutorizado(false);
  };

  if (cargando) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </main>
    );
  }

  if (autorizado) {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={cerrarSesion}
            className="bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full text-sm"
          >
            Cerrar sesión
          </button>
        </div>

        {children}
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] flex items-center justify-center p-6">
      <form
        onSubmit={iniciarSesion}
        className="bg-white rounded-[32px] shadow-lg p-8 max-w-md w-full text-center"
      >
        <p className="uppercase tracking-[0.3em] text-xs text-[#9b355e] mb-2">
          XV Zoe
        </p>

        <h1 className="text-3xl font-bold text-[#FF3471] mb-4">
          Panel privado
        </h1>

        <p className="text-gray-600 mb-6">
          Inicia sesión para administrar la invitación.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          autoComplete="email"
          className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#FF3471]/30 mb-4"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoComplete="current-password"
          className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#FF3471]/30 mb-4"
        />

        {error && (
          <p className="text-red-600 text-sm mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#FF3471] text-white py-3 rounded-full font-semibold hover:bg-[#FEA201] transition"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}