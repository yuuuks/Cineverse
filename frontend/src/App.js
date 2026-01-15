import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pokemon/pikachu')
      .then(response => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>PokéDex Netflix Style</h1>
        {pokemon && (
          <div>
            <h2>{pokemon.name.toUpperCase()}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Poids: {pokemon.weight}</p>
            <p>Taille: {pokemon.height}</p>
            <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;