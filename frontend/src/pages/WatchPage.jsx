import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/api';

export default function WatchPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);

  // Charger les données du film depuis l'API
  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await ApiService.getMovieById(movieId);

      if (response.success) {
        setMovieData(response.data);
      } else {
        setError('Film non trouvé');
      }

      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement du film:', err);
      setError('Impossible de charger le film');
      setLoading(false);
    }
  };

  // Initialiser le lecteur YouTube
  useEffect(() => {
    if (!movieData || !movieData.youtube_id) return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player('movie-player', {
        videoId: movieData.youtube_id,
        playerVars: {
          autoplay: 1,
          mute: 0,
          controls: 1,
          showinfo: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1
        },
        events: {
          onReady: (event) => {
            setIsPlayerReady(true);
            event.target.playVideo();
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [movieData]);

  const toggleMute = () => {
    if (playerRef.current && isPlayerReady) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (playerRef.current && isPlayerReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-white text-xl">Chargement du film...</p>
        </div>
      </div>
    );
  }

  if (error || !movieData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-white text-xl mb-4">{error || 'Film non trouvé'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-white/90 transition-all"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header avec bouton retour */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between p-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full border-2 border-white/30 backdrop-blur-sm bg-black/30 flex items-center justify-center hover:bg-white/20 transition-all"
              aria-label={isPlaying ? "Mettre en pause" : "Lire"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full border-2 border-white/30 backdrop-blur-sm bg-black/30 flex items-center justify-center hover:bg-white/20 transition-all"
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lecteur vidéo */}
      <div className="relative w-full h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-7xl aspect-video">
          <div id="movie-player" className="w-full h-full"></div>
        </div>
      </div>

      {/* Informations du film */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-6">
          <div className="flex items-start gap-8">
            {/* Poster */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <img
                src={movieData.poster}
                alt={movieData.title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>

            {/* Informations */}
            <div className="flex-1">
              <h1 className="text-5xl font-black mb-4">{movieData.title}</h1>
              
              <div className="flex items-center gap-4 text-zinc-400 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white font-bold">{movieData.rating}</span>
                </div>
                <span>•</span>
                <span>{movieData.year}</span>
                <span>•</span>
                <span>{movieData.duration}</span>
              </div>

              <div className="flex gap-2 mb-6 flex-wrap">
                {movieData.genres && movieData.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-zinc-200 font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {movieData.description && (
                <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mb-8">
                  {movieData.description}
                </p>
              )}

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-white/90 transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Ma liste
                </button>
                <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  J'aime
                </button>
                <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}