import { prisma } from '@/lib/prisma';
export default async function Collection(){const cards=await prisma.card.findMany({take:20}); return <div><h1 className='text-2xl mb-2'>Collection Manager</h1><ul className='space-y-2'>{cards.map(c=><li key={c.id} className='border border-slate-800 p-2'>{c.name} - ${c.estimatedValueCents/100}</li>)}</ul></div>}
