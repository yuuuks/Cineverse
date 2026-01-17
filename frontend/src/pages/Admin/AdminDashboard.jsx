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
              Films en tendance
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
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-4 py-4 font-semibold border-b-2 transition-all ${
                activeTab === 'hero'
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              🎬 Film Hero
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
            {activeTab !== 'hero' && (
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
            )}

            {/* All Movies Tab */}
            {activeTab === 'movies' && (
              <MoviesTab movies={filteredMovies} onReload={loadData} navigate={navigate} />
            )}

            {/* Featured Movies Tab */}
            {activeTab === 'featured' && (
              <FeaturedTab movies={featuredMovies} onReload={loadData} navigate={navigate} />
            )}

            {/* Trending Tab */}
            {activeTab === 'trending' && (
              <TrendingTab movies={movies} onReload={loadData} navigate={navigate} />
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <CategoriesTab categories={categories} onReload={loadData} />
            )}

            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <HeroTab movies={movies} onReload={loadData} navigate={navigate} />
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
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-20 h-28 rounded-lg object-cover"
            />

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

// Composant pour l'onglet "Films en vedette"
function FeaturedTab({ movies, onReload, navigate }) {
  return (
    <div>
      <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
        <p className="text-blue-200">
          💡 <strong>Section Tendance :</strong> Les films marqués comme "en vedette" apparaissent dans la section tendance de la page d'accueil.
        </p>
      </div>

      <MoviesTab movies={movies} onReload={onReload} navigate={navigate} />

      {movies.length === 0 && (
        <div className="text-center py-10 text-zinc-400">
          <p>Aucun film en vedette. Marquez des films avec ⭐ pour les afficher.</p>
        </div>
      )}
    </div>
  );
}

// Composant pour l'onglet "Top Tendance"
function TrendingTab({ movies, onReload, navigate }) {
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
              <div className="text-4xl font-black text-zinc-700">
                #{index + 1}
              </div>

              <img
                src={movie.poster}
                alt={movie.title}
                className="w-20 h-28 rounded-lg object-cover"
              />

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
function CategoriesTab({ categories }) {
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

// Composant pour l'onglet "Film Hero" - Version BDD
function HeroTab({ movies, onReload, navigate }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [heroConfig, setHeroConfig] = useState(null);

  useEffect(() => {
    loadHeroConfig();
  }, []);

  const loadHeroConfig = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getHeroMovie();
      
      if (response.success && response.data) {
        setHeroConfig(response.data);
        const movie = movies.find(m => m.id === response.data.id);
        setSelectedMovie(movie || null);
      }
    } catch (error) {
      console.error('Erreur chargement Hero:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSaveHero = async () => {
    if (!selectedMovie) {
      alert('Veuillez sélectionner un film');
      return;
    }

    if (!selectedMovie.youtube_id) {
      alert('Ce film n\'a pas de bande-annonce YouTube. Ajoutez-en une d\'abord.');
      return;
    }

    setSaving(true);

    try {
      const response = await ApiService.setHeroMovie(selectedMovie.id);

      if (response.success) {
        await loadHeroConfig();
        alert('✅ Film Hero mis à jour ! Rechargez la page d\'accueil pour voir les changements.');
      } else {
        alert('Erreur : ' + (response.error || 'Impossible de sauvegarder'));
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Info Banner */}
      <div className="mb-6 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-xl">
        <h2 className="text-xl font-bold mb-2">💡 Qu'est-ce que le Film Hero ?</h2>
        <p className="text-zinc-300 mb-4">
          Le film Hero est le film mis en avant en plein écran avec la vidéo de fond sur votre page d'accueil.
          C'est la première chose que vos visiteurs verront !
        </p>
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-green-300">✓ Stocké dans la base de données</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-2 text-yellow-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Le film doit avoir une bande-annonce YouTube configurée</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sélection du film */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Sélectionner un film</h2>

          <input
            type="text"
            placeholder="🔍 Rechercher un film..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600"
          />

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleSelectMovie(movie)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMovie?.id === movie.id
                    ? 'bg-red-600/20 border-red-600'
                    : 'bg-zinc-900 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-16 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>⭐ {movie.rating}</span>
                      {movie.youtube_id && (
                        <>
                          <span>•</span>
                          <span className="text-green-400">✓ Bande-annonce</span>
                        </>
                      )}
                    </div>
                    {!movie.youtube_id && (
                      <div className="mt-2 text-xs text-yellow-400">
                        ⚠️ Pas de bande-annonce YouTube
                      </div>
                    )}
                  </div>
                  {selectedMovie?.id === movie.id && (
                    <div className="text-red-600">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredMovies.length === 0 && (
              <div className="text-center py-12 text-zinc-400">
                <p>Aucun film trouvé</p>
              </div>
            )}
          </div>
        </div>

        {/* Aperçu */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Aperçu</h2>

          {selectedMovie ? (
            <div className="bg-zinc-900 rounded-xl border border-white/10 overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-zinc-800 to-zinc-900">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-3xl font-black mb-2">{selectedMovie.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-red-600 rounded text-sm font-bold">
                      {selectedMovie.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {selectedMovie.rating}
                    </span>
                    <span>{selectedMovie.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-400 mb-2">Description</h4>
                  <p className="text-zinc-300 leading-relaxed">
                    {selectedMovie.description || 'Pas de description disponible'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-zinc-400 mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedMovie.genres || [selectedMovie.genre]).map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-zinc-400 mb-2">Bande-annonce YouTube</h4>
                  {selectedMovie.youtube_id ? (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedMovie.youtube_id}`}
                        title="Aperçu"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
                      <p className="text-sm text-yellow-300 mb-3">
                        ⚠️ Ce film n'a pas de bande-annonce YouTube. Ajoutez-en une d'abord.
                      </p>
                      <button
                        onClick={() => navigate(`/admin/edit-movie/${selectedMovie.id}`)}
                        className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
                      >
                        Ajouter une bande-annonce
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSaveHero}
                  disabled={saving || !selectedMovie.youtube_id}
                  className="w-full px-6 py-4 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Sauvegarde dans la BDD...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Définir comme Film Hero
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[500px] bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center">
              <div className="text-center text-zinc-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <p className="text-lg">Sélectionnez un film pour voir l'aperçu</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}