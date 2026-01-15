import React from 'react';
import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';
import Hero from './components/Hero';
import FeaturedMovies from './components/FeaturedMovies';
import { featuredMovies, trendingMovies } from './data/movies';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <div className="min-h-screen bg-zinc-950 text-white">
      <FeaturedMovies movies={featuredMovies} />
    </div>
    </div>
  );
}