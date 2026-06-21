import type { PlayerSave, RealmId } from '../types/domain';

const realmRequirements: Record<RealmId, number> = {
  1: 0,
  2: 300,
  3: 900,
  4: 1800,
  5: 3200,
  6: 5200
};

export function calculateRealm(xp: number): RealmId {
  if (xp >= realmRequirements[6]) return 6;
  if (xp >= realmRequirements[5]) return 5;
  if (xp >= realmRequirements[4]) return 4;
  if (xp >= realmRequirements[3]) return 3;
  if (xp >= realmRequirements[2]) return 2;
  return 1;
}

export function refreshRealm(save: PlayerSave): PlayerSave {
  return { ...save, realm: calculateRealm(save.xp) };
}
