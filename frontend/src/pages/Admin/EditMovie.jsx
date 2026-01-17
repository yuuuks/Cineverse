import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../services/api';

export default function EditMovie() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [youtubeError, setYoutubeError] = useState(null);
  const [youtubeValidating, setYoutubeValidating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    duration: '',
    genre: '',
    genres: [],
    rating: 7.0,
    poster: '',
    description: '',
    youtube_id: '',
    is_featured: false
  });

  const availableGenres = [
    'Action',
    'Science-Fiction',
    'Thriller',
    'Comédie',
    'Romance',
    'Horreur',
    'Drame',
    'Aventure',
    'Fantastique',
    'Crime',
    'Animation'
  ];

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getMovieById(movieId);
      
      if (response.success) {
        setFormData({
          ...response.data,
          genres: response.data.genres || []
        });
      } else {
        alert('Film non trouvé');
        navigate('/admin');
      }
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors du chargement du film');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour extraire l'ID YouTube d'une URL
  const extractYoutubeId = (url) => {
    if (!url) return '';
    
    // Si c'est déjà juste un ID (pas d'URL), le retourner tel quel
    if (!url.includes('youtube.com') && !url.includes('youtu.be') && !url.includes('http')) {
      return url;
    }

    // Patterns possibles d'URLs YouTube
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Si aucun pattern ne correspond, retourner l'URL telle quelle
    return url;
  };

  // 🆕 Fonction pour vérifier si la vidéo YouTube existe
  const validateYoutubeVideo = async (videoId) => {
    if (!videoId) {
      setYoutubeError(null);
      return;
    }

    setYoutubeValidating(true);
    setYoutubeError(null);

    try {
      // Vérifier si la vidéo existe en tentant de charger l'iframe
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      
      if (!response.ok) {
        setYoutubeError('❌ Cette vidéo YouTube n\'existe pas ou est privée/supprimée');
      } else {
        setYoutubeError(null);
      }
    } catch (error) {
      setYoutubeError('⚠️ Impossible de vérifier la vidéo (vérifiez votre connexion)');
    } finally {
      setYoutubeValidating(false);
    }
  };

  // Debounce pour la validation YouTube
  useEffect(() => {
    if (!formData.youtube_id) {
      setYoutubeError(null);
      return;
    }

    const timer = setTimeout(() => {
      validateYoutubeVideo(formData.youtube_id);
    }, 1000); // Attendre 1 seconde après que l'utilisateur a fini de taper

    return () => clearTimeout(timer);
  }, [formData.youtube_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Si c'est le champ YouTube, extraire l'ID automatiquement
    if (name === 'youtube_id') {
      const extractedId = extractYoutubeId(value);
      setFormData(prev => ({
        ...prev,
        [name]: extractedId
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier s'il y a une erreur YouTube
    if (youtubeError) {
      alert('Veuillez corriger l\'erreur YouTube avant de sauvegarder');
      return;
    }

    setSaving(true);

    try {
      // Validation
      if (!formData.title || !formData.poster) {
        alert('Le titre et l\'affiche sont obligatoires');
        setSaving(false);
        return;
      }

      // Préparer les données
      const movieData = {
        ...formData,
        year: parseInt(formData.year),
        rating: parseFloat(formData.rating),
        genre: formData.genres[0] || formData.genre,
      };

      const response = await ApiService.updateMovie(movieId, movieData);

      if (response.success) {
        alert('Film modifié avec succès !');
        navigate('/admin');
      } else {
        alert('Erreur lors de la modification');
      }
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de la modification du film');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${formData.title}" ?`)) {
      return;
    }

    try {
      await ApiService.deleteMovie(movieId);
      alert('Film supprimé avec succès');
      navigate('/admin');
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
              >
                ← Retour
              </button>
              <h1 className="text-2xl font-black">Modifier : {formData.title}</h1>
            </div>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Titre du film *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600"
              required
            />
          </div>

          {/* Year and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Année</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600"
                min="1900"
                max="2100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Durée</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600"
                placeholder="Ex: 2h 46m"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Note (0-10)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600"
              min="0"
              max="10"
              step="0.1"
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    formData.genres.includes(genre)
                      ? 'bg-red-600 text-white'
                      : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Poster URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              URL de l'affiche *
            </label>
            <input
              type="url"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600"
              required
            />
            {formData.poster && (
              <div className="mt-4">
                <p className="text-sm text-zinc-400 mb-2">Aperçu :</p>
                <img
                  src={formData.poster}
                  alt="Aperçu"
                  className="w-48 h-72 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=Image+non+trouvée';
                  }}
                />
              </div>
            )}
          </div>

          {/* YouTube URL - 🆕 AVEC VALIDATION */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Lien YouTube de la bande-annonce
            </label>
            <input
              type="text"
              name="youtube_id"
              value={formData.youtube_id || ''}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-900 border rounded-lg focus:outline-none transition-all ${
                youtubeError 
                  ? 'border-red-500 focus:border-red-600' 
                  : 'border-white/10 focus:border-red-600'
              }`}
              placeholder="Collez le lien complet YouTube ici..."
            />
        
            {/* 🆕 Statut de validation */}
            {youtubeValidating && (
              <div className="mt-3 p-3 bg-blue-600/20 border border-blue-600/30 rounded-lg flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                <span className="text-sm text-blue-300">Vérification de la vidéo...</span>
              </div>
            )}

            {/* 🆕 Message d'erreur */}
            {youtubeError && !youtubeValidating && (
              <div className="mt-3 p-3 bg-red-600/20 border border-red-600/30 rounded-lg">
                <p className="text-sm text-red-300 font-semibold">{youtubeError}</p>
                <p className="text-xs text-red-400 mt-1">
                  Vérifiez que le lien est correct et que la vidéo est publique.
                </p>
              </div>
            )}

            {/* Aperçu YouTube */}
           {formData.youtube_id && !youtubeError && (
              <div className="mt-4">
                <p className="text-sm text-zinc-400 mb-2">Aperçu de la bande-annonce :</p>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${formData.youtube_id}`}
                    title="Aperçu YouTube"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setYoutubeError('❌ Impossible de charger la vidéo')}
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg focus:outline-none focus:border-red-600 h-32 resize-none"
              placeholder="Synopsis du film..."
            />
          </div>

          {/* Is Featured */}
          <div className="flex items-center gap-3 p-4 bg-zinc-900 rounded-lg border border-white/10">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="w-5 h-5 accent-red-600"
            />
            <label htmlFor="is_featured" className="font-semibold cursor-pointer">
              ⭐ Mettre en vedette
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={saving || youtubeValidating || youtubeError}
              className="flex-1 px-6 py-4 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Sauvegarde...' : '✓ Enregistrer les modifications'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-4 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-all"
            >
              Annuler
            </button>
          </div>

          {/* 🆕 Avertissement si erreur YouTube */}
          {youtubeError && (
            <div className="p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
              <p className="text-sm text-yellow-300">
                ⚠️ <strong>Attention :</strong> Le bouton de sauvegarde est désactivé tant que l'erreur YouTube n'est pas corrigée.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}