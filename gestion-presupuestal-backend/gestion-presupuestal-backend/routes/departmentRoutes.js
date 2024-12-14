const express = require('express');
const { createDepartment, getDepartments, updateBudget, deleteDepartment } = require('../controllers/departmentController');
const router = express.Router();

// Crear un nuevo departamento
router.post('/create', createDepartment);

// Obtener todos los departamentos
router.get('/', getDepartments);

// Actualizar el presupuesto de un departamento
router.put('/:departmentId/update-budget', updateBudget);

// Eliminar un departamento (opcional)
router.delete('/:id', deleteDepartment);

module.exports = router;
