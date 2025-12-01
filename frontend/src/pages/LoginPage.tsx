import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/contentApi';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      login(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto glass-card rounded-3xl p-10 mt-16">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center" style={{textShadow: '0 4px 15px rgba(0,0,0,0.3)'}}>Welcome Back</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-white mb-3" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl glass-input focus-glow text-base p-4 text-white placeholder-white/50 font-medium"
            style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-white mb-3" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl glass-input focus-glow text-base p-4 text-white placeholder-white/50 font-medium"
            style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}
            placeholder="••••••••"
            required
          />
        </div>
        {error && <div className="text-sm text-white font-semibold glass-card-dark rounded-xl p-4 border-2 border-red-400/50" style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white text-lg font-bold transition-all duration-300 border-2 ${loading ? 'bg-emerald-500/50 border-emerald-400/50 cursor-not-allowed opacity-70' : 'bg-emerald-500/80 border-emerald-400 hover:bg-emerald-500 hover:scale-[1.02] shadow-lg shadow-emerald-500/50'}`}
          style={{textShadow: '0 1px 3px rgba(0,0,0,0.3)'}}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-sm text-white/80 mt-8 text-center font-medium" style={{textShadow: '0 1px 2px rgba(0,0,0,0.2)'}}>No account? <Link to="/register" className="text-white font-bold hover:underline">Register</Link></p>
    </div>
  );
};

export default LoginPage;
