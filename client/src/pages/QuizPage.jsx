import { useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const DOMAINS = [
  'General Security Concepts',
  'Threats, Vulnerabilities, and Mitigations',
  'Security Architecture',
  'Security Operations',
  'Security Program Management and Oversight'
];

export default function QuizPage() {
  const [config, setConfig] = useState({ domain: '', mode: 'game', timer: 20, adaptive: false });
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(20);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const activeQuestion = questions[current];
  const completed = current >= questions.length && questions.length > 0;

  useEffect(() => {
    if (!activeQuestion || config.mode === 'study') return;
    if (remaining <= 0) {
      handleSelect(-1);
      return;
    }
    const id = setTimeout(() => setRemaining((v) => v - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, activeQuestion]);

  const loadQuestions = async () => {
    const count = config.mode === 'simulation' ? 90 : 10;
    const { data } = await api.get('/quiz/questions', { params: { ...config, count } });
    setQuestions(data.questions);
    setRemaining(config.mode === 'study' ? 0 : data.timer);
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  };

  const handleSelect = (selectedAnswer) => {
    if (!activeQuestion) return;
    const responseTime = config.mode === 'study' ? 0 : config.timer - remaining;
    setAnswers((prev) => [...prev, { questionId: activeQuestion._id, selectedAnswer, responseTime }]);
    setCurrent((v) => v + 1);
    setRemaining(config.timer);
  };

  const submit = async () => {
    const { data } = await api.post('/quiz/submit', {
      mode: config.mode,
      answers,
      timerSeconds: config.timer
    });
    setResult(data);
  };

  useEffect(() => {
    if (completed && answers.length) submit();
  }, [completed]);

  const progress = useMemo(() => (questions.length ? Math.round((current / questions.length) * 100) : 0), [current, questions.length]);

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <section className="card grid md:grid-cols-4 gap-3">
        <select className="bg-slate-800 p-2 rounded" value={config.domain} onChange={(e) => setConfig({ ...config, domain: e.target.value })}>
          <option value="">All Domains</option>
          {DOMAINS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select className="bg-slate-800 p-2 rounded" value={config.mode} onChange={(e) => setConfig({ ...config, mode: e.target.value })}>
          <option value="game">Game Mode</option>
          <option value="study">Study Mode</option>
          <option value="simulation">Exam Simulation</option>
        </select>
        <input type="number" min="10" max="30" disabled={config.mode !== 'game'} className="bg-slate-800 p-2 rounded" value={config.timer} onChange={(e) => setConfig({ ...config, timer: Number(e.target.value) })} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={config.adaptive} onChange={(e) => setConfig({ ...config, adaptive: e.target.checked })} /> Adaptive</label>
        <button className="btn-primary md:col-span-4" onClick={loadQuestions}>Start Session</button>
      </section>

      {!!questions.length && activeQuestion && (
        <section className="card animate-pulse-once">
          <div className="flex justify-between mb-3 text-sm text-slate-400">
            <span>Question {current + 1}/{questions.length}</span>
            {config.mode !== 'study' && <span>⏱ {remaining}s</span>}
          </div>
          <div className="h-2 bg-slate-800 rounded mb-4"><div className="h-2 bg-cyan-400 rounded" style={{ width: `${progress}%` }} /></div>
          <h2 className="text-xl font-semibold mb-4">{activeQuestion.question}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {activeQuestion.choices.map((choice, idx) => (
              <button key={choice} onClick={() => handleSelect(idx)} className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-left">{choice}</button>
            ))}
          </div>
          {config.mode === 'study' && <p className="text-cyan-200 text-sm mt-4">Study mode displays explanations after grading in results.</p>}
        </section>
      )}

      {result && (
        <section className="card space-y-3">
          <h3 className="text-2xl font-bold text-cyan-300">Quiz Complete</h3>
          <p>Score: <strong>{result.score}</strong> | Correct: <strong>{result.correctCount}/{result.totalQuestions}</strong></p>
          <div className="space-y-2 max-h-72 overflow-auto">
            {result.answers.map((a, i) => (
              <div key={i} className={`p-3 rounded border ${a.isCorrect ? 'border-emerald-500/40' : 'border-rose-500/40'}`}>
                <p className="text-sm">{a.isCorrect ? '✅ Correct' : '❌ Incorrect'} • {a.domain}</p>
                <p className="text-xs text-slate-300">{a.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
