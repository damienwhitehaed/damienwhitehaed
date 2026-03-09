import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(req:Request){const session=await auth(); if((session?.user as any)?.role!=='ADMIN') return NextResponse.json({error:'Forbidden'},{status:403}); const {searchParams}=new URL(req.url); const status=searchParams.get('status') as any; const trades=await prisma.tradeOffer.findMany({where:status?{status}:{}}); return NextResponse.json(trades);} 
