import React, { useState } from "react";
// import { Pencil, Trash2, X, Check } from "lucide-react";

const DishesTab = ({
  dishes,
  ingredients,
  addDish,
  updateDish,
  deleteDish,
}) => {
  const [newDish, setNewDish] = useState({
    name: "",
    ingredients: [],
    price: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingDish, setEditingDish] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const totalCost = calculateTotalCost(newDish.ingredients);
      await addDish({
        ...newDish,
        totalCost,
        price: parseFloat(newDish.price),
      });
      setNewDish({ name: "", ingredients: [], price: "" });
    } catch (error) {
      setError("Error al agregar plato: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = (dishIngredients) => {
    return dishIngredients.reduce(
      (total, ing) => total + ing.costPerPortion,
      0
    );
  };

  const addIngredientToDish = (dish, setDish) => {
    if (!selectedIngredient) return;

    const ingredient = ingredients.find((i) => i.id === selectedIngredient);
    if (!ingredient) return;

    setDish({
      ...dish,
      ingredients: [...dish.ingredients, ingredient],
    });
    setSelectedIngredient("");
    console.log(ingredients);
  };

  const removeIngredientFromDish = (ingredientId, dish, setDish) => {
    setDish({
      ...dish,
      ingredients: dish.ingredients.filter((i) => i.id !== ingredientId),
    });
  };

  // Iniciar edición
  const startEditing = (dish) => {
    setEditingId(dish.id);
    setEditingDish({ ...dish });
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditingId(null);
    setEditingDish(null);
    setError(null);
  };

  // Guardar cambios
  const handleSaveEdit = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const totalCost = calculateTotalCost(editingDish.ingredients);
      await updateDish(id, {
        ...editingDish,
        totalCost,
        price: parseFloat(editingDish.price),
      });
      setEditingId(null);
      setEditingDish(null);
    } catch (error) {
      setError("Error al actualizar plato: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar plato
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este plato?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteDish(id);
    } catch (error) {
      setError("Error al eliminar plato: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            placeholder="Nombre del plato"
            className="border rounded-md p-2"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            required
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Precio (Bs)"
            className="border rounded-md p-2"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
            required
            disabled={loading}
          />
          <div className="flex gap-2">
            <select
              className="border rounded-md p-2 flex-1"
              value={selectedIngredient}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              disabled={loading}
            >
              <option value="">Seleccionar ingrediente</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => addIngredientToDish(newDish, setNewDish)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
              disabled={!selectedIngredient || loading}
            >
              +
            </button>
          </div>
        </div>

        {/* Lista de ingredientes seleccionados */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Ingredientes seleccionados:</h3>
          <ul className="space-y-2">
            {newDish.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span>{ingredient.name}</span>
                <button
                  type="button"
                  onClick={() =>
                    removeIngredientFromDish(ingredient.id, newDish, setNewDish)
                  }
                  className="text-red-500 hover:text-red-700"
                  disabled={loading}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Plato"}
        </button>
      </form>

      {/* Tabla de platos */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio (Bs)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ingredientes
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo Total
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dishes.map((dish) => (
              <tr key={dish.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === dish.id ? (
                    <input
                      type="text"
                      className="border rounded p-1 w-full"
                      value={editingDish.name}
                      onChange={(e) =>
                        setEditingDish({
                          ...editingDish,
                          name: e.target.value,
                        })
                      }
                      disabled={loading}
                    />
                  ) : (
                    dish.name
                  )}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {editingId === dish.id ? (
                    <input
                      type="number"
                      className="border rounded p-1 w-24"
                      value={editingDish.price}
                      onChange={(e) =>
                        setEditingDish({
                          ...editingDish,
                          price: e.target.value,
                        })
                      }
                      disabled={loading}
                    />
                  ) : (
                    dish.price
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === dish.id ? (
                    <div>
                      <select
                        className="border rounded-md p-1 mb-2"
                        value={selectedIngredient}
                        onChange={(e) => setSelectedIngredient(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">Agregar ingrediente</option>
                        {ingredients.map((ingredient) => (
                          <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          addIngredientToDish(editingDish, setEditingDish)
                        }
                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
                        disabled={!selectedIngredient || loading}
                      >
                        +
                      </button>
                      <ul className="space-y-1 mt-2">
                        {editingDish.ingredients.map((ingredient) => (
                          <li
                            key={ingredient.id}
                            className="flex justify-between items-center"
                          >
                            <span>{ingredient.name}</span>
                            <button
                              type="button"
                              onClick={() =>
                                removeIngredientFromDish(
                                  ingredient.id,
                                  editingDish,
                                  setEditingDish
                                )
                              }
                              className="text-red-500 hover:text-red-700"
                              disabled={loading}
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      {dish.ingredients.map((ingredient) => (
                        <table className="table table-sm">
                          <tr>
                            <td> {ingredient.name} </td>
                            <td>{ingredient.costPerPortion} </td>
                          </tr>
                        </table>
                        // <li className="text-sm" key={ingredient.id}>
                        //   {ingredient.name} - {ingredient.costPerPortion}
                        // </li>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {dish.totalCost?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {editingId === dish.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(dish.id)}
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                          disabled={loading}
                        >
                          MODIFICAR
                          {/* <Check className="w-5 h-5" /> */}
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          disabled={loading}
                        >
                          X{/* <X className="w-5 h-5" /> */}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(dish)}
                          className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                          disabled={loading}
                        >
                          MOD
                          {/* <Pencil className="w-5 h-5" /> */}
                        </button>
                        <button
                          onClick={() => handleDelete(dish.id)}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          disabled={loading}
                        >
                          DEL
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

export default DishesTab;
