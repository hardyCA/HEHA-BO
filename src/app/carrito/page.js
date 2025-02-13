"use client";
import React from "react";
import Image from "next/image";
import { useProductos } from "../context/Context";
import Nav from "../components/Nav";
import { CiTrash } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

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
    setCarrito([]);
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
    mensaje += "*¡Las entregas a domicilio son completamente GRATIS!*";

    return `https://wa.me/59162368026?text=${encodeURIComponent(mensaje)}`;
  };

  if (carrito.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-md mx-auto p-6 text-center mt-20">
          <IoCartOutline className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-6">
            ¡Agrega algunos productos deliciosos para comenzar!
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Ver Menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Carrito de Compras
              </h1>
              <button
                onClick={vaciarCarrito}
                className="text-red-500 hover:text-red-600 flex items-center gap-2"
              >
                <CiTrash className="w-5 h-5" />
                Vaciar carrito
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-700 text-center font-medium">
                ¡Las entregas a domicilio son completamente GRATIS VENTILLA! 🚚
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {carrito.map((producto) => (
                <div
                  key={producto.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={producto.imagen}
                        alt={producto.nombre}
                        fill
                        className="object-cover rounded-lg"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {producto.nombre}
                      </h3>
                      <p className="text-gray-500">Bs. {producto.precio} c/u</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          actualizarCantidad(
                            producto.id,
                            producto.cantidad > 1 ? producto.cantidad - 1 : 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {producto.cantidad}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        onClick={() =>
                          actualizarCantidad(producto.id, producto.cantidad + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="w-24 text-right">
                      <p className="font-medium">
                        Bs. {producto.precio * producto.cantidad}
                      </p>
                    </div>
                    <button
                      onClick={() => eliminarDelCarrito(producto.id)}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <CiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-600">Total</span>
                <span className="text-2xl font-bold text-gray-800">
                  Bs. {calcularTotal()}
                </span>
              </div>

              <a
                href={generarMensajeWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
                <span className="font-medium">Enviar pedido por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
