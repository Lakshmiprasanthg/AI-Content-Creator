import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card-dark mb-8 sticky top-0 z-50 border-b-2 border-emerald-400/30">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-emerald-400 hover:text-emerald-300 hover:scale-105 transition-all duration-200" style={{textShadow: '0 2px 10px rgba(16, 185, 129, 0.5)'}}>
          ✨ AI Content Creator
        </Link>
        <div className="flex items-center gap-6">
          {isAuthenticated && (
            <>
              <Link to="/" className="text-sm font-semibold text-white/90 hover:text-emerald-300 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-emerald-500/20" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Dashboard</Link>
              <Link to="/history" className="text-sm font-semibold text-white/90 hover:text-emerald-300 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-emerald-500/20" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>History</Link>
              <span className="text-sm text-emerald-300 font-bold px-5 py-2 bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/50 rounded-full" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>{user?.username}</span>
              <button onClick={handleLogout} className="text-sm font-semibold text-white/90 hover:text-red-300 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-red-500/20" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Logout</button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-sm font-semibold text-white/90 hover:text-emerald-300 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-white/10" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Login</Link>
              <Link to="/register" className="px-6 py-2.5 bg-emerald-500/80 border-2 border-emerald-400 rounded-xl text-sm font-bold text-white hover:bg-emerald-500 hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-500/50">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
