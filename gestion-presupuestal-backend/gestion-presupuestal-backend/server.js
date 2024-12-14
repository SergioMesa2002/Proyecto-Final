const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const budgetRoutes = require('./routes/budgetRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const activityRoutes = require('./routes/activityRoutes');
dotenv.config(); // Cargar las variables de entorno

const app = express(); // Inicializar la aplicación Express
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.error('Database connection error:', error));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/activities', activityRoutes);
// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
