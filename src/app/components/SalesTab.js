import React, { useState, useMemo } from "react";
// import { AlertDialog, AlertDialogAction } from "@/components/ui/alert-dialog";

const SalesTab = ({ sales, dishes, registerSale }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filtrar ventas por fecha seleccionada
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const saleDate = new Date(sale.timestamp);
      return saleDate.toISOString().split("T")[0] === selectedDate;
    });
  }, [sales, selectedDate]);

  // Calcular totales para las ventas filtradas
  const totals = useMemo(() => {
    return filteredSales.reduce(
      (acc, sale) => ({
        sales: acc.sales + sale.price,
        costs: acc.costs + sale.cost,
        profit: acc.profit + (sale.price - sale.cost),
      }),
      { sales: 0, costs: 0, profit: 0 }
    );
  }, [filteredSales]);

  // Función para manejar la venta
  const handleSale = async () => {
    if (!selectedDish) return;

    setLoading(true);
    try {
      await registerSale({
        name: selectedDish.name,
        price: selectedDish.price * quantity,
        cost: selectedDish.totalCost * quantity,
        quantity: quantity,
      });
      setShowSaleModal(false);
      setSelectedDish(null);
      setQuantity(1);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Controles superiores */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="w-full sm:w-auto">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seleccionar fecha:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <button
          onClick={() => setShowSaleModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto"
        >
          Nueva Venta
        </button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">
            Ventas del día
          </h3>
          <p className="text-2xl font-bold text-blue-900">
            Bs {totals.sales.toFixed(2)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">Costos del día</h3>
          <p className="text-2xl font-bold text-red-900">
            Bs {totals.costs.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">
            Ganancia del día
          </h3>
          <p className="text-2xl font-bold text-green-900">
            Bs {totals.profit.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Tabla de ventas */}
      <div className="overflow-x-auto">
        {filteredSales.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plato
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Costo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ganancia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(sale.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{sale.name}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {sale.quantity}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {sale.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {sale.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    {(sale.price - sale.cost).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No hay ventas registradas para esta fecha
          </div>
        )}
      </div>

      {/* Modal de Nueva Venta */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Registrar Nueva Venta</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seleccionar Plato
                </label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={selectedDish ? selectedDish.id : ""}
                  onChange={(e) =>
                    setSelectedDish(dishes.find((d) => d.id === e.target.value))
                  }
                >
                  <option value="">Seleccione un plato</option>
                  {dishes.map((dish) => (
                    <option key={dish.id} value={dish.id}>
                      {dish.name} - Bs {dish.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="border rounded-md p-2 w-full"
                />
              </div>

              {selectedDish && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">
                    Total: Bs {(selectedDish.price * quantity).toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSaleModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSale}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                disabled={!selectedDish || loading}
              >
                {loading ? "Registrando..." : "Registrar Venta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesTab;
