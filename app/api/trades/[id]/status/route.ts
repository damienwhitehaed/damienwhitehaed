import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function PATCH(req:Request,{params}:{params:{id:string}}){const body=await req.json(); const trade=await prisma.tradeOffer.update({where:{id:params.id},data:{status:body.status}}); return NextResponse.json(trade);} 
