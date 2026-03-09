export function calculateTradeFee(agreedValueCents: number): number {
  return Math.round(agreedValueCents * 0.05);
}

export function applyStrike(currentStrikes: number) {
  const strikes = currentStrikes + 1;
  return { strikes, isBanned: strikes >= 3 };
}
