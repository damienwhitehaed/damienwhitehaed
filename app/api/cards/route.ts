import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cardSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
export async function POST(req: Request){const session=await auth(); if(!session?.user) return NextResponse.json({error:'Unauthorized'},{status:401}); if((session.user as any).isBanned) return NextResponse.json({error:'Banned users cannot create listings'},{status:403}); const body=await req.json(); const parsed=cardSchema.safeParse(body); if(!parsed.success) return NextResponse.json({error:parsed.error.flatten()},{status:400}); const card=await prisma.card.create({data:{...parsed.data,ownerId:(session.user as any).id}}); return NextResponse.json(card);} 
