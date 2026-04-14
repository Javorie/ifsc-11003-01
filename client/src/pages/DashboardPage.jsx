import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import api from '../api/client';

const COLORS = ['#22d3ee', '#334155'];

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get('/analytics').then(({ data }) => setAnalytics(data));
  }, []);

  if (!analytics) return <main className="p-6">Loading analytics...</main>;

  const pieData = [
    { name: 'Correct %', value: analytics.overallAccuracy },
    { name: 'Remaining %', value: 100 - analytics.overallAccuracy }
  ];

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-4">
      <section className="grid md:grid-cols-4 gap-4">
        <div className="card"><p className="text-sm text-slate-400">Overall Accuracy</p><h3 className="text-3xl text-cyan-300">{analytics.overallAccuracy}%</h3></div>
        <div className="card"><p className="text-sm text-slate-400">Questions Answered</p><h3 className="text-3xl">{analytics.totalAnswered}</h3></div>
        <div className="card"><p className="text-sm text-slate-400">Weakest Domain</p><h3 className="text-lg">{analytics.weakestDomain?.domain || 'N/A'}</h3></div>
        <div className="card"><p className="text-sm text-slate-400">Strongest Domain</p><h3 className="text-lg">{analytics.strongestDomain?.domain || 'N/A'}</h3></div>
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="card h-80">
          <h3 className="mb-2">Domain Performance</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={analytics.domainPerformance}>
              <XAxis dataKey="domain" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#22d3ee" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card h-80">
          <h3 className="mb-2">Overall Accuracy</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card h-80">
        <h3 className="mb-2">Trend Over Time</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={analytics.trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="#22d3ee" />
            <Line type="monotone" dataKey="score" stroke="#f97316" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="mb-2">Recommendations</h3>
          <ul className="space-y-2 text-sm">
            {analytics.domainPerformance.map((d) => (
              <li key={d.domain} className="flex justify-between border-b border-slate-800 pb-2">
                <span>{d.domain}</span>
                <span className="text-cyan-200">{d.recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="mb-2">Recent Mistakes</h3>
          <ul className="space-y-2 text-sm max-h-64 overflow-auto">
            {analytics.recentMistakes.length === 0 && <li>No mistakes yet 🎉</li>}
            {analytics.recentMistakes.map((m, i) => (
              <li key={i} className="border-b border-slate-800 pb-2">
                <p>{m.domain}</p>
                <p className="text-rose-300">Chosen: {m.selectedAnswer + 1}, Correct: {m.correctAnswer + 1}</p>
                <p className="text-slate-300">{m.explanation}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
