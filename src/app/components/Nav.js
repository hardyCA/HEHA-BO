"use client";
import React from "react";
import { useProductos } from "../context/Context";
import { CiShoppingCart, CiShop } from "react-icons/ci";
import { useRouter } from "next/navigation";
export default function Nav() {
  const { carrito, actualizarCantidad, eliminarDelCarrito } = useProductos();
  const router = useRouter();

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-3xl border flex justify-between ">
      <div className="" onClick={() => router.push(`/`)}>
        <CiShop className="w-10 h-10" />
      </div>
      <img
        className="w-20"
        src="/logo.png"
        alt="Logo"
        onClick={() => router.push(`/`)}
      />

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator" onClick={() => router.push(`/carrito`)}>
              <CiShoppingCart className="w-10 h-10" />
              <span className="badge badge-sm indicator-item">
                {carrito.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
