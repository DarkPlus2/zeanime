import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Player from "../../components/Player";
import AnimeInfo from "../../components/AnimeInfo";
import EpisodeList from "../../components/EpisodeList";

const WatchPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [anime, setAnime] = useState<any>(null);
  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [server, setServer] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/animes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnime(data);
        if (data.episodes?.length > 0) {
          setCurrentEpisode(data.episodes[0]);
          setServer(data.episodes[0].servers[0]);
        }
      });
  }, [id]);

  if (!anime) return <p>Loading...</p>;

  return (
    <div className="container py-6 space-y-6">
      <Player server={server} />
      <AnimeInfo anime={anime} />
      <div>
        <h2 className="text-xl font-semibold mb-2">Episodes</h2>
        <EpisodeList
          episodes={anime.episodes}
          currentEpId={currentEpisode?.id}
          onSelect={(ep) => {
            setCurrentEpisode(ep);
            setServer(ep.servers[0]);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {currentEpisode?.servers?.map((s: any) => (
          <button
            key={s.id}
            onClick={() => setServer(s)}
            className={`px-3 py-1 rounded ${
              server?.id === s.id ? "bg-primary text-white" : "bg-panel"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
