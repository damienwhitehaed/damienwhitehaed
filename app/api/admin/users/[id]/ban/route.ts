import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export async function POST(_:Request,{params}:{params:{id:string}}){const session=await auth(); if((session?.user as any)?.role!=='ADMIN') return NextResponse.json({error:'Forbidden'},{status:403}); const user=await prisma.user.update({where:{id:params.id},data:{isBanned:true}}); return NextResponse.json(user);} 
