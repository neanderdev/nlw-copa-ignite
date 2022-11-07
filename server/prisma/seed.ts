import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Neander de Souza",
      email: "neander.faria@hotmail.com",
      avatarUrl: "https://github.com/neanderdev.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-07T18:00:00.782Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-07T16:00:00.782Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "BE",

      guesses: {
        create: {
          firstTeamPoins: 2,
          secondTeamPoins: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
