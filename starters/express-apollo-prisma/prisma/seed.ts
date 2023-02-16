import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const expressTech = await prisma.technologyEntity.upsert({
    where: { displayName: 'Express' },
    update: {},
    create: {
      displayName: 'Express',
      description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
      url: 'https://expressjs.com/'
    },
  })
  const apolloTech = await prisma.technologyEntity.upsert({
    where: { displayName: 'Apollo GraphQL' },
    update: {},
    create: {
      displayName: 'Apollo GrapQL',
      description: 'Apollo Graph Platform — unify APIs, microservices, & databases into a graph that you can query with GraphQL.',
      url: 'https://www.apollographql.com/'
    },
  })
  const prismaTech = await prisma.technologyEntity.upsert({
    where: { displayName: 'Prisma' },
    update: {},
    create: {
      displayName: 'Prisma',
      description: 'Prisma is a next-generation Node.js and TypeScript ORM for PostgreSQL, MySQL, SQL Server, SQLite, MongoDB, and CockroachDB.',
      url: 'https://www.prisma.io/'
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
