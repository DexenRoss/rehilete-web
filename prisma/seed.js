/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const categories = [
  {
    name: "Música",
    slug: "musica",
  },
  {
    name: "Cine / Series",
    slug: "cine-series",
  },
  {
    name: "Literatura",
    slug: "literatura",
  },
  {
    name: "Videojuegos",
    slug: "videojuegos",
  },
  {
    name: "Especiales",
    slug: "especiales",
  },
];

const contributors = [
  {
    name: "Lalo Enríquez",
    slug: "lalo-enriquez",
  },
];

const tags = [
  {
    name: "Música mexicana",
    slug: "musica-mexicana",
  },
  {
    name: "Literatura mexicana",
    slug: "literatura-mexicana",
  },
  {
    name: "Reseña",
    slug: "resena",
  },
  {
    name: "Especial",
    slug: "especial",
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
      },
      create: category,
    });
  }

  for (const contributor of contributors) {
    await prisma.contributor.upsert({
      where: { slug: contributor.slug },
      update: {
        name: contributor.name,
      },
      create: contributor,
    });
  }

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {
        name: tag.name,
      },
      create: tag,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
