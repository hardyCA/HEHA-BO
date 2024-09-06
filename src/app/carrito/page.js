"use client";
import React from "react";
import { useProductos } from "../context/Context";
import Nav from "../components/Nav";
import { CiTrash } from "react-icons/ci";

export default function Page() {
  const { carrito, setCarrito, actualizarCantidad, eliminarDelCarrito } =
    useProductos();

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]); // Esto vacía el carrito en el contexto
  };
  const generarMensajeWhatsApp = () => {
    let mensaje = "🛒 *Pedido HEHA:* \n\n";

    carrito.forEach((producto) => {
      mensaje += `🍗 *Nombre:* ${producto.nombre}\n`;
      mensaje += `💵 *Precio:* ${producto.precio} BOB\n`;
      mensaje += `🔢 *Cantidad:* ${producto.cantidad}\n`;
      mensaje += `💰 *Total:* ${producto.precio * producto.cantidad} BOB\n\n`;
    });

    mensaje += `🧾 *TOTAL:* ${calcularTotal()} BOB\n\n`;
    mensaje += "🙏 ¡Gracias por tu compra!\n\n";
    mensaje += "-------------------------------------\n\n";
    mensaje +=
      "*¡Recuerda que a partir de dos productos, las entregas a domicilio son completamente GRATIS!*";

    const mensajeCodificado = encodeURIComponent(mensaje);
    return `https://wa.me/59162368026?text=${mensajeCodificado}`;
  };

  return (
    <div className="p-4">
      <Nav />
      <div className="border my-3 shadow-md rounded-xl p-3">
        <h1 className="font-bold text-2xl my-4 text-gray-500">
          CARRITO DE COMPRAS
        </h1>
        <p className="text-amber-500 mb-4">
          ¡A partir de dos productos, las entregas a domicilio son completamente
          GRATIS!
        </p>

        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total(Bs.)</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.id}>
                  <td className="">
                    <div className="flex justify-center mb-1">
                      {/* <img
                        className="w-10 h-10"
                        src={producto.imagen}
                        alt={producto.nombre}
                      /> */}
                    </div>
                    <h5>{producto.nombre}</h5>
                  </td>
                  <td>{producto.precio}</td>
                  <td className="flex justify-center items-center">
                    {/* <button
                      className="p-3 border rounded-full"
                      onClick={() =>
                        actualizarCantidad(
                          producto.id,
                          producto.cantidad > 1 ? producto.cantidad - 1 : 1
                        )
                      }
                    >
                      -
                    </button> */}
                    <h1 className="p-2 font-bold">{producto.cantidad}</h1>
                    {/* <button
                      className="p-3 border rounded-full"
                      onClick={() =>
                        actualizarCantidad(producto.id, producto.cantidad + 1)
                      }
                    >
                      +
                    </button> */}
                  </td>
                  <td>{producto.precio * producto.cantidad}</td>
                  <td>
                    <button
                      className="text-red-500"
                      onClick={() => eliminarDelCarrito(producto.id)}
                    >
                      <CiTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <th></th>
                <th></th>
                <th>TOTAL</th>
                <th className="col-span-3">{calcularTotal()}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center my-6">
          <a
            href={generarMensajeWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-4 shadow-lg rounded-full"
          >
            Enviar pedido por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
