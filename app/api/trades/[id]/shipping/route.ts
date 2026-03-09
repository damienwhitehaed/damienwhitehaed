import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(req:Request,{params}:{params:{id:string}}){const body=await req.json(); const trade=await prisma.tradeOffer.update({where:{id:params.id},data:{trackingToHubProposer:body.trackingToHubProposer,trackingToHubCounterparty:body.trackingToHubCounterparty,status:'SHIPPED'}}); return NextResponse.json(trade);} 
