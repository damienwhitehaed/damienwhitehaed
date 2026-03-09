import { prisma } from '@/lib/prisma';
import { TradeStatus } from '@prisma/client';
import { calculateTradeFee } from './trade';

export async function resetAcceptance(tradeId: string) {
  return prisma.tradeOffer.update({ where: { id: tradeId }, data: { proposerAccepted: false, counterpartyAccepted: false, status: TradeStatus.NEGOTIATING } });
}

export async function acceptTrade(tradeId: string, userId: string) {
  const trade = await prisma.tradeOffer.findUniqueOrThrow({ where: { id: tradeId } });
  const data = userId === trade.proposerId ? { proposerAccepted: true } : { counterpartyAccepted: true };
  const updated = await prisma.tradeOffer.update({ where: { id: tradeId }, data });
  if (updated.proposerAccepted && updated.counterpartyAccepted) {
    const agreed = updated.agreedValueCents ?? 0;
    const fee = calculateTradeFee(agreed);
    return prisma.tradeOffer.update({ where: { id: tradeId }, data: { status: TradeStatus.ACCEPTED, proposerFeeCents: fee, counterpartyFeeCents: fee } });
  }
  return updated;
}
