import type { Plan, State } from './types';

export function step(plan: Plan, t: number): State {
  if (!plan) {
    return { phase: 'AllRed', t: 0, tRemaining: 0 };
  }

  const { greenNS, pedNS, greenEW, pedEW, amber, allRed } = plan;

  const p1 = greenNS;
  const p2 = p1 + pedNS;
  const p3 = p2 + greenEW;
  const p4 = p3 + pedEW;
  const p5 = p4 + amber;
  const p6 = p5 + allRed; // == cycle

  const mod = t % plan.cycle;

  if (mod < p1) return { phase: 'NS', t: mod, tRemaining: p1 - mod };
  if (mod < p2) return { phase: 'PedNS', t: mod, tRemaining: p2 - mod };
  if (mod < p3) return { phase: 'EW', t: mod, tRemaining: p3 - mod };
  if (mod < p4) return { phase: 'PedEW', t: mod, tRemaining: p4 - mod };
  if (mod < p5) return { phase: 'Amber', t: mod, tRemaining: p5 - mod };

  return { phase: 'AllRed', t: mod, tRemaining: p6 - mod };
}
