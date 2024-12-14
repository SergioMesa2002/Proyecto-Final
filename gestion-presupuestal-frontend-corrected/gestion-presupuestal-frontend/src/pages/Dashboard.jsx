import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    // Estados para departamentos
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [departmentBudget, setDepartmentBudget] = useState('');

    // Estados para actividades
    const [activityName, setActivityName] = useState('');
    const [activityDepartment, setActivityDepartment] = useState('');
    const [activityBudget, setActivityBudget] = useState('');
    const [activityDescription, setActivityDescription] = useState('');

    // Cargar departamentos existentes
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error al cargar los departamentos:', error);
        }
    };

    // Crear un nuevo departamento
    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/departments/create', {
                name: departmentName,
                totalBudget: parseFloat(departmentBudget),
            });
            alert('Departamento creado con éxito');
            setDepartmentName('');
            setDepartmentBudget('');
            fetchDepartments(); // Actualizar la lista de departamentos
        } catch (error) {
            console.error('Error al crear el departamento:', error);
            alert('Error al crear el departamento');
        }
    };

    // Crear una nueva actividad
    const handleCreateActivity = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/activities/create', {
                name: activityName,
                departmentId: activityDepartment,
                budget: parseFloat(activityBudget),
                description: activityDescription,
            });
            alert('Actividad creada con éxito');
            setActivityName('');
            setActivityDepartment('');
            setActivityBudget('');
            setActivityDescription('');
        } catch (error) {
            console.error('Error al crear la actividad:', error);
            alert('Error al crear la actividad');
        }
    };

    return (
        <div>
            <h1>Gestión de Rubros Presupuestales</h1>

            {/* Formulario para crear departamentos */}
            <section>
                <h2>Crear Departamento</h2>
                <form onSubmit={handleCreateDepartment}>
                    <div>
                        <label>Nombre del Departamento:</label>
                        <input
                            type="text"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Presupuesto Total:</label>
                        <input
                            type="number"
                            value={departmentBudget}
                            onChange={(e) => setDepartmentBudget(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Crear Departamento</button>
                </form>
            </section>

            {/* Formulario para crear actividades */}
            <section>
                <h2>Crear Actividad</h2>
                <form onSubmit={handleCreateActivity}>
                    <div>
                        <label>Nombre de la Actividad:</label>
                        <input
                            type="text"
                            value={activityName}
                            onChange={(e) => setActivityName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Departamento:</label>
                        <select
                            value={activityDepartment}
                            onChange={(e) => setActivityDepartment(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un departamento</option>
                            {departments.map((department) => (
                                <option key={department._id} value={department._id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Presupuesto Asignado:</label>
                        <input
                            type="number"
                            value={activityBudget}
                            onChange={(e) => setActivityBudget(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Descripción de la Actividad:</label>
                        <textarea
                            value={activityDescription}
                            onChange={(e) => setActivityDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit">Crear Actividad</button>
                </form>
            </section>

            {/* Listar departamentos */}
            <section>
                <h2>Departamentos Existentes</h2>
                <ul>
                    {departments.map((department) => (
                        <li key={department._id}>
                            <strong>{department.name}</strong> - Presupuesto Total: {department.totalBudget} - Presupuesto Disponible: {department.remainingBudget}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
