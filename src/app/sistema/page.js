"use client";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import IngredientsTab from "../components/IngredientsTab";
import DishesTab from "../components/DishesTab";
import SalesTab from "../components/SalesTab";

const page = () => {
  const [ingredients, setIngredients] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ingredients");

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Configurar listeners en tiempo real para las colecciones
        const unsubIngredients = onSnapshot(
          collection(db, "ingredients"),
          (snapshot) => {
            const ingredientsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setIngredients(ingredientsData);
          }
        );

        const unsubDishes = onSnapshot(collection(db, "dishes"), (snapshot) => {
          const dishesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDishes(dishesData);
        });

        const unsubSales = onSnapshot(
          query(collection(db, "sales"), orderBy("timestamp", "desc")),
          (snapshot) => {
            const salesData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              timestamp: doc.data().timestamp?.toDate(),
            }));
            setSales(salesData);
          }
        );

        setLoading(false);

        // Cleanup listeners
        return () => {
          unsubIngredients();
          unsubDishes();
          unsubSales();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Agregar nuevo ingrediente
  const addIngredient = async (ingredientData) => {
    try {
      await addDoc(collection(db, "ingredients"), {
        ...ingredientData,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  // Agregar nuevo plato
  const addDish = async (dishData) => {
    try {
      await addDoc(collection(db, "dishes"), {
        ...dishData,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };

  // Registrar venta
  const registerSale = async (saleData) => {
    try {
      await addDoc(collection(db, "sales"), {
        ...saleData,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error registering sale:", error);
    }
  };

  // Función para actualizar un ingrediente en Firebase
  const updateIngredient = async (id, updatedIngredient) => {
    try {
      const docRef = doc(db, "ingredients", id);
      const updatedData = {
        ...updatedIngredient,
        updatedAt: Timestamp.now(),
      };
      await updateDoc(docRef, updatedData);
    } catch (error) {
      console.error("Error updating ingredient:", error);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  // Función para eliminar un ingrediente de Firebase
  const deleteIngredient = async (id) => {
    try {
      const docRef = doc(db, "ingredients", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">
                  Restaurant Manager
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`${
                    activeTab === "ingredients"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Ingredientes
                </button>
                <button
                  onClick={() => setActiveTab("dishes")}
                  className={`${
                    activeTab === "dishes"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Platos
                </button>
                <button
                  onClick={() => setActiveTab("sales")}
                  className={`${
                    activeTab === "sales"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Ventas
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === "ingredients" && (
          <IngredientsTab
            ingredients={ingredients}
            addIngredient={addIngredient}
            updateIngredient={updateIngredient}
            deleteIngredient={deleteIngredient}
          />
        )}
        {activeTab === "dishes" && (
          <DishesTab
            dishes={dishes}
            ingredients={ingredients}
            addDish={addDish}
            registerSale={registerSale}
          />
        )}
        {activeTab === "sales" && (
          <SalesTab sales={sales} dishes={dishes} registerSale={registerSale} />
        )}
      </main>
    </div>
  );
};

export default page;
