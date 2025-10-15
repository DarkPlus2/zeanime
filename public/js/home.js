document.addEventListener("DOMContentLoaded", async () => {
  const featuredList = document.getElementById("featuredList");

  // Demo anime cards (you can later fetch from API/DB)
  const featuredAnimes = [
    { title: "Naruto", img: "https://cdn.myanimelist.net/images/anime/13/17405.jpg" },
    { title: "Attack on Titan", img: "https://cdn.myanimelist.net/images/anime/10/47347.jpg" },
    { title: "Demon Slayer", img: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg" },
    { title: "Jujutsu Kaisen", img: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg" }
  ];

  featuredAnimes.forEach(anime => {
    const div = document.createElement("div");
    div.classList.add("anime-item");
    div.innerHTML = `
      <img src="${anime.img}" alt="${anime.title}">
      <h3>${anime.title}</h3>
    `;
    featuredList.appendChild(div);
  });
});
