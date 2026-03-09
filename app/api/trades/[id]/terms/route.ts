import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { resetAcceptance } from '@/lib/services/tradeService';
export async function PATCH(req:Request,{params}:{params:{id:string}}){const body=await req.json(); await prisma.tradeOffer.update({where:{id:params.id},data:{proposerCashCents:body.proposerCashCents,counterpartyCashCents:body.counterpartyCashCents,agreedValueCents:body.agreedValueCents}}); const trade=await resetAcceptance(params.id); return NextResponse.json(trade);} 
