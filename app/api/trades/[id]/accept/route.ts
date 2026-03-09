import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { acceptTrade } from '@/lib/services/tradeService';
export async function PATCH(_:Request,{params}:{params:{id:string}}){const session=await auth(); if(!session?.user) return NextResponse.json({error:'Unauthorized'},{status:401}); const trade=await acceptTrade(params.id,(session.user as any).id); return NextResponse.json(trade);} 
