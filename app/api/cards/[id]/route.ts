import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cardSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
export async function GET(_:Request,{params}:{params:{id:string}}){const card=await prisma.card.findUnique({where:{id:params.id}}); return NextResponse.json(card);} 
export async function PATCH(req:Request,{params}:{params:{id:string}}){const session=await auth(); if(!session?.user) return NextResponse.json({error:'Unauthorized'},{status:401}); const parsed=cardSchema.partial().safeParse(await req.json()); if(!parsed.success) return NextResponse.json({error:'Invalid'},{status:400}); const card=await prisma.card.update({where:{id:params.id},data:parsed.data}); return NextResponse.json(card);} 
