import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:movieId" element={<WatchPage />} />
      </Routes>
    </div>
  );
}