import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddMovie from './pages/Admin/AddMovie';
import EditMovie from './pages/Admin/EditMovie';
import ManageHero from './pages/ManageHero';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:movieId" element={<WatchPage />} />
        
        {/* Routes admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-movie" element={<AddMovie />} />
        <Route path="/admin/edit-movie/:movieId" element={<EditMovie />} />
        <Route path="/admin/manage-hero" element={<ManageHero />} />
      </Routes>
    </div>
  );
}