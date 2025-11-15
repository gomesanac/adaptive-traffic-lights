import type { Phase } from './types';

export type Snapshot = { phase: Phase; tick: number };

export function estimateWait(snapshots: Snapshot[]): number {
  // métrica simples: % de tempo não-verde
  const total = snapshots.length;
  const nonGreen = snapshots.filter(
    (s) => !('NS' === s.phase || 'EW' === s.phase)
  ).length;

  return Math.round((nonGreen / total) * 100); // %
}
