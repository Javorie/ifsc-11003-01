import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode = 'login' }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'signup' ? '/auth/signup' : '/auth/login';
      const payload = mode === 'signup' ? form : { email: form.email, password: form.password };
      const { data } = await api.post(endpoint, payload);
      saveAuth(data);
      navigate('/quiz');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-cyan-300">{mode === 'signup' ? 'Create Account' : 'Welcome Back'}</h1>
        {mode === 'signup' && (
          <input className="w-full bg-slate-800 p-3 rounded-lg" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        )}
        <input className="w-full bg-slate-800 p-3 rounded-lg" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="w-full bg-slate-800 p-3 rounded-lg" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="text-rose-300 text-sm">{error}</p>}
        <button className="btn-primary w-full">{mode === 'signup' ? 'Sign up' : 'Login'}</button>
      </form>
    </main>
  );
}
