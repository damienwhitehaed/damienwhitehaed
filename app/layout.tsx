import './globals.css';
import Link from 'next/link';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html><body><nav className='p-4 border-b border-slate-800 flex gap-4 text-sm'><Link href='/'>TradeHub</Link><Link href='/dashboard'>Dashboard</Link><Link href='/collection'>Collection</Link><Link href='/marketplace'>Marketplace</Link><Link href='/admin'>Admin</Link></nav><main className='p-6'>{children}</main></body></html>;
}
