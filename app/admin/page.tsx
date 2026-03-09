import { prisma } from '@/lib/prisma';
export default async function AdminDashboard(){const trades=await prisma.tradeOffer.findMany({take:20});return <div><h1 className='text-2xl'>Admin Dashboard</h1><ul>{trades.map(t=><li key={t.id}>{t.id} - {t.status}</li>)}</ul></div>;}
