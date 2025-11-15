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

function buildPlans(
  hour: HourKey,
  cfg: Config,
  prev?: Record<IntersectionId, Plan>
): Record<IntersectionId, Plan> {
  const flows = MOCK_TRAFFIC[hour];
  const plans = {} as Record<IntersectionId, Plan>;

  ids.forEach((id) => {
    const previousPlan = prev?.[id];
    plans[id] = computePlan(flows[id], cfg, previousPlan);
  });

  return plans;
}

const initialHour: HourKey = '07:00';
const initialCfg: Config = DEFAULT_CONFIG;
const initialPlans = buildPlans(initialHour, initialCfg);

export const useStore = create<S>((set, get) => ({
  hour: initialHour,
  setHour: (hour) => {
    set({ hour });

    const { cfg, plans } = get();
    const newPlans = buildPlans(hour, cfg, plans);

    set({ plans: newPlans, prevPlans: newPlans, t: 0 });
  },

  cfg: initialCfg,
  setCfg: (c) => {
    const cfg = { ...get().cfg, ...c };

    set({ cfg });

    const { hour, plans } = get();
    const newPlans = buildPlans(hour, cfg, plans);

    set({ plans: newPlans, prevPlans: newPlans, t: 0 });
  },

  t: 0,
  playing: false,
  togglePlay: () => set((s) => ({ playing: !s.playing })),
  tick: () => {
    const max = Math.max(...Object.values(get().plans).map((p) => p.cycle));
    set((s) => ({ t: (s.t + 1) % max }));
  },
  reset: () => set({ t: 0 }),

  plans: initialPlans,
  prevPlans: initialPlans,

  recomputePlans: () => {
    const { hour, cfg, plans } = get();
    const newPlans = buildPlans(hour, cfg, plans);

    set({ plans: newPlans, prevPlans: newPlans, t: 0 });
  },

  getState: (id) => step(get().plans[id], get().t),
}));
