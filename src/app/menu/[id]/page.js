"use client";
import React, { useState } from "react";
import Nav from "@/app/components/Nav";
import { FcCheckmark } from "react-icons/fc";
import { CiShoppingCart } from "react-icons/ci";
import { useProductos } from "@/app/context/Context";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params;
  const { productos, agregarAlCarrito } = useProductos();

  // Filtrar el producto basado en el ID de los params
  const productoFiltrado = productos.find((prod) => prod.id === id);

  // Estado local para manejar la cantidad
  const [cantidad, setCantidad] = useState(1);

  if (!productoFiltrado) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  // Funciones para manejar el incremento y decremento de la cantidad
  const incrementarCantidad = () => setCantidad(cantidad + 1);
  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  // Manejo de agregar al carrito
  const manejarAgregarAlCarrito = () => {
    const productoConCantidad = { ...productoFiltrado, cantidad };
    agregarAlCarrito(productoConCantidad);
    toast.success("Producto añadido al carrito!");
    // Esperar 3 segundos antes de redirigir
    setTimeout(() => {
      router.push(`/`);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <Nav />
      <div className="container mx-auto my-4  rounded-xl">
        <div className="relative">
          <img
            className="w-full h-auto rounded-xl border"
            src={productoFiltrado.imagen}
            alt={productoFiltrado.nombre}
          />
          <div className="absolute bottom-1 right-1 text-2xl font-mono  bg-red-500 rounded-2xl p-1 flex justify-center items-center text-white">
            {productoFiltrado.precio} Bs.
          </div>
        </div>
        <div className="p-4">
          <h1 className="font-extrabold text-xl text-red-500 my-3">
            {productoFiltrado.nombre.toUpperCase()}
          </h1>
          <ul className="space-y-2 text-left text-gray-500 dark:text-gray-400 permanent-marker-regular">
            {productoFiltrado.caracteristicas.map((caracteristica, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <FcCheckmark className="w-5 h-5" />
                <span className="text-xl font-bold">{caracteristica}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center my-4 px-14">
            <button
              onClick={decrementarCantidad}
              className="flex justify-center items-center font-semibold w-14 h-14 border rounded-full text-3xl bg-amber-500 text-white"
            >
              -
            </button>
            <h1 className="p-2 font-bold text-4xl text-gray-600">{cantidad}</h1>

            <button
              onClick={incrementarCantidad}
              className="flex justify-center items-center font-semibold w-14 h-14 border rounded-full text-3xl bg-amber-500 text-white"
            >
              +
            </button>
          </div>

          <button
            onClick={manejarAgregarAlCarrito}
            className="bg-amber-500 text-white p-3 rounded-3xl w-full flex justify-center items-center"
          >
            <CiShoppingCart className="w-10 h-10 mr-2" />
            Añadir al carrito
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
