import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('movies');
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [moviesResponse, categoriesResponse] = await Promise.all([
        ApiService.getAllMovies(),
        ApiService.getAllCategories()
      ]);

      if (moviesResponse.success) {
        setMovies(moviesResponse.data);
      }
      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredMovies = movies.filter(m => m.is_featured);
  const regularMovies = movies.filter(m => !m.is_featured);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-black">🎬 Admin Panel</h1>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-sm"
              >
                ← Retour au site
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-400">{movies.length} films</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-zinc-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('movies')}
              className={`px-4 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'movies'
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Tous les films
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'featured'
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Films en vedette (Hero)
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-4 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'trending'
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Top Tendance
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'categories'
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Catégories
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6 flex items-center justify-between">
              <input
                type="text"
                placeholder="🔍 Rechercher un film..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600 w-96"
              />
              <button
                onClick={() => navigate('/admin/add-movie')}
                className="px-6 py-3 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un film
              </button>
            </div>

            {/* All Movies Tab */}
            {activeTab === 'movies' && (
              <MoviesTab movies={filteredMovies} onReload={loadData} navigate={navigate} />
            )}

            {/* Featured Movies Tab (Hero Section) */}
            {activeTab === 'featured' && (
              <FeaturedTab movies={featuredMovies} allMovies={movies} onReload={loadData} navigate={navigate} />
            )}

            {/* Trending Tab */}
            {activeTab === 'trending' && (
              <TrendingTab movies={movies} onReload={loadData} navigate={navigate} />
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <CategoriesTab categories={categories} onReload={loadData} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Composant pour l'onglet "Tous les films"
function MoviesTab({ movies, onReload, navigate }) {
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer "${title}" ?`)) return;

    try {
      await ApiService.deleteMovie(id);
      alert('Film supprimé avec succès');
      onReload();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const toggleFeatured = async (movie) => {
    try {
      await ApiService.updateMovie(movie.id, {
        ...movie,
        is_featured: !movie.is_featured
      });
      onReload();
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="grid gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-zinc-900 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all"
        >
          <div className="flex items-center gap-4">
            {/* Poster */}
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-20 h-28 rounded-lg object-cover"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <span>{movie.year}</span>
                <span>•</span>
                <span>⭐ {movie.rating}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                {movie.is_featured && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs font-bold">
                      EN VEDETTE
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleFeatured(movie)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  movie.is_featured
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                title={movie.is_featured ? 'Retirer de la vedette' : 'Mettre en vedette'}
              >
                ⭐
              </button>
              <button
                onClick={() => navigate(`/admin/edit-movie/${movie.id}`)}
                className="px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(movie.id, movie.title)}
                className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}

      {movies.length === 0 && (
        <div className="text-center py-20 text-zinc-400">
          <p className="text-xl">Aucun film trouvé</p>
        </div>
      )}
    </div>
  );
}

// Composant pour l'onglet "Films en vedette" (Hero)
function FeaturedTab({ movies, allMovies, onReload, navigate }) {
  return (
    <div>
      <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
        <p className="text-blue-200">
          💡 <strong>Section Hero :</strong> Les films marqués comme "en vedette" apparaissent dans le carousel Hero de la page d'accueil.
        </p>
      </div>

      <MoviesTab movies={movies} onReload={onReload} navigate={navigate} />

      {movies.length === 0 && (
        <div className="text-center py-10 text-zinc-400">
          <p>Aucun film en vedette. Marquez des films avec ⭐ pour les afficher dans Hero.</p>
        </div>
      )}
    </div>
  );
}

// Composant pour l'onglet "Top Tendance"
function TrendingTab({ movies, onReload, navigate }) {
  // Les 10 films les mieux notés
  const trendingMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  return (
    <div>
      <div className="mb-6 p-4 bg-purple-600/20 border border-purple-600/30 rounded-lg">
        <p className="text-purple-200">
          💡 <strong>Section Top Tendance :</strong> Affiche automatiquement les 10 films les mieux notés.
        </p>
      </div>

      <div className="grid gap-4">
        {trendingMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="bg-zinc-900 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="text-4xl font-black text-zinc-700">
                #{index + 1}
              </div>

              {/* Poster */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-20 h-28 rounded-lg object-cover"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
                <div className="flex items-center gap-4 text-sm text-zinc-400">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span className="text-yellow-400 font-bold">⭐ {movie.rating}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => navigate(`/admin/edit-movie/${movie.id}`)}
                className="px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Composant pour l'onglet "Catégories"
function CategoriesTab({ categories, onReload }) {
  return (
    <div className="grid gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-zinc-900 p-6 rounded-xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <div className={`h-1 w-24 bg-gradient-to-r ${category.color} rounded-full mt-2`}></div>
            </div>
            <span className="text-zinc-400">
              {category.movies?.length || 0} films
            </span>
          </div>

          {/* Aperçu des films */}
          {category.movies && category.movies.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {category.movies.slice(0, 5).map((movie) => (
                <img
                  key={movie.id}
                  src={movie.poster}
                  alt={movie.title}
                  className="w-24 h-36 rounded-lg object-cover flex-shrink-0"
                  title={movie.title}
                />
              ))}
              {category.movies.length > 5 && (
                <div className="w-24 h-36 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 flex-shrink-0">
                  +{category.movies.length - 5}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}