import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategorySection({ categories }) {
  return (
    <section className="relative z-10 py-24 space-y-16">
      {categories.map((category) => (
        <CategoryGrid key={category.name} category={category} />
      ))}
    </section>
  );
}

function CategoryGrid({ category }) {
  return (
    <div className="px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black mb-2">
              {category.name}
            </h2>
            <div className={`h-1.5 w-24 bg-gradient-to-r ${category.color} rounded-full`}></div>
          </div>
          <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm font-semibold">
            Voir tout
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {category.movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              categoryColor={category.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MovieCard({ movie, categoryColor }) {
  const navigate = useNavigate();

  const handleWatchMovie = () => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="group relative cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 transition-all duration-300">
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

          <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-md">
            <span className="text-xs font-bold text-yellow-400">★ {movie.rating}</span>
          </div>

          <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
            <div className="flex items-center gap-2 text-xs text-zinc-300 mb-3">
              <span>{movie.year}</span>
              {movie.duration && (
                <>
                  <span>•</span>
                  <span>{movie.duration}</span>
                </>
              )}
            </div>
            <button 
              onClick={handleWatchMovie}
              className="w-full py-2 bg-white text-black rounded-lg font-semibold text-sm hover:bg-white/90 transition-all"
            >
              ▶ Regarder
            </button>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColor} rounded-xl blur-md opacity-0 group-hover:opacity-75 transition-opacity -z-10`}></div>
    </div>
  );
}