import { prisma } from '@/lib/prisma';
import { signupSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const payload = form
    ? { username: String(form.get('username') ?? ''), email: String(form.get('email') ?? ''), password: String(form.get('password') ?? '') }
    : await req.json();
  const parsed = signupSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({ data: { username: parsed.data.username, email: parsed.data.email, passwordHash } });
  return form ? NextResponse.redirect(new URL('/login', req.url)) : NextResponse.json({ id: user.id });
}
