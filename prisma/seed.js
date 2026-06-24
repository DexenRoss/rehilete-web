/* eslint-disable @typescript-eslint/no-require-imports */
const { randomBytes, scrypt: scryptCallback } = require("node:crypto");
const { promisify } = require("node:util");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const scrypt = promisify(scryptCallback);

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const adminEmail = process.env.ADMIN_EMAIL || "admin@rehilete.local";
const adminPassword = process.env.ADMIN_PASSWORD || "rehilete-admin-dev";
const adminName = process.env.ADMIN_NAME || "Admin Rehilete";

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
  {
    name: "Memo Fromow",
    slug: "memo-fromow",
  },
  {
    name: "Augusto Montero",
    slug: "augusto-montero",
  },
  {
    name: "Isis Arias",
    slug: "isis-arias",
  },
  {
    name: "Equipo Rehilete",
    slug: "equipo-rehilete",
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

async function hashAdminPassword(password) {
  const options = {
    N: 16384,
    r: 8,
    p: 1,
  };
  const salt = randomBytes(16).toString("base64url");
  const keyLength = 64;
  const derivedKey = await scrypt(password, salt, keyLength, options);

  return [
    "scrypt",
    options.N,
    options.r,
    options.p,
    salt,
    derivedKey.toString("base64url"),
  ].join("$");
}

async function main() {
  await prisma.adminUser.upsert({
    where: { email: adminEmail.toLowerCase() },
    update: {
      name: adminName,
      passwordHash: await hashAdminPassword(adminPassword),
      isActive: true,
    },
    create: {
      name: adminName,
      email: adminEmail.toLowerCase(),
      passwordHash: await hashAdminPassword(adminPassword),
      role: "ADMIN",
      isActive: true,
    },
  });

  console.info(`Admin inicial disponible: ${adminEmail.toLowerCase()}`);

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

  const publicationsWithLegacyReviewer = await prisma.publication.findMany({
    where: {
      reviewerId: {
        not: null,
      },
    },
    select: {
      id: true,
      reviewerId: true,
    },
  });

  for (const publication of publicationsWithLegacyReviewer) {
    await prisma.publicationReviewer.upsert({
      where: {
        publicationId_contributorId: {
          publicationId: publication.id,
          contributorId: publication.reviewerId,
        },
      },
      update: {
        position: 0,
      },
      create: {
        publicationId: publication.id,
        contributorId: publication.reviewerId,
        position: 0,
      },
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
