import { prisma } from '@/lib/prisma';
export default async function TradeTracker({params}:{params:{id:string}}){const trade=await prisma.tradeOffer.findUnique({where:{id:params.id}});return <div><h1 className='text-2xl'>Trade Tracker</h1><p>{trade?.status ?? 'Unknown trade'}</p></div>}
