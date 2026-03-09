import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function GET(_:Request,{params}:{params:{id:string}}){const trade=await prisma.tradeOffer.findUnique({where:{id:params.id},include:{cards:true}}); return NextResponse.json(trade);} 
