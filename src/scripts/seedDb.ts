import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/en";

const prisma = new PrismaClient();

async function seedDatabase() {
  console.log("Seeding data...");

  const topLevelParties = [];
  for (let i = 0; i < 5; i++) {
    const party = await prisma.party.create({
      data: {
        id: faker.string.uuid(),
        name: faker.company.name(),
        path: "",
      },
    });
    topLevelParties.push(party);
  }

  for (const parentParty of topLevelParties) {
    const numSubsidiaries = faker.number.int({ min: 2, max: 5 });

    for (let j = 0; j < numSubsidiaries; j++) {
      const subsidiary = await prisma.party.create({
        data: {
          id: faker.string.uuid(),
          name: faker.company.name(),
          ownerId: parentParty.id,
          path: `${parentParty.path}/${parentParty.id}`,
        },
      });

      const numNestedSubsidiaries = faker.number.int({ min: 1, max: 3 });
      for (let k = 0; k < numNestedSubsidiaries; k++) {
        await prisma.party.create({
          data: {
            id: faker.string.uuid(),
            name: faker.company.name(),
            ownerId: subsidiary.id,
            path: `${subsidiary.path}/${subsidiary.id}`,
          },
        });
      }
    }
  }

  console.log("Seeding complete!");
}

seedDatabase()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
