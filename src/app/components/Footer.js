// Footer.js
import React from "react";
import { CiPhone } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-amber-500 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">HEHA</h2>
            <p className="text-sm md:text-base opacity-90">
              HEHA Dark kitchen, Cloud kitchen y Restaurante virtual.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <CiPhone className="w-5 h-5" />
              <a href="tel:+59162368026" className="hover:underline">
                +591 62368026
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Menú
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white/80 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm">
          <p>
            © {new Date().getFullYear()} HEHA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
