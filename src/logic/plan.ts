import type { Config, Flows, Plan } from './types';

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function computePlan(flows: Flows, cfg: Config, prev?: Plan): Plan {
  const vehNS = Math.max(1, flows.vehicles.NS);
  const vehEW = Math.max(1, flows.vehicles.EW);
  const total = vehNS + vehEW;

  let greenNS = Math.round(cfg.baseCycle * (vehNS / total));
  let greenEW = cfg.baseCycle - greenNS;

  // mínimos
  const min = cfg.minGreen;

  if (greenNS < min) {
    greenEW -= min - greenNS;
    greenNS = min;
  }

  if (greenEW < min) {
    greenNS -= min - greenEW;
    greenEW = min;
  }

  // pedestres
  const pedNS = flows.pedestrians.NS >= cfg.pedThreshold ? cfg.pedPhase : 0;
  const pedEW = flows.pedestrians.EW >= cfg.pedThreshold ? cfg.pedPhase : 0;

  const extraPed = pedNS + pedEW;

  if (extraPed > 0) {
    const kNS = greenNS / (greenNS + greenEW);
    const takeNS = clamp(Math.round(extraPed * kNS), 0, greenNS - min);
    const takeEW = clamp(extraPed - takeNS, 0, greenEW - min);

    greenNS -= takeNS;
    greenEW -= takeEW;
  }

  if (prev) {
    const limitChange = (next: number, old: number, pct: number) => {
      const maxDelta = Math.max(1, Math.round(old * pct));
      const delta = clamp(next - old, -maxDelta, maxDelta);

      return old + delta;
    };

    greenNS = limitChange(greenNS, prev.greenNS, cfg.maxDeltaPct);
    greenEW = limitChange(greenEW, prev.greenEW, cfg.maxDeltaPct);
  }

  const amber = cfg.amber;
  const allRed = cfg.allRed;
  const cycle = greenNS + pedNS + greenEW + pedEW + amber + allRed;

  return { greenNS, greenEW, pedNS, pedEW, amber, allRed, cycle };
}
