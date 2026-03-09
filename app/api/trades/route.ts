import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req:Request){const session=await auth(); if(!session?.user) return NextResponse.json({error:'Unauthorized'},{status:401}); if((session.user as any).isBanned) return NextResponse.json({error:'Banned users cannot create offers'},{status:403}); const body=await req.json(); const trade=await prisma.tradeOffer.create({data:{proposerId:(session.user as any).id,counterpartyId:body.counterpartyId,proposerCashCents:body.proposerCashCents??0,counterpartyCashCents:body.counterpartyCashCents??0,status:'PROPOSED'}}); return NextResponse.json(trade);} 
