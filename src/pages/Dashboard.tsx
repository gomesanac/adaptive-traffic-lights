import { useStore } from '../store';
import { INTERSECTIONS, type HourKey, type IntersectionId } from '../data/mockTraffic';
import { Light, type LightProps } from '../components';
import { useEffect } from 'react';
import { phaseLabel } from '../logic';

export function Dashboard() {
  const { hour, setHour, plans, getState, playing, togglePlay, tick, recomputePlans } =
    useStore();

  useEffect(() => {
    recomputePlans();
  }, [recomputePlans]);

  useEffect(() => {
    if (!playing) return;

    const iv = setInterval(tick, 800);

    return () => clearInterval(iv);
  }, [playing, tick]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">
          Sistema Inteligente de Semáforos Adaptativos
        </h1>
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value as HourKey)}
          className="border rounded px-2 py-1"
        >
          {['07:00', '12:00', '18:00', '22:00'].map((h) => (
            <option key={h}>{h}</option>
          ))}
        </select>
        <button
          onClick={togglePlay}
          className="px-3 py-1.5 rounded bg-slate-800 text-white"
        >
          {playing ? 'Pausar' : 'Simular'}
        </button>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {(Object.keys(INTERSECTIONS) as IntersectionId[]).map((id) => {
          const s = getState(id);
          const color =
            s.phase === 'NS'
              ? 'green'
              : s.phase === 'EW'
              ? 'green'
              : s.phase === 'Amber'
              ? 'yellow'
                  : 'red';

          return (
            <div key={id} className="bg-white rounded-2xl shadow p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">📍 {INTERSECTIONS[id].name}</h3>
                <Light state={color as LightProps['state']} />
              </div>
              <div className="mt-2">
                <p className="text-sm text-slate-700">
                  Fase atual: <b>{phaseLabel(s.phase)}</b>
                </p>
                <p className="text-xs text-slate-500">
                  Tempo restante da fase: <b>{s.tRemaining}s</b>
                </p>
              </div>
              <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  <b>Tempos programados:</b>
                </p>
                <ul className="list-disc ml-4">
                  <li>Verde Norte–Sul: {plans[id].greenNS}s</li>
                  <li>Verde Leste–Oeste: {plans[id].greenEW}s</li>
                  <li>Pedestres Norte–Sul: {plans[id].pedNS}s</li>
                  <li>Pedestres Leste–Oeste: {plans[id].pedEW}s</li>
                  <li>Atenção (amarelo): {plans[id].amber}s</li>
                  <li>Intertravamento: {plans[id].allRed}s</li>
                  <li>
                    <b>Tempo total do ciclo:</b> {plans[id].cycle}s
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
