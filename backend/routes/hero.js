const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// GET /api/hero - Récupérer le film Hero actuel
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('hero_config')
      .select(`
        id,
        movie_id,
        is_active,
        created_at,
        movies (
          id,
          title,
          year,
          duration,
          rating,
          genre,
          genres,
          poster,
          description,
          youtube_id
        )
      `)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.json({
          success: true,
          data: null,
          message: 'Aucun film Hero configuré'
        });
      }
      throw error;
    }

    const heroMovie = data.movies ? {
      id: data.movies.id,
      title: data.movies.title,
      year: data.movies.year,
      rating: data.movies.rating,
      duration: data.movies.duration,
      genres: data.movies.genres || [data.movies.genre],
      description: data.movies.description,
      trailerYoutubeId: data.movies.youtube_id,
      posterUrl: data.movies.poster
    } : null;

    res.json({
      success: true,
      data: heroMovie
    });
  } catch (error) {
    console.error('Erreur Hero:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du film Hero'
    });
  }
});

// POST /api/hero - Définir un nouveau film Hero
router.post('/', async (req, res) => {
  try {
    const { movie_id } = req.body;

    if (!movie_id) {
      return res.status(400).json({
        success: false,
        error: 'movie_id est requis'
      });
    }

    // Vérifier que le film existe et a un youtube_id
    const { data: movie, error: movieError } = await supabase
      .from('movies')
      .select('id, youtube_id')
      .eq('id', movie_id)
      .single();

    if (movieError || !movie) {
      return res.status(404).json({
        success: false,
        error: 'Film non trouvé'
      });
    }

    if (!movie.youtube_id) {
      return res.status(400).json({
        success: false,
        error: 'Ce film n\'a pas de bande-annonce YouTube'
      });
    }

    // Désactiver toutes les configs existantes
    await supabase
      .from('hero_config')
      .update({ is_active: false })
      .eq('is_active', true);

    // Créer la nouvelle config
    const { data, error } = await supabase
      .from('hero_config')
      .insert({
        movie_id: movie_id,
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: data,
      message: 'Film Hero mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur Hero:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la mise à jour du film Hero'
    });
  }
});

module.exports = router;