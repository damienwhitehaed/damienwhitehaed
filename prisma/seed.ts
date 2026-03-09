import { PrismaClient, GradeCompany, ListingMode, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({ where: { email: 'admin@tradehub.dev' }, update: {}, create: { username: 'admin', email: 'admin@tradehub.dev', passwordHash, role: Role.ADMIN } });
  const alice = await prisma.user.upsert({ where: { email: 'alice@tradehub.dev' }, update: {}, create: { username: 'alice', email: 'alice@tradehub.dev', passwordHash } });
  const bob = await prisma.user.upsert({ where: { email: 'bob@tradehub.dev' }, update: {}, create: { username: 'bob', email: 'bob@tradehub.dev', passwordHash } });
  await prisma.card.createMany({ data: [
    { ownerId: alice.id, name: 'Charizard', setName: 'Base', gradeCompany: GradeCompany.PSA, gradeValue: '9', estimatedValueCents: 250000, frontImageUrl: 'https://picsum.photos/400?1', backImageUrl: 'https://picsum.photos/400?2', isForSale: true, isForTrade: true, listingMode: ListingMode.BOTH },
    { ownerId: bob.id, name: 'Blastoise', setName: 'Base', gradeCompany: GradeCompany.BGS, gradeValue: '8.5', estimatedValueCents: 180000, frontImageUrl: 'https://picsum.photos/400?3', backImageUrl: 'https://picsum.photos/400?4', isForSale: false, isForTrade: true, listingMode: ListingMode.TRADE }
  ]});
  console.log(admin.username);
}
main().finally(async()=>prisma.$disconnect());
