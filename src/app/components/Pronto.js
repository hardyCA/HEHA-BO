import React, { useState, useEffect } from "react";

export default function Pronto() {
  // Fecha de apertura (por ejemplo, 1 de octubre de 2024)
  const fechaApertura = new Date("2024-10-01T00:00:00").getTime();

  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const actualizarCuentaRegresiva = () => {
      const ahora = new Date().getTime();
      const diferencia = fechaApertura - ahora;

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      setTiempoRestante({ dias, horas, minutos, segundos });
    };

    // Actualiza la cuenta regresiva cada segundo
    const intervalo = setInterval(actualizarCuentaRegresiva, 1000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  }, [fechaApertura]);

  return (
    <div className="p-4">
      <h1 className="my-3 font-extrabold text-gray-500 text-3xl">
        Muy pronto{" "}
      </h1>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-teal-500 rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": tiempoRestante.dias }}></span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-teal-500 rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": tiempoRestante.horas }}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-teal-500 rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": tiempoRestante.minutos }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-teal-500 rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": tiempoRestante.segundos }}></span>
          </span>
          sec
        </div>
      </div>
      <p className="my-3">¡Entrega adomicilio gratuito!</p>
    </div>
  );
}
