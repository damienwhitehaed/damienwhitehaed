import { describe, expect, it } from 'vitest';
import { applyStrike, calculateTradeFee } from '@/lib/services/trade';

describe('trade fee', () => {
  it('calculates 5% and rounds', () => {
    expect(calculateTradeFee(10000)).toBe(500);
    expect(calculateTradeFee(9999)).toBe(500);
  });
});

describe('strike + ban', () => {
  it('auto bans on third strike', () => {
    expect(applyStrike(1)).toEqual({ strikes: 2, isBanned: false });
    expect(applyStrike(2)).toEqual({ strikes: 3, isBanned: true });
  });
});
