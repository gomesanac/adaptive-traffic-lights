export type Phase = 'NS' | 'EW' | 'PedNS' | 'PedEW' | 'Amber' | 'AllRed';

export type Flows = {
  vehicles: { NS: number; EW: number };
  pedestrians: { NS: number; EW: number };
};

export type Config = {
  baseCycle: number;
  minGreen: number;
  amber: number;
  allRed: number;
  pedThreshold: number;
  pedPhase: number;
  maxDeltaPct: number;
};

export type Plan = {
  greenNS: number;
  greenEW: number;
  pedNS: number;
  pedEW: number;
  amber: number;
  allRed: number;
  cycle: number;
};

export type State = { phase: Phase; t: number; tRemaining: number };
