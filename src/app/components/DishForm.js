import React, { useState } from "react";

// components/DishForm.jsx
const DishForm = ({ ingredients, onSubmit }) => {
  const [dish, setDish] = useState({
    name: "",
    price: "",
    ingredients: [],
  });
  const [selectedIngredient, setSelectedIngredient] = useState({
    ingredientId: "",
    portions: "",
  });

  const addIngredientToDish = () => {
    if (selectedIngredient.ingredientId && selectedIngredient.portions) {
      setDish((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, { ...selectedIngredient }],
      }));
      setSelectedIngredient({ ingredientId: "", portions: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dish);
    setDish({ name: "", price: "", ingredients: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre del plato"
          className="border rounded-md p-2"
          value={dish.name}
          onChange={(e) => setDish({ ...dish, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio (Bs)"
          className="border rounded-md p-2"
          value={dish.price}
          onChange={(e) => setDish({ ...dish, price: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="border rounded-md p-2"
          value={selectedIngredient.ingredientId}
          onChange={(e) =>
            setSelectedIngredient({
              ...selectedIngredient,
              ingredientId: e.target.value,
            })
          }
        >
          <option value="">Seleccionar ingrediente</option>
          {ingredients.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Cantidad de porciones"
          className="border rounded-md p-2"
          value={selectedIngredient.portions}
          onChange={(e) =>
            setSelectedIngredient({
              ...selectedIngredient,
              portions: e.target.value,
            })
          }
        />
        <button
          type="button"
          onClick={addIngredientToDish}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Agregar Ingrediente
        </button>
      </div>

      {dish.ingredients.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Ingredientes agregados:</h4>
          <ul className="space-y-2">
            {dish.ingredients.map((ing, index) => {
              const ingredient = ingredients.find(
                (i) => i.id === ing.ingredientId
              );
              return (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded"
                >
                  <span>
                    {ingredient?.name} - {ing.portions} porciones
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setDish((prev) => ({
                        ...prev,
                        ingredients: prev.ingredients.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Guardar Plato
      </button>
    </form>
  );
};

export default DishForm;
