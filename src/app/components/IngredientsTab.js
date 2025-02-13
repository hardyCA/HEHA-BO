import React, { useState } from "react";
//import { Pencil, Trash2, X, Check } from "lucide-react";

const IngredientsTab = ({
  ingredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
}) => {
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    cost: "",
    portions: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingIngredient, setEditingIngredient] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const costPerPortion =
      parseFloat(newIngredient.cost) / parseFloat(newIngredient.portions);
    addIngredient({
      ...newIngredient,
      cost: parseFloat(newIngredient.cost),
      portions: parseFloat(newIngredient.portions),
      costPerPortion,
    });
    setNewIngredient({ name: "", cost: "", portions: "" });
  };

  const startEditing = (ingredient) => {
    setEditingId(ingredient.id);
    setEditingIngredient({ ...ingredient });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingIngredient(null);
  };

  const saveEdit = (id) => {
    const costPerPortion =
      parseFloat(editingIngredient.cost) /
      parseFloat(editingIngredient.portions);
    updateIngredient(id, {
      ...editingIngredient,
      cost: parseFloat(editingIngredient.cost),
      portions: parseFloat(editingIngredient.portions),
      costPerPortion,
    });
    setEditingId(null);
    setEditingIngredient(null);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Nombre del ingrediente"
            className="border rounded-md p-2"
            value={newIngredient.name}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, name: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Costo (Bs)"
            className="border rounded-md p-2"
            value={newIngredient.cost}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, cost: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Número de porciones"
            className="border rounded-md p-2"
            value={newIngredient.portions}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, portions: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Agregar Ingrediente
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo (Bs)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Porciones
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo/Porción
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === ingredient.id ? (
                    <input
                      type="text"
                      className="border rounded p-1 w-full"
                      value={editingIngredient.name}
                      onChange={(e) =>
                        setEditingIngredient({
                          ...editingIngredient,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    ingredient.name
                  )}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {editingId === ingredient.id ? (
                    <input
                      type="number"
                      className="border rounded p-1 w-24"
                      value={editingIngredient.cost}
                      onChange={(e) =>
                        setEditingIngredient({
                          ...editingIngredient,
                          cost: e.target.value,
                        })
                      }
                    />
                  ) : (
                    ingredient.cost
                  )}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {editingId === ingredient.id ? (
                    <input
                      type="number"
                      className="border rounded p-1 w-24"
                      value={editingIngredient.portions}
                      onChange={(e) =>
                        setEditingIngredient({
                          ...editingIngredient,
                          portions: e.target.value,
                        })
                      }
                    />
                  ) : (
                    ingredient.portions
                  )}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {ingredient.costPerPortion?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {editingId === ingredient.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(ingredient.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          modificar
                          {/* <Check className="w-5 h-5" /> */}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          X{/* <X className="w-5 h-5" /> */}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(ingredient)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {/* <Pencil className="w-5 h-5" /> */}
                          mod
                        </button>
                        <button
                          onClick={() => deleteIngredient(ingredient.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          del
                          {/* <Trash2 className="w-5 h-5" /> */}
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngredientsTab;
// // components/DishesTab.jsx
// const DishesTab = ({ dishes, ingredients, addDish }) => {
//   const [newDish, setNewDish] = useState({
//     name: "",
//     price: "",
//     ingredients: [],
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addDish(newDish);
//     setNewDish({ name: "", price: "", ingredients: [] });
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//         {/* Formulario para agregar platos */}
//       </form>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Nombre
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Costo
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Precio
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Ganancia
//               </th>
//               <th className="px-6 py-3"></th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {dishes.map((dish) => (
//               <tr key={dish.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{dish.name}</td>
//                 <td className="px-6 py-4 text-right whitespace-nowrap">
//                   {calculateDishCost(dish, ingredients).toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4 text-right whitespace-nowrap">
//                   {dish.price}
//                 </td>
//                 <td className="px-6 py-4 text-right whitespace-nowrap">
//                   {(dish.price - calculateDishCost(dish, ingredients)).toFixed(
//                     2
//                   )}
//                 </td>
//                 <td className="px-6 py-4 text-right whitespace-nowrap">
//                   <button
//                     onClick={() => registerSale(dish)}
//                     className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                   >
//                     Vender
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // components/SalesTab.jsx
// const SalesTab = ({ sales }) => {
//   const totalSales = sales.reduce((sum, sale) => sum + sale.price, 0);
//   const totalCosts = sales.reduce((sum, sale) => sum + sale.cost, 0);
//   const totalProfit = totalSales - totalCosts;

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-blue-50 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-blue-800">Total Ventas</h3>
//           <p className="text-2xl font-bold text-blue-900">
//             Bs {totalSales.toFixed(2)}
//           </p>
//         </div>
//         <div className="bg-red-50 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-red-800">Total Costos</h3>
//           <p className="text-2xl font-bold text-red-900">
//             Bs {totalCosts.toFixed(2)}
//           </p>
//         </div>
//         <div className="bg-green-50 p-4 rounded-lg"></div>
//         // components/SalesTab.jsx (continuación)
//         <div className="bg-green-50 p-4 rounded-lg">
//           <h3 className="text-lg font-semibold text-green-800">
//             Ganancia Total
//           </h3>
//           <p className="text-2xl font-bold text-green-900">
//             Bs {totalProfit.toFixed(2)}
//           </p>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Hora
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Plato
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Costo
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Precio
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Ganancia
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {sales.map((sale) => (
//               <tr key={sale.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {sale.timestamp.toLocaleTimeString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">{sale.dishName}</td>
//                 <td className="px-6 py-4 text-right whitespace-nowrap">
//                   {sale.cost.toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4 text-right whitespace-nowrap">
//                   {sale.price.toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4 text-right whitespace-nowrap">
//                   {(sale.price - sale.cost).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Funciones útiles
// const calculateDishCost = (dish, ingredients) => {
//   return dish.ingredients.reduce((total, ing) => {
//     const ingredient = ingredients.find((i) => i.id === ing.ingredientId);
//     return total + (ingredient?.costPerPortion || 0) * ing.portions;
//   }, 0);
// };

// // components/DishForm.jsx
// const DishForm = ({ ingredients, onSubmit }) => {
//   const [dish, setDish] = useState({
//     name: "",
//     price: "",
//     ingredients: [],
//   });
//   const [selectedIngredient, setSelectedIngredient] = useState({
//     ingredientId: "",
//     portions: "",
//   });

//   const addIngredientToDish = () => {
//     if (selectedIngredient.ingredientId && selectedIngredient.portions) {
//       setDish((prev) => ({
//         ...prev,
//         ingredients: [...prev.ingredients, { ...selectedIngredient }],
//       }));
//       setSelectedIngredient({ ingredientId: "", portions: "" });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(dish);
//     setDish({ name: "", price: "", ingredients: [] });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Nombre del plato"
//           className="border rounded-md p-2"
//           value={dish.name}
//           onChange={(e) => setDish({ ...dish, name: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Precio (Bs)"
//           className="border rounded-md p-2"
//           value={dish.price}
//           onChange={(e) => setDish({ ...dish, price: e.target.value })}
//           required
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <select
//           className="border rounded-md p-2"
//           value={selectedIngredient.ingredientId}
//           onChange={(e) =>
//             setSelectedIngredient({
//               ...selectedIngredient,
//               ingredientId: e.target.value,
//             })
//           }
//         >
//           <option value="">Seleccionar ingrediente</option>
//           {ingredients.map((ing) => (
//             <option key={ing.id} value={ing.id}>
//               {ing.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           placeholder="Cantidad de porciones"
//           className="border rounded-md p-2"
//           value={selectedIngredient.portions}
//           onChange={(e) =>
//             setSelectedIngredient({
//               ...selectedIngredient,
//               portions: e.target.value,
//             })
//           }
//         />
//         <button
//           type="button"
//           onClick={addIngredientToDish}
//           className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//         >
//           Agregar Ingrediente
//         </button>
//       </div>

//       {dish.ingredients.length > 0 && (
//         <div className="mt-4">
//           <h4 className="font-medium mb-2">Ingredientes agregados:</h4>
//           <ul className="space-y-2">
//             {dish.ingredients.map((ing, index) => {
//               const ingredient = ingredients.find(
//                 (i) => i.id === ing.ingredientId
//               );
//               return (
//                 <li
//                   key={index}
//                   className="flex justify-between items-center bg-gray-50 p-2 rounded"
//                 >
//                   <span>
//                     {ingredient?.name} - {ing.portions} porciones
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setDish((prev) => ({
//                         ...prev,
//                         ingredients: prev.ingredients.filter(
//                           (_, i) => i !== index
//                         ),
//                       }))
//                     }
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Eliminar
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}

//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//       >
//         Guardar Plato
//       </button>
//     </form>
//   );
// };

// Hooks personalizados para Firebase
const useFirebaseCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading };
};
