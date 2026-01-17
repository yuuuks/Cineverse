const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des films en vedette:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Film non trouvé'
      });
    }

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du film:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const movieData = req.body;
    
    const { data, error } = await supabase
      .from('movies')
      .insert([movieData])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: data[0]
    });
  } catch (error) {
    console.error('Erreur lors de la création du film:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movieData = req.body;
    
    const { data, error } = await supabase
      .from('movies')
      .update(movieData)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Film non trouvé'
      });
    }

    res.json({
      success: true,
      data: data[0]
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('movies')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Film supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du film:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;