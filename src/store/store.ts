import { create } from 'zustand';
import {
  DEFAULT_CONFIG,
  type HourKey,
  MOCK_TRAFFIC,
  INTERSECTIONS,
  type IntersectionId,
} from '../data';
import {
  computePlan,
  step,
  type Config,
  type Plan,
  type State,
} from '../logic';

type S = {
  hour: HourKey;
  setHour: (h: HourKey) => void;

  cfg: Config;
  setCfg: (c: Partial<Config>) => void;

  t: number;
  playing: boolean;
  togglePlay: () => void;
  tick: () => void;
  reset: () => void;

  plans: Record<IntersectionId, Plan>;
  prevPlans: Record<IntersectionId, Plan | undefined>;
  recomputePlans: () => void;

  getState: (id: IntersectionId) => State;
};

const ids = Object.keys(INTERSECTIONS) as IntersectionId[];

export const useStore = create<S>((set, get) => ({
  hour: '07:00',
  setHour: (hour) => {
    set({ hour, t: 0 });
    get().recomputePlans();
  },

  cfg: DEFAULT_CONFIG,
  setCfg: (c) => {
    set({ cfg: { ...get().cfg, ...c } });
    get().recomputePlans();
  },

  t: 0,
  playing: false,
  togglePlay: () => set((s) => ({ playing: !s.playing })),
  tick: () => {
    const max = Math.max(...Object.values(get().plans).map((p) => p.cycle));
    set((s) => ({ t: (s.t + 1) % max }));
  },
  reset: () => set({ t: 0 }),

  plans: {} as Record<IntersectionId, Plan>,
  prevPlans: {} as Record<IntersectionId, Plan | undefined>,

  recomputePlans: () => {
    const { hour, cfg, plans: oldPlans } = get();
    const flows = MOCK_TRAFFIC[hour];

    const nextPlans: Record<IntersectionId, Plan> = {} as Record<IntersectionId, Plan>;
    const prevPlans: Record<IntersectionId, Plan | undefined> = {} as Record<
      IntersectionId,
      Plan
    >;

    ids.forEach((id) => {
      const prev = oldPlans[id]; // plano anterior desse cruzamento
      const plan = computePlan(flows[id], cfg, prev); // suavizado com prev
      nextPlans[id] = plan;
      prevPlans[id] = plan; // guarda como “anterior” para próxima rodada
    });

    set({ plans: nextPlans, prevPlans });
    // ressincroniza o relógio para evitar saltos visuais
    set({ t: 0 });
  },

  getState: (id) => step(get().plans[id], get().t),
}));
