// Nav.js
"use client";
import React from "react";
import Image from "next/image";
import { useProductos } from "../context/Context";
import { CiShoppingCart, CiShop } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function Nav() {
  const { carrito } = useProductos();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-2 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo y nombre de la tienda */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <CiShop className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
            <span className="hidden md:block text-lg font-bold text-gray-800">
              HEHA
            </span>
          </button>
        </div>

        {/* Logo central */}
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="HEHA Logo"
            width={80}
            height={80}
            className="w-16 md:w-20 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push("/")}
            priority
          />
        </div>

        {/* Carrito */}
        <button
          onClick={() => router.push("/carrito")}
          className="relative group p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <CiShoppingCart className="w-7 h-7 md:w-8 md:h-8 text-gray-700" />
          {carrito.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {carrito.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
