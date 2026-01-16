import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedMovies from '../components/FeaturedMovies';
import CategorySection from '../components/CategorySection';
import ApiService from '../services/api';

export default function HomePage() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger les films en vedette et les catégories en parallèle
      const [featuredResponse, categoriesResponse] = await Promise.all([
        ApiService.getFeaturedMovies(),
        ApiService.getAllCategories()
      ]);

      if (featuredResponse.success) {
        setFeaturedMovies(featuredResponse.data);
      }

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data);
      }

      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError('Impossible de charger les films. Veuillez réessayer.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-white text-xl">Chargement des films...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-white text-xl mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Hero featuredMovie={featuredMovies[0]} />
      <div className="min-h-screen bg-zinc-950 text-white">
        <FeaturedMovies movies={featuredMovies} />
        <CategorySection categories={categories} />
      </div>
    </>
  );
}