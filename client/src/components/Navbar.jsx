import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-cyan-500/20 bg-slate-900/60 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-cyan-300 font-bold">SecPlus Trainer</Link>
        {user && (
          <div className="flex gap-3 text-sm">
            <Link to="/quiz" className="hover:text-cyan-300">Quiz</Link>
            <Link to="/dashboard" className="hover:text-cyan-300">Dashboard</Link>
            <button onClick={logout} className="text-rose-300 hover:text-rose-200">Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}
