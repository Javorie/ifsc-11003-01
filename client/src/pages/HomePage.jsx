import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <section className="card text-center space-y-6 mt-8">
        <h1 className="text-4xl font-extrabold text-cyan-300">SecPlus Trainer</h1>
        <p className="text-slate-300">Kahoot-style CompTIA Security+ SY0-701 practice with analytics-driven adaptive learning.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/login" className="px-4 py-2 rounded-xl border border-cyan-500/40">Login</Link>
        </div>
      </section>
    </main>
  );
}
