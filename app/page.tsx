import Link from 'next/link';
export default function Home() { return <div className='space-y-4'><h1 className='text-4xl font-bold'>TradeHub</h1><p>Secure trading card marketplace with escrow verification.</p><div className='flex gap-3'><Link className='underline' href='/signup'>Sign up</Link><Link className='underline' href='/login'>Login</Link></div></div>; }
