"use client";
import React, { useState, useEffect } from "react";
import { CiBeerMugFull } from "react-icons/ci";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; // Asegúrate de que la ruta sea correcta

export default function Page() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([""]);
  const [archivo, setArchivo] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [productos, setProductos] = useState([]);
  const [editandoProductoId, setEditandoProductoId] = useState(null);

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
  }, []);

  const agregarCaracteristica = () => {
    setCaracteristicas([...caracteristicas, ""]);
  };

  const eliminarCaracteristica = (index) => {
    const nuevasCaracteristicas = caracteristicas.filter((_, i) => i !== index);
    setCaracteristicas(nuevasCaracteristicas);
  };

  const manejarCambioCaracteristica = (value, index) => {
    const nuevasCaracteristicas = [...caracteristicas];
    nuevasCaracteristicas[index] = value;
    setCaracteristicas(nuevasCaracteristicas);
  };

  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
    setImagenPreview(URL.createObjectURL(file));
  };

  const manejarSubmit = async () => {
    let imagenURL = null;

    if (archivo) {
      const archivoRef = ref(storage, `imagenes/${archivo.name}`);
      await uploadBytes(archivoRef, archivo);
      imagenURL = await getDownloadURL(archivoRef);
    }

    const producto = {
      nombre,
      precio,
      categoria,
      caracteristicas,
      imagen: imagenURL,
    };

    try {
      if (editandoProductoId) {
        // Actualizar producto existente
        await updateDoc(doc(db, "productos", editandoProductoId), producto);
        setProductos(
          productos.map((p) =>
            p.id === editandoProductoId
              ? { id: editandoProductoId, ...producto }
              : p
          )
        );
        alert("Producto actualizado exitosamente");
      } else {
        // Agregar nuevo producto
        const docRef = await addDoc(collection(db, "productos"), producto);
        setProductos([...productos, { id: docRef.id, ...producto }]);
        alert("Producto agregado exitosamente");
      }

      // Resetear el formulario
      setNombre("");
      setPrecio("");
      setCategoria("");
      setCaracteristicas([""]);
      setArchivo(null);
      setImagenPreview(null);
      setEditandoProductoId(null);
    } catch (error) {
      console.error("Error al agregar o actualizar el producto:", error);
    }
  };

  const manejarEditar = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setCategoria(producto.categoria);
    setCaracteristicas(producto.caracteristicas);
    setImagenPreview(producto.imagen);
    setEditandoProductoId(producto.id);
  };

  const manejarEliminar = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setProductos(productos.filter((producto) => producto.id !== id));
      alert("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [activo, setActivo] = useState(true);
  const aceder = () => {
    if (usuario === "admin" && password === "heha123") {
      setActivo(false);
    } else {
      setActivo(true);
    }
  };

  return (
    <>
      {activo ? (
        <div className="p-4">
          <label className="input input-bordered flex items-center gap-2 mb-2">
            <input
              type="text"
              className="grow"
              placeholder="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <CiBeerMugFull />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-2">
            <input
              type="text"
              className="grow"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CiBeerMugFull />
          </label>
          <button
            onClick={aceder}
            className="bg-gray-700 text-white p-3 rounded-lg"
          >
            Entrar
          </button>
        </div>
      ) : (
        <div className="p-8 grid grid-cols-1 gap-2">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              {editandoProductoId ? "Editar producto" : "Agregar producto"}
            </h1>

            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <CiBeerMugFull />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <CiBeerMugFull />
            </label>

            {caracteristicas.map((caracteristica, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="input input-bordered grow"
                  placeholder={`Característica ${index + 1}`}
                  value={caracteristica}
                  onChange={(e) =>
                    manejarCambioCaracteristica(e.target.value, index)
                  }
                />
                <button
                  className="btn btn-error"
                  onClick={() => eliminarCaracteristica(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}

            <button className="btn mb-4" onClick={agregarCaracteristica}>
              Agregar característica
            </button>

            <select
              className="select select-bordered w-full mb-4"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="Pollo">Pollo</option>
              <option value="Otros">Otros</option>
              <option value="Extras">Extras</option>
              <option value="Bebidas">Bebidas</option>
            </select>

            <input
              type="file"
              className="file-input file-input-bordered w-full mb-4"
              onChange={manejarCambioImagen}
            />

            {imagenPreview && (
              <div className="mb-4">
                <img
                  src={imagenPreview}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}

            <button
              className="p-4 border rounded-xl mb-8"
              onClick={manejarSubmit}
            >
              {editandoProductoId ? "Actualizar" : "Agregar"}
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Lista de productos</h2>
            <div className="space-y-4">
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="p-4 border rounded-lg flex flex-col gap-2"
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => manejarEditar(producto)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => manejarEliminar(producto.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <p>Precio: {producto.precio}</p>
                  <p>Categoría: {producto.categoria}</p>
                  <p>Características:</p>
                  <ul className="list-disc list-inside">
                    {producto.caracteristicas.map((car, index) => (
                      <li key={index}>{car}</li>
                    ))}
                  </ul>
                  {producto.imagen && (
                    <img
                      src={producto.imagen}
                      alt="Imagen del producto"
                      className="w-32 h-32 object-cover mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
