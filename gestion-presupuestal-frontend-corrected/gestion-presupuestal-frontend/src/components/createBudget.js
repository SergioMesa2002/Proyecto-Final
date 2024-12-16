import React, { useState } from 'react';
import { createBudget } from '../services/apiService';

const CreateBudget = () => {
  const [budgetData, setBudgetData] = useState({
    name: '',
    allocatedAmount: '',
    spentAmount: 0,
    alerts: false,
  });

  const handleChange = (e) => {
    setBudgetData({
      ...budgetData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setBudgetData({
      ...budgetData,
      alerts: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí llamas al servicio para crear el presupuesto
      const newBudget = await createBudget(budgetData);
      console.log('Nuevo presupuesto creado:', newBudget);
    } catch (error) {
      console.error('Error al crear el presupuesto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Nombre del Presupuesto:</label>
        <input
          type="text"
          name="name"
          value={budgetData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Monto Asignado:</label>
        <input
          type="number"
          name="allocatedAmount"
          value={budgetData.allocatedAmount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Monto Gastado:</label>
        <input
          type="number"
          name="spentAmount"
          value={budgetData.spentAmount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">¿Activar alertas?</label>
        <input
          type="checkbox"
          name="alerts"
          checked={budgetData.alerts}
          onChange={handleCheckboxChange}
          className="h-4 w-4"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Presupuesto
      </button>
    </form>
  );
};

export default CreateBudget;
