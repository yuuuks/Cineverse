const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  try {
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (categoriesError) throw categoriesError;

    const categoriesWithMovies = await Promise.all(
      categories.map(async (category) => {
        const { data: movies, error: moviesError } = await supabase
          .from('movies')
          .select('*')
          .contains('genres', [category.name])
          .limit(10);

        if (moviesError) {
          console.error(`Erreur pour la catégorie ${category.name}:`, moviesError);
          return { ...category, movies: [] };
        }

        return {
          ...category,
          movies: movies || []
        };
      })
    );

    res.json({
      success: true,
      data: categoriesWithMovies
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: category, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (categoryError) throw categoryError;

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Catégorie non trouvée'
      });
    }

    const { data: movies, error: moviesError } = await supabase
      .from('movies')
      .select('*')
      .contains('genres', [category.name]);

    if (moviesError) throw moviesError;

    res.json({
      success: true,
      data: {
        ...category,
        movies: movies || []
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = req.body;
    
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data[0]
    });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;