"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const ProductosContext = createContext();
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos must be used within a ProductosProvider");
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosLista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosLista);
    };

    obtenerProductos();
    setLoading(false);
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: producto.cantidad }];
    });
  };

  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === productoId ? { ...item, cantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== productoId)
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="">
          <div className="flex justify-center">
            <span className="loading loading-bars loading-xs"></span>
          </div>
          {/* <h1 className="my-3 text-gray-500 font-bold">HEHA</h1> */}
          <img src="logo.png" className="h-10" />
        </div>
      </div>
    );
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
        carrito,
        setCarrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
