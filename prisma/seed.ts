import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Zeanime seed...");

  // Clear old data
  await prisma.comment.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.episode.deleteMany();
  await prisma.anime.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Old data cleared.");

  // Create users
  const user = await prisma.user.create({
    data: {
      name: "Dark",
      email: "dark@example.com",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
  });

  // Create genres
  const genres = await prisma.genre.createMany({
    data: [
      { name: "Action" },
      { name: "Adventure" },
      { name: "Fantasy" },
      { name: "Drama" },
      { name: "Sci-Fi" },
      { name: "Comedy" },
    ],
  });

  const genreList = await prisma.genre.findMany();

  // Create anime entries
  const naruto = await prisma.anime.create({
    data: {
      title: "Naruto",
      description:
        "A young ninja strives to become the strongest leader of his village — the Hokage.",
      image:
        "https://cdn.myanimelist.net/images/anime/13/17405l.jpg",
      coverImage:
        "https://cdn.myanimelist.net/images/anime/5/17407.jpg",
      category: "Shonen",
      rating: 8.2,
      releaseDate: new Date("2002-10-03"),
      status: "Completed",
      type: "TV",
      genres: {
        connect: [
          { id: genreList.find((g) => g.name === "Action")?.id },
          { id: genreList.find((g) => g.name === "Adventure")?.id },
        ].filter(Boolean) as { id: number }[],
      },
      episodes: {
        create: [
          {
            title: "Enter: Naruto Uzumaki!",
            number: 1,
            description: "The story of a mischievous ninja begins.",
            embedUrl1: "https://filemoon.sx/e/naruto-episode-1",
            embedUrl2: "https://abyss.to/e/naruto-episode-1",
          },
          {
            title: "My Name is Konohamaru!",
            number: 2,
            description: "Naruto meets his rival, Konohamaru.",
            embedUrl1: "https://filemoon.sx/e/naruto-episode-2",
          },
        ],
      },
    },
    include: { episodes: true, genres: true },
  });

  const onePiece = await prisma.anime.create({
    data: {
      title: "One Piece",
      description:
        "Monkey D. Luffy sets out to become the King of the Pirates.",
      image:
        "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
      coverImage:
        "https://cdn.myanimelist.net/images/anime/2/73249.jpg",
      category: "Shonen",
      rating: 9.1,
      releaseDate: new Date("1999-10-20"),
      status: "Ongoing",
      type: "TV",
      genres: {
        connect: [
          { id: genreList.find((g) => g.name === "Adventure")?.id },
          { id: genreList.find((g) => g.name === "Comedy")?.id },
        ].filter(Boolean) as { id: number }[],
      },
      episodes: {
        create: [
          {
            title: "I’m Luffy! The Man Who’s Gonna Be King of the Pirates!",
            number: 1,
            description: "Luffy begins his grand adventure.",
            embedUrl1: "https://filemoon.sx/e/onepiece-ep1",
          },
        ],
      },
    },
    include: { episodes: true, genres: true },
  });

  // Create favorites
  await prisma.favorite.create({
    data: {
      userId: user.id,
      animeId: naruto.id,
    },
  });

  // Add comments
  await prisma.comment.create({
    data: {
      content: "Naruto is nostalgic and still great!",
      rating: 9.0,
      userId: user.id,
      animeId: naruto.id,
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
