"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import { FcCheckmark } from "react-icons/fc";
import { CiShoppingCart } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { useProductos } from "@/app/context/Context";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Componente Skeleton para la carga
const ProductDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-64 md:h-96 bg-gray-200 rounded-xl mb-4" />
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded w-full" />
        ))}
      </div>
    </div>
  </div>
);

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params;
  const { productos, agregarAlCarrito } = useProductos();
  const [cantidad, setCantidad] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Simular tiempo de carga para mejor UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const productoFiltrado = productos.find((prod) => prod.id === id);

  if (!productoFiltrado && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-2xl mx-auto p-4 text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Producto no encontrado
          </h2>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            <IoArrowBack className="mr-2" />
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const incrementarCantidad = () =>
    setCantidad((prev) => Math.min(prev + 1, 10));
  const decrementarCantidad = () =>
    setCantidad((prev) => Math.max(prev - 1, 1));

  const manejarAgregarAlCarrito = async () => {
    setIsAdding(true);
    const productoConCantidad = { ...productoFiltrado, cantidad };
    agregarAlCarrito(productoConCantidad);
    toast.success("¡Producto añadido al carrito!", {
      icon: "🛒",
      duration: 2000,
    });

    setTimeout(() => {
      setIsAdding(false);
      router.push("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-2xl mx-auto p-4">
        {isLoading ? (
          <ProductDetailSkeleton />
        ) : (
          <>
            <button
              onClick={() => router.back()}
              className="mb-4 inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <IoArrowBack className="mr-1" />
              Volver
            </button>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={productoFiltrado.imagen}
                    alt={productoFiltrado.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                    // priority
                  />
                </div>
                <div className="absolute bottom-3 right-3 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  Bs. {productoFiltrado.precio}
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {productoFiltrado.nombre}
                </h1>

                <div className="space-y-3 mb-6">
                  {productoFiltrado.caracteristicas.map(
                    (caracteristica, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 text-gray-700"
                      >
                        <FcCheckmark className="flex-shrink-0 w-5 h-5" />
                        <span className="text-lg">{caracteristica}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="flex items-center justify-center space-x-6 mb-6">
                  <button
                    onClick={decrementarCantidad}
                    className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-bold hover:bg-amber-600 transition-colors disabled:opacity-50"
                    disabled={cantidad <= 1}
                  >
                    -
                  </button>
                  <span className="text-3xl font-bold text-gray-800 w-12 text-center">
                    {cantidad}
                  </span>
                  <button
                    onClick={incrementarCantidad}
                    className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-bold hover:bg-amber-600 transition-colors disabled:opacity-50"
                    disabled={cantidad >= 10}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={manejarAgregarAlCarrito}
                  disabled={isAdding}
                  className={`w-full py-4 px-6 rounded-xl text-white font-bold flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] ${
                    isAdding
                      ? "bg-green-500"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {isAdding ? (
                    <>
                      <FcCheckmark className="w-6 h-6" />
                      <span>¡Añadido!</span>
                    </>
                  ) : (
                    <>
                      <CiShoppingCart className="w-6 h-6" />
                      <span>Añadir al carrito</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
