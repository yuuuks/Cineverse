// Données d'exemple pour FeaturedMovies et CategorySection - VRAIS FILMS 2024-2025

export const featuredMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: 2024,
    duration: "2h 46m",
    genre: "Science-Fiction",
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    description: "Paul Atreides s'unit à Chani et aux Fremen pour mener la révolte contre ceux qui ont anéanti sa famille."
  },
  {
    id: 2,
    title: "Furiosa: A Mad Max Saga",
    year: 2024,
    duration: "2h 28m",
    genre: "Action",
    rating: 7.6,
    poster: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    description: "L'histoire de la jeune Furiosa, arrachée à sa famille et devenue l'impératrice guerrière que nous connaissons."
  },
  {
    id: 3,
    title: "Superman",
    year: 2025,
    duration: "2h 20m",
    genre: "Action",
    rating: 8.2,
    poster: "https://image.tmdb.org/t/p/w500/dNFlWGSTcSEot7bHXq36VG5njLz.jpg",
    description: "L'histoire de Superman qui tente de concilier son héritage kryptonien avec son éducation humaine."
  }
];

// Catégories de films - VRAIS FILMS 2024-2025
export const movieCategories = [
  {
    name: "Action",
    color: "from-red-600/30 to-orange-600/30",
    movies: [
      {
        id: 101,
        title: "The Beekeeper",
        year: 2024,
        duration: "1h 45m",
        rating: 6.4,
        poster: "https://image.tmdb.org/t/p/w500/A7EByudX0eOzlkQ2FIbogzyazm2.jpg",
        genres: ["Action", "Thriller"]
      },
      {
        id: 102,
        title: "The Fall Guy",
        year: 2024,
        duration: "2h 6m",
        rating: 7.1,
        poster: "https://image.tmdb.org/t/p/w500/tSz1qsmSJon0rqjHBxXZmrotuse.jpg",
        genres: ["Action", "Comédie"]
      },
      {
        id: 103,
        title: "Monkey Man",
        year: 2024,
        duration: "2h 1m",
        rating: 7.1,
        poster: "https://image.tmdb.org/t/p/w500/4lhR4L2vzzjl68P1zJyCH755Oz4.jpg",
        genres: ["Action", "Thriller"]
      },
      {
        id: 104,
        title: "Ballerina",
        year: 2025,
        duration: "1h 44m",
        rating: 6.8,
        poster: "https://image.tmdb.org/t/p/w500/9wJOhrschemes0LqIMIXdNjNQkz3.jpg",
        genres: ["Action", "Thriller"]
      },
      {
        id: 105,
        title: "Den of Thieves 2",
        year: 2025,
        duration: "2h 4m",
        rating: 6.3,
        poster: "https://image.tmdb.org/t/p/w500/gExHSiJKe5R8QHGRnFDLVlMJLqw.jpg",
        genres: ["Action", "Crime"]
      }
    ]
  },
  {
    name: "Science-Fiction",
    color: "from-blue-600/30 to-cyan-600/30",
    movies: [
      {
        id: 201,
        title: "Dune: Part Two",
        year: 2024,
        duration: "2h 46m",
        rating: 8.6,
        poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        genres: ["Science-Fiction", "Aventure"]
      },
      {
        id: 202,
        title: "Alien: Romulus",
        year: 2024,
        duration: "1h 59m",
        rating: 7.3,
        poster: "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
        genres: ["Science-Fiction", "Horreur"]
      },
      {
        id: 203,
        title: "Mickey 17",
        year: 2025,
        duration: "2h 3m",
        rating: 7.5,
        poster: "https://image.tmdb.org/t/p/w500/kKMtvbdGAfXE7F6ff2NlYVRAyML.jpg",
        genres: ["Science-Fiction", "Comédie"]
      },
      {
        id: 204,
        title: "Avatar: Fire and Ash",
        year: 2025,
        duration: "2h 30m",
        rating: 8.0,
        poster: "https://image.tmdb.org/t/p/w500/7zmCPltSMTP4kcWJ6fPNPdPxWE1.jpg",
        genres: ["Science-Fiction", "Aventure"]
      }
    ]
  },
  {
    name: "Thriller",
    color: "from-purple-600/30 to-pink-600/30",
    movies: [
      {
        id: 301,
        title: "Civil War",
        year: 2024,
        duration: "1h 49m",
        rating: 7.0,
        poster: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
        genres: ["Thriller", "Guerre", "Action"]
      },
      {
        id: 302,
        title: "Speak No Evil",
        year: 2024,
        duration: "1h 50m",
        rating: 6.6,
        poster: "https://image.tmdb.org/t/p/w500/fDtkrO2OAF8LKQTdzYmu1Y7lCLB.jpg",
        genres: ["Thriller", "Horreur"]
      },
      {
        id: 303,
        title: "Trap",
        year: 2024,
        duration: "1h 45m",
        rating: 6.3,
        poster: "https://image.tmdb.org/t/p/w500/jwoaKYVqPgYemFpaANL941EF94R.jpg",
        genres: ["Thriller", "Crime"]
      },
      {
        id: 304,
        title: "Black Bag",
        year: 2025,
        duration: "2h 0m",
        rating: 7.2,
        poster: "https://image.tmdb.org/t/p/w500/kOX9uvdJPqBZ7ON0LyMDnDVQjb0.jpg",
        genres: ["Thriller", "Espionnage"]
      },
      {
        id: 305,
        title: "Flight Risk",
        year: 2025,
        duration: "1h 30m",
        rating: 6.5,
        poster: "https://image.tmdb.org/t/p/w500/95bYCHMBqL1F1G6L1bKLgzOWXjb.jpg",
        genres: ["Thriller", "Action"]
      }
    ]
  },
  {
    name: "Comédie",
    color: "from-yellow-600/30 to-orange-600/30",
    movies: [
      {
        id: 401,
        title: "Deadpool & Wolverine",
        year: 2024,
        duration: "2h 8m",
        rating: 7.7,
        poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        genres: ["Comédie", "Action", "Science-Fiction"]
      },
      {
        id: 402,
        title: "Thelma",
        year: 2024,
        duration: "1h 37m",
        rating: 7.0,
        poster: "https://image.tmdb.org/t/p/w500/rUcuageYgv9SsJoWuc0seRWG6JC.jpg",
        genres: ["Comédie", "Action"]
      },
      {
        id: 403,
        title: "Ghostbusters: Frozen Empire",
        year: 2024,
        duration: "1h 55m",
        rating: 6.7,
        poster: "https://image.tmdb.org/t/p/w500/e1J2oNzSBdou01sUvriVuoYp0pJ.jpg",
        genres: ["Comédie", "Fantastique", "Action"]
      },
      {
        id: 404,
        title: "The Naked Gun",
        year: 2025,
        duration: "1h 48m",
        rating: 7.5,
        poster: "https://image.tmdb.org/t/p/w500/8pTFPPXXj2Ks6p7rAi9zR0Qb85H.jpg",
        genres: ["Comédie", "Action"]
      }
    ]
  },
  {
    name: "Romance",
    color: "from-pink-600/30 to-rose-600/30",
    movies: [
      {
        id: 501,
        title: "Challengers",
        year: 2024,
        duration: "2h 11m",
        rating: 7.2,
        poster: "https://image.tmdb.org/t/p/w500/H6vke7zGiuLsz4v4RPeReb9rsv.jpg",
        genres: ["Romance", "Drame", "Sport"]
      },
      {
        id: 502,
        title: "Anyone But You",
        year: 2023,
        duration: "1h 43m",
        rating: 6.3,
        poster: "https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg",
        genres: ["Romance", "Comédie"]
      },
      {
        id: 503,
        title: "The Idea of You",
        year: 2024,
        duration: "1h 56m",
        rating: 6.9,
        poster: "https://image.tmdb.org/t/p/w500/zDi2U7wtgoe3WsCa1ssaqKJVbKv.jpg",
        genres: ["Romance", "Drame"]
      },
      {
        id: 504,
        title: "We Live in Time",
        year: 2024,
        duration: "1h 48m",
        rating: 7.6,
        poster: "https://image.tmdb.org/t/p/w500/xQAgRuZXoD6gkI4G4rGXGbqNbBv.jpg",
        genres: ["Romance", "Drame"]
      }
    ]
  },
  {
    name: "Horreur",
    color: "from-red-900/30 to-black/30",
    movies: [
      {
        id: 601,
        title: "Longlegs",
        year: 2024,
        duration: "1h 41m",
        rating: 6.7,
        poster: "https://image.tmdb.org/t/p/w500/5aj8vVGFwGVbQQs26ywhg4Zxk2L.jpg",
        genres: ["Horreur", "Thriller"]
      },
      {
        id: 602,
        title: "A Quiet Place: Day One",
        year: 2024,
        duration: "1h 39m",
        rating: 6.9,
        poster: "https://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg",
        genres: ["Horreur", "Thriller", "Science-Fiction"]
      },
      {
        id: 603,
        title: "Nosferatu",
        year: 2024,
        duration: "2h 12m",
        rating: 7.3,
        poster: "https://image.tmdb.org/t/p/original/fOQeuwmsYJ4sK5Tz8V1Fkzt28AT.jpg",
        genres: ["Horreur", "Fantastique"]
      },
      {
        id: 604,
        title: "Abigail",
        year: 2024,
        duration: "1h 49m",
        rating: 6.8,
        poster: "https://image.tmdb.org/t/p/original/82cVKNHK1imJQqAzj5WedbDdR2B.jpg",
        genres: ["Horreur", "Thriller"]
      }
    ]
  }
];