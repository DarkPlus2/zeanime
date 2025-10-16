import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Genres
  const genres = [
    { name: "Action" },
    { name: "Adventure" },
    { name: "Romance" },
    { name: "Fantasy" },
    { name: "Comedy" },
  ];

  const createdGenres = await Promise.all(
    genres.map((g) =>
      prisma.genre.upsert({
        where: { name: g.name },
        update: {},
        create: g,
      })
    )
  );

  // Animes
  const animes = [
    {
      title: "Attack on Titan",
      description: "Humans fight against giant Titans.",
      image: "https://anilist.co/img/attack-on-titan.jpg",
      category: "Action",
      genreNames: ["Action", "Adventure"],
    },
    {
      title: "Demon Slayer",
      description: "A boy fights demons to save his sister.",
      image: "https://anilist.co/img/demon-slayer.jpg",
      category: "Action",
      genreNames: ["Action", "Fantasy"],
    },
  ];

  for (const anime of animes) {
    const animeEntry = await prisma.anime.create({
      data: {
        title: anime.title,
        description: anime.description,
        image: anime.image,
        category: anime.category,
        genres: {
          connect: anime.genreNames.map((name) => ({
            name,
          })),
        },
      },
    });

   // Episodes
await prisma.episode.createMany({
  data: [
    {
      number: 1,
      title: `${anime.title} Episode 1`,
      embedUrl1: "https://filemoon.sx/embed/ep1",
      embedUrl2: "https://abyss.to/embed/ep1",
      animeId: animeEntry.id,
    },
    {
      number: 2,
      title: `${anime.title} Episode 2`,
      embedUrl1: "https://filemoon.sx/embed/ep2",
      embedUrl2: "https://abyss.to/embed/ep2",
      animeId: animeEntry.id,
    },
  ],
});

  // Favorites (example userId = 1)
  const allAnimes = await prisma.anime.findMany();
  await Promise.all(
    allAnimes.map((anime) =>
      prisma.favorite.create({
        data: { animeId: anime.id, userId: 1 },
      })
    )
  );

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
