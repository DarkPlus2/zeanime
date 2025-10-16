import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Genres
  const genres = ["Action", "Adventure", "Romance", "Fantasy", "Comedy"];
  const createdGenres = await Promise.all(
    genres.map((name) =>
      prisma.genre.upsert({
        where: { name },
        update: {},
        create: { name },
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
      episodes: [
        { number: 1, embedUrl1: "https://filemoon.sx/embed/ep1", embedUrl2: "https://abyss.to/embed/ep1" },
        { number: 2, embedUrl1: "https://filemoon.sx/embed/ep2", embedUrl2: "https://abyss.to/embed/ep2" },
      ],
    },
    {
      title: "Demon Slayer",
      description: "A boy fights demons to save his sister.",
      image: "https://anilist.co/img/demon-slayer.jpg",
      category: "Action",
      genreNames: ["Action", "Fantasy"],
      episodes: [
        { number: 1, embedUrl1: "https://filemoon.sx/embed/ep1", embedUrl2: "https://abyss.to/embed/ep1" },
        { number: 2, embedUrl1: "https://filemoon.sx/embed/ep2", embedUrl2: "https://abyss.to/embed/ep2" },
      ],
    },
  ];

  for (const anime of animes) {
  const animeEntry = await prisma.anime.create({
    data: {
      title: anime.title,
      description: anime.description,
      image: anime.image,
      category: anime.category,
      genres: { connect: anime.genreNames.map((name) => ({ name })) },
      episodes: {
        create: anime.episodes.map((ep, index) => ({
          number: ep.number,
          title: `${anime.title} Episode ${ep.number}`, // required
          embedUrl1: ep.embedUrl1,
          embedUrl2: ep.embedUrl2,
        })),
      },
    },
  });
}

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
