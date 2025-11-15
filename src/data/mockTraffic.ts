export type HourKey = '07:00' | '12:00' | '18:00' | '22:00';

export type IntersectionId =
  | 'AV_CENTRAL_X_RIO'
  | 'RUA_A_X_RUA_B'
  | 'AV_SUL_X_OESTE'
  | 'PCA_PARQUE';

export const INTERSECTIONS: Record<IntersectionId, { name: string }> = {
  AV_CENTRAL_X_RIO: { name: 'Av. Central × Av. Rio' },
  RUA_A_X_RUA_B: { name: 'Rua A × Rua B' },
  AV_SUL_X_OESTE: { name: 'Av. Sul × Av. Oeste' },
  PCA_PARQUE: { name: 'Praça do Parque' },
};

export const MOCK_TRAFFIC: Record<
  HourKey,
  Record<
    IntersectionId,
    {
      vehicles: { NS: number; EW: number };
      pedestrians: { NS: number; EW: number };
    }
  >
> = {
  '07:00': {
    AV_CENTRAL_X_RIO: {
      vehicles: { NS: 320, EW: 180 },
      pedestrians: { NS: 110, EW: 60 },
    },
    RUA_A_X_RUA_B: {
      vehicles: { NS: 140, EW: 90 },
      pedestrians: { NS: 45, EW: 30 },
    },
    AV_SUL_X_OESTE: {
      vehicles: { NS: 220, EW: 260 },
      pedestrians: { NS: 70, EW: 80 },
    },
    PCA_PARQUE: {
      vehicles: { NS: 80, EW: 60 },
      pedestrians: { NS: 180, EW: 220 },
    },
  },
  '12:00': {
    AV_CENTRAL_X_RIO: {
      vehicles: { NS: 160, EW: 90 },
      pedestrians: { NS: 55, EW: 30 },
    },
    RUA_A_X_RUA_B: {
      vehicles: { NS: 70, EW: 45 },
      pedestrians: { NS: 24, EW: 15 },
    },
    AV_SUL_X_OESTE: {
      vehicles: { NS: 110, EW: 130 },
      pedestrians: { NS: 35, EW: 40 },
    },
    PCA_PARQUE: {
      vehicles: { NS: 40, EW: 30 },
      pedestrians: { NS: 90, EW: 110 },
    },
  },
  '18:00': {
    AV_CENTRAL_X_RIO: {
      vehicles: { NS: 320, EW: 180 },
      pedestrians: { NS: 110, EW: 60 },
    },
    RUA_A_X_RUA_B: {
      vehicles: { NS: 140, EW: 90 },
      pedestrians: { NS: 45, EW: 30 },
    },
    AV_SUL_X_OESTE: {
      vehicles: { NS: 220, EW: 260 },
      pedestrians: { NS: 70, EW: 80 },
    },
    PCA_PARQUE: {
      vehicles: { NS: 80, EW: 60 },
      pedestrians: { NS: 180, EW: 220 },
    },
  },
  '22:00': {
    AV_CENTRAL_X_RIO: {
      vehicles: { NS: 160, EW: 90 },
      pedestrians: { NS: 55, EW: 30 },
    },
    RUA_A_X_RUA_B: {
      vehicles: { NS: 70, EW: 45 },
      pedestrians: { NS: 24, EW: 15 },
    },
    AV_SUL_X_OESTE: {
      vehicles: { NS: 110, EW: 130 },
      pedestrians: { NS: 35, EW: 40 },
    },
    PCA_PARQUE: {
      vehicles: { NS: 40, EW: 30 },
      pedestrians: { NS: 90, EW: 110 },
    },
  },
};
