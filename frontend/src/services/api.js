// Service pour communiquer avec l'API backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  // Fonction helper pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la requête');
      }

      return data;
    } catch (error) {
      console.error('Erreur API:', error);
      throw error;
    }
  }

  // ==================== FILMS ====================
  
  // Récupérer tous les films
  async getAllMovies() {
    return this.request('/movies');
  }

  // Récupérer les films en vedette
  async getFeaturedMovies() {
    return this.request('/movies/featured');
  }

  // Récupérer un film par ID
  async getMovieById(id) {
    return this.request(`/movies/${id}`);
  }

  // Créer un nouveau film
  async createMovie(movieData) {
    return this.request('/movies', {
      method: 'POST',
      body: JSON.stringify(movieData),
    });
  }

  // Mettre à jour un film
  async updateMovie(id, movieData) {
    return this.request(`/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(movieData),
    });
  }

  // Supprimer un film
  async deleteMovie(id) {
    return this.request(`/movies/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== CATÉGORIES ====================
  
  // Récupérer toutes les catégories avec leurs films
  async getAllCategories() {
    return this.request('/categories');
  }

  // Récupérer une catégorie par ID
  async getCategoryById(id) {
    return this.request(`/categories/${id}`);
  }

  // Créer une nouvelle catégorie
  async createCategory(categoryData) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  // Récupérer le film Hero
  async getHeroMovie() {
    return this.request('/hero');
  }

  // Définir un nouveau film Hero
  async setHeroMovie(movieId) {
    return this.request('/hero', {
      method: 'POST',
      body: JSON.stringify({ movie_id: movieId }),
    });
  }

  // Réinitialiser le Hero (revenir au défaut)
  async resetHeroMovie() {
    return this.request('/hero', {
      method: 'DELETE',
    });
  }
}

export default new ApiService();