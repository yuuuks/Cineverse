const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const moviesRoutes = require('./routes/movies');
const categoriesRoutes = require('./routes/categories');
const heroRoutes = require('./routes/hero');


app.get('/api', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API Cineverse!',
    endpoints: {
      movies: '/api/movies',
      featured: '/api/movies/featured',
      categories: '/api/categories'
    }
  });
});

// Routes API
app.use('/api/movies', moviesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/hero', heroRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée'
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    error: 'Erreur interne du serveur'
  });
});

app.listen(PORT, () => {
  console.log(` Serveur démarré sur le port ${PORT}`);
  console.log(`API disponible sur http://localhost:${PORT}/api`);
});

module.exports = app;