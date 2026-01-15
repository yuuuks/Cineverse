const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Ajoutez axios dans le backend
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/api/pokemon/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Pokémon non trouvé' });
  }
});
app.get('/api/pokemon', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});