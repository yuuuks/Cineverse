import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrendingMovies({ movies }) {
  const scrollRef = useRef(null);

  const TransitionStyle = () => (
    <div className="h-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)',
      }}></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
    </div>
  );

  return (
    <>
      <TransitionStyle />

      <section className="relative z-10 py-24 px-8 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center animate-pulse">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl blur-lg opacity-50"></div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-red-500 font-bold">
                  🔥 Hot cette semaine
                </p>
                <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  Top tendance
                </h2>
              </div>
            </div>
            <p className="text-zinc-400 text-lg">Les films les plus regardés en ce moment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {movies.map((movie, index) => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MovieCard({ movie, index }) {
  const navigate = useNavigate();

  const handleWatchMovie = () => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div 
      className="group relative cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-all duration-500">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 flex items-center gap-1.5">
            <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold">{movie.rating}</span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleWatchMovie}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform"
            >
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>{movie.year}</span>
            <span className="text-zinc-600">•</span>
            <span>{movie.duration}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-cyan-400">{movie.genre}</span>
          </div>
          
          <h3 className="text-2xl font-bold leading-tight group-hover:text-cyan-400 transition-colors">
            {movie.title}
          </h3>
          
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {movie.description}
          </p>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleWatchMovie}
              className="flex-1 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Regarder
            </button>
            <button className="w-12 h-12 rounded-xl border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
    </div>
  );
}