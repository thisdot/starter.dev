import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const expressTech = await prisma.technologyEntity.upsert({
    where: { name: 'Express' },
    update: {},
    create: {
      name: 'Express',
    },
  })
  const apolloTech = await prisma.technologyEntity.upsert({
    where: { name: 'Apollo' },
    update: {},
    create: {
      name: 'Apollo',
    },
  })
  const prismaTech = await prisma.technologyEntity.upsert({
    where: { name: 'Prisma' },
    update: {},
    create: {
      name: 'Prisma',
    },
  })
  console.log({ expressTech, apolloTech, prismaTech })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
