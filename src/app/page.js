"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProductos } from "./context/Context";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Componente Skeleton para productos
const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="h-48 w-full bg-gray-200" />
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-200 rounded-full w-24" />
      </div>
    </div>
  </div>
);

export default function Page() {
  const { productos } = useProductos();
  const router = useRouter();
  const categorias = ["Pollo", "Otros", "Extras", "Bebidas"];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    categorias[0]
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga mínimo para evitar parpadeos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simular carga al cambiar de categoría
  const handleCategoriaChange = (categoria) => {
    setIsLoading(true);
    setCategoriaSeleccionada(categoria);
    setTimeout(() => setIsLoading(false), 500);
  };

  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === categoriaSeleccionada
  );

  const ver = (data) => {
    router.push(`/${data.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleCategoriaChange(categoria)}
              className={`px-6 py-3 rounded-full transition-all duration-200 font-medium
                ${
                  categoriaSeleccionada === categoria
                    ? "bg-red-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-red-50 border border-gray-200"
                }`}
              disabled={isLoading}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Loading State or Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {isLoading ? (
            // Mostrar skeletons mientras carga
            [...Array(8)].map((_, index) => <ProductSkeleton key={index} />)
          ) : productosFiltrados.length > 0 ? (
            // Mostrar productos cuando están cargados
            productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                onClick={() => ver(producto)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
              >
                <div className=" w-full">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                    loading="eager"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {producto.nombre}
                  </h2>
                  <div className="flex justify-between items-center">
                    <p className="text-red-600 font-bold text-xl">
                      Bs. {producto.precio}
                    </p>
                    <span className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                      Incluye
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Mostrar mensaje cuando no hay productos
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">
                No hay productos disponibles en esta categoría
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
