"use client";
import React, { useState } from "react";
import { CiShoppingCart, CiMedicalCross } from "react-icons/ci";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useProductos } from "./context/Context";
import { useRouter } from "next/navigation";
import Pronto from "./components/Pronto";

export default function Page() {
  const { productos } = useProductos();
  const router = useRouter();

  const categorias = ["Pollo", "Otros", "Extras", "Bebidas"];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    categorias[0]
  );

  // Filtrar los productos según la categoría seleccionada
  const productosFiltrados = productos.filter(
    (producto) =>
      categoriaSeleccionada === "" ||
      producto.categoria === categoriaSeleccionada
  );

  const ver = (data) => {
    router.push(`/menu/${data.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4">
      <Nav />

      {/* <Pronto /> */}
      <main className="flex-grow p-4">
        <div className="flex gap-1">
          {/* Categorias */}
          {categorias.map((categoria) => (
            <div
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`p-3 rounded-2xl ${
                categoriaSeleccionada === categoria
                  ? "bg-amber-500"
                  : "bg-red-500"
              } text-white border hover:bg-amber-500 shadow-md cursor-pointer`}
            >
              {categoria}
            </div>
          ))}
        </div>
        <img src="/uno.png" className="rounded-lg my-2 shadow-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
          {productosFiltrados.map((producto) => (
            <div
              onClick={() => ver(producto)}
              key={producto.id}
              className=" rounded-xl border-gray-500 shadow-md"
            >
              <img
                className="rounded-lg"
                src={producto.imagen}
                alt={producto.nombre}
              />
              <div className="p-4">
                {/* <h1 className="text-gray-500 font-bold my-2">
                  {producto.nombre}
                </h1> */}
                <div className="flex justify-between items-center">
                  <p className="text-red-500 font-extrabold text-3xl">
                    Bs. {producto.precio}
                  </p>
                  <button className="p-2 rounded-full border bg-red-500 text-white">
                    Incluye
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <img src="/dos.png" className="rounded-lg my-2 shadow-lg" /> */}
      </main>
      <div></div>
      <Footer />
    </div>
  );
}
