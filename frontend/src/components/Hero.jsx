import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroFullscreenVideo() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);
  
  const trendingMovie = {
    id: "la-femme-de-menage",
    title: "La femme de ménage",
    year: 2025,
    rating: 9.2,
    duration: "2h 15m",
    genres: ['Drame', 'Thriller', 'Mystère'],
    description: "Dans les couloirs d'un hôtel de luxe, une femme de ménage découvre un secret qui va bouleverser sa vie et remettre en question tout ce qu'elle croyait savoir sur la société.",
    trailerYoutubeId: "H6-M7G3eFdk",
    posterUrl: "https://all.web.img.acsta.net/img/a3/8a/a38a4ed788b6b10ef3a46b7d3b8ce0f5.jpg"
  };

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: trendingMovie.trailerYoutubeId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: trendingMovie.trailerYoutubeId,
          controls: 0,
          showinfo: 0,
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
  }, []);

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

  const handleWatchMovie = () => {
    navigate(`/watch/${trendingMovie.id}`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div 
          id="youtube-player"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950"></div>
      </div>

      <div className="relative z-10 h-full flex items-end pb-24 px-12 lg:px-16 max-w-7xl">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold uppercase rounded-md shadow-lg">
              🔥 Tendance #1
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-md border border-white/10">
              <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-white">{trendingMovie.rating}</span>
              <span className="text-zinc-400">|</span>
              <span className="text-zinc-300">{trendingMovie.year}</span>
              <span className="text-zinc-400">|</span>
              <span className="text-zinc-300">{trendingMovie.duration}</span>
            </div>
          </div>

          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none drop-shadow-2xl">
            {trendingMovie.title}
          </h1>

          <p className="text-lg lg:text-xl text-zinc-200 leading-relaxed max-w-xl drop-shadow-lg">
            {trendingMovie.description}
          </p>

          <div className="flex gap-2 flex-wrap">
            {trendingMovie.genres.map((genre) => (
              <span 
                key={genre} 
                className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-zinc-200 font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-4 flex-wrap">
            <button 
              onClick={handleWatchMovie}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-bold text-base hover:bg-white/90 transition-all shadow-2xl hover:scale-105"
            >
              <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Regarder maintenant
            </button>
            
            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold border border-white/20 hover:bg-white/20 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Plus d'infos
            </button>
            
            <button className="w-14 h-14 rounded-full border-2 border-white/30 backdrop-blur-sm bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all group">
              <svg className="w-6 h-6 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-32 right-12 lg:right-16 z-20 flex gap-3">
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full border-2 border-white/30 backdrop-blur-sm bg-black/30 flex items-center justify-center hover:bg-white/20 transition-all group"
          aria-label={isPlaying ? "Mettre en pause" : "Lire"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <button 
          onClick={toggleMute}
          className="w-12 h-12 rounded-full border-2 border-white/30 backdrop-blur-sm bg-black/30 flex items-center justify-center hover:bg-white/20 transition-all group"
          aria-label={isMuted ? "Activer le son" : "Couper le son"}
        >
        {isMuted ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
      </div>
    </div>
  );
}