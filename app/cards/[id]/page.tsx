import { prisma } from '@/lib/prisma';
export default async function CardDetail({params}:{params:{id:string}}){const card=await prisma.card.findUnique({where:{id:params.id}}); if(!card) return <div>Not found</div>; return <div><h1 className='text-2xl'>{card.name}</h1><p>{card.description}</p><img src={card.frontImageUrl} className='w-64'/></div>}
