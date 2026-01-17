import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/api';

export default function ManageHero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Simuler le stockage de la config Hero (dans un vrai projet, ça serait dans la BDD)
  const [heroConfig, setHeroConfig] = useState(() => {
    // Récupérer depuis localStorage ou utiliser un film par défaut
    const saved = localStorage.getItem('heroMovieConfig');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getAllMovies();
      
      if (response.success) {
        setMovies(response.data);
        
        // Si on a une config Hero sauvegardée, trouver le film correspondant
        if (heroConfig) {
          const movie = response.data.find(m => m.id === heroConfig.id);
          setSelectedMovie(movie || null);
        }
      }
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors du chargement des films');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSaveHero = () => {
    if (!selectedMovie) {
      alert('Veuillez sélectionner un film');
      return;
    }

    // Vérifier que le film a un youtube_id
    if (!selectedMovie.youtube_id) {
      alert('Ce film n\'a pas de bande-annonce YouTube configurée. Ajoutez-en une d\'abord.');
      return;
    }

    setSaving(true);

    // Créer la config Hero
    const config = {
      id: selectedMovie.id,
      title: selectedMovie.title,
      year: selectedMovie.year,
      rating: selectedMovie.rating,
      duration: selectedMovie.duration,
      genres: selectedMovie.genres || [selectedMovie.genre],
      description: selectedMovie.description,
      trailerYoutubeId: selectedMovie.youtube_id,
      posterUrl: selectedMovie.poster
    };

    // Sauvegarder dans localStorage (dans un vrai projet, ça serait dans la BDD)
    localStorage.setItem('heroMovieConfig', JSON.stringify(config));
    setHeroConfig(config);

    setTimeout(() => {
      setSaving(false);
      alert('✅ Film Hero mis à jour avec succès ! Rechargez la page d\'accueil pour voir les changements.');
    }, 500);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-white text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
              >
                ← Retour
              </button>
              <h1 className="text-2xl font-black">🎬 Gérer le Film Hero</h1>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              👁️ Voir la page d'accueil
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-xl">
          <h2 className="text-xl font-bold mb-2">💡 Qu'est-ce que le Film Hero ?</h2>
          <p className="text-zinc-300 mb-4">
            Le film Hero est le film mis en avant en plein écran avec la vidéo de fond sur votre page d'accueil. 
            C'est la première chose que vos visiteurs verront !
          </p>
          <div className="flex items-center gap-2 text-sm text-yellow-300">
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
            
            {/* Recherche */}
            <input
              type="text"
              placeholder="🔍 Rechercher un film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600"
            />

            {/* Liste des films */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
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
                {/* Image de couverture */}
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

                {/* Infos */}
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
                        <p className="text-sm text-yellow-300">
                          ⚠️ Ce film n'a pas de bande-annonce YouTube. Ajoutez-en une en modifiant le film.
                        </p>
                        <button
                          onClick={() => navigate(`/admin/edit-movie/${selectedMovie.id}`)}
                          className="mt-3 px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
                        >
                          Ajouter une bande-annonce
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bouton de sauvegarde */}
                  <button
                    onClick={handleSaveHero}
                    disabled={saving || !selectedMovie.youtube_id}
                    className="w-full px-6 py-4 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Sauvegarde...
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
              <div className="h-[600px] bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center">
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

        {/* Film Hero actuel */}
        {heroConfig && (
          <div className="mt-8 p-6 bg-green-600/20 border border-green-600/30 rounded-xl">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Film Hero Actuel
            </h3>
            <div className="flex items-center gap-4">
              <img
                src={heroConfig.posterUrl}
                alt={heroConfig.title}
                className="w-20 h-30 rounded-lg object-cover"
              />
              <div>
                <p className="font-bold text-lg">{heroConfig.title}</p>
                <p className="text-zinc-300">{heroConfig.year} • ⭐ {heroConfig.rating}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}