import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { applyStrike } from '@/lib/services/trade';

export async function POST(req:Request,{params}:{params:{id:string}}){const session=await auth(); if((session?.user as any)?.role!=='ADMIN') return NextResponse.json({error:'Forbidden'},{status:403}); const body=await req.json(); const report=await prisma.verificationReport.create({data:{tradeOfferId:params.id,cardId:body.cardId,reviewedByAdminId:(session.user as any).id,decision:body.decision,notes:body.notes}}); if(body.decision==='MISMATCH'){await prisma.tradeOffer.update({where:{id:params.id},data:{status:'PAUSED_MISMATCH'}}); const user=await prisma.user.findUniqueOrThrow({where:{id:body.illegitimateUserId}}); const {strikes,isBanned}=applyStrike(user.strikes); await prisma.user.update({where:{id:user.id},data:{strikes,isBanned}});} return NextResponse.json(report);} 
