import { prisma } from '@/lib/prisma';
export default async function Dashboard(){const users=await prisma.user.findMany({take:5}); return <div><h1 className='text-2xl mb-3'>Dashboard</h1><ul>{users.map(u=><li key={u.id}>{u.username} • rating {u.rating.toString()} • strikes {u.strikes}</li>)}</ul></div>;}
