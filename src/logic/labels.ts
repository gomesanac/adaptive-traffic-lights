import { type Phase } from './types';

export function phaseLabel(phase: Phase): string {
  switch (phase) {
    case 'NS':
      return 'Fluxo de veículos (Norte–Sul)';
    case 'EW':
      return 'Fluxo de veículos (Leste–Oeste)';
    case 'PedNS':
      return 'Travessia de pedestres (Norte–Sul)';
    case 'PedEW':
      return 'Travessia de pedestres (Leste–Oeste)';
    case 'Amber':
      return 'Atenção (sinal amarelo)';
    case 'AllRed':
      return 'Intertravamento (todos vermelhos)';
  }
}
