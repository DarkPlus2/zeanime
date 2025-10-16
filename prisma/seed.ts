import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Genres ---
  const genres = await prisma.genre.createMany({
    data: [
      { name: "Action" },
      { name: "Adventure" },
      { name: "Comedy" },
      { name: "Fantasy" },
      { name: "Romance" },
      { name: "Sci-Fi" },
      { name: "Drama" },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${genres.count} genres`);

  // --- Users ---
  const user = await prisma.user.upsert({
    where: { email: "dark@zeanime.com" },
    update: {},
    create: {
      name: "Dark",
      email: "dark@zeanime.com",
      avatar: "https://cdn.anilist.co/img/dir/user/avatar.jpg",
    },
  });

  console.log("👤 User created:", user.email);

  // --- Animes ---
  const animes = await prisma.anime.createMany({
    data: [
      {
        title: "Naruto",
        slug: "naruto",
        description:
          "A young ninja strives to become the strongest in his village, overcoming challenges with the power of friendship and determination.",
        image: "https://anilist.co/img/dir/anime/Naruto.jpg",
        coverImage: "https://anilist.co/img/dir/anime/Naruto-cover.jpg",
        category: "Action",
        trailerUrl: "https://www.youtube.com/watch?v=-G9BqkgZXRA",
        status: "COMPLETED",
        releaseDate: new Date("2002-10-03"),
      },
      {
        title: "One Piece",
        slug: "one-piece",
        description:
          "Monkey D. Luffy and his pirate crew explore the Grand Line in search of the world's ultimate treasure — the One Piece.",
        image: "https://anilist.co/img/dir/anime/OnePiece.jpg",
        coverImage: "https://anilist.co/img/dir/anime/OnePiece-cover.jpg",
        category: "Adventure",
        trailerUrl: "https://www.youtube.com/watch?v=MCb13lbVGE0",
        status: "ONGOING",
        releaseDate: new Date("1999-10-20"),
      },
      {
        title: "Jujutsu Kaisen",
        slug: "jujutsu-kaisen",
        description:
          "A high school student becomes host to a powerful curse spirit and joins a secret organization to fight supernatural threats.",
        image: "https://anilist.co/img/dir/anime/JJK.jpg",
        coverImage: "https://anilist.co/img/dir/anime/JJK-cover.jpg",
        category: "Supernatural",
        trailerUrl: "https://www.youtube.com/watch?v=f7R6NA4Yo00",
        status: "ONGOING",
        releaseDate: new Date("2020-10-03"),
      },
    ],
    skipDuplicates: true,
  });

  console.log(`🎬 Created ${animes.count} animes`);

  // --- Add Episodes ---
  const naruto = await prisma.anime.findUnique({ where: { slug: "naruto" } });
  const onePiece = await prisma.anime.findUnique({ where: { slug: "one-piece" } });
  const jjk = await prisma.anime.findUnique({ where: { slug: "jujutsu-kaisen" } });

  if (naruto && onePiece && jjk) {
    await prisma.episode.createMany({
      data: [
        {
          title: "Enter: Naruto Uzumaki!",
          number: 1,
          animeId: naruto.id,
          embedUrl1: "https://filemoon.sx/e/naruto-ep1",
          embedUrl2: "https://abyss.to/e/naruto-ep1",
          embedUrl3: "https://vidstream.to/e/naruto-ep1",
        },
        {
          title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!",
          number: 1,
          animeId: onePiece.id,
          embedUrl1: "https://filemoon.sx/e/onepiece-ep1",
          embedUrl2: "https://abyss.to/e/onepiece-ep1",
          embedUrl3: "https://vidstream.to/e/onepiece-ep1",
        },
        {
          title: "Ryomen Sukuna",
          number: 1,
          animeId: jjk.id,
          embedUrl1: "https://filemoon.sx/e/jjk-ep1",
          embedUrl2: "https://abyss.to/e/jjk-ep1",
          embedUrl3: "https://vidstream.to/e/jjk-ep1",
        },
      ],
      skipDuplicates: true,
    });

    console.log("🎞 Added sample episodes!");
  }

  // --- Add Favorites ---
  if (naruto) {
    await prisma.favorite.create({
      data: {
        userId: user.id,
        animeId: naruto.id,
      },
    });
  }

  console.log("❤️ Added sample favorites!");

  console.log("✅ Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
