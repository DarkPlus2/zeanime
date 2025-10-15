// pages/watch/[id].tsx
import { useRouter } from 'next/router';
import Player from '../../components/Player';
import AnimeInfo from '../../components/AnimeInfo';
import { getAnimeById } from '../../lib/api';

export default function Watch({ anime }) {
  const router = useRouter();
  if (router.isFallback) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <Player sources={anime.sources} />
      <AnimeInfo anime={anime} />
    </div>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const anime = await getAnimeById(params.id);
  return { props: { anime }, revalidate: 3600 };
}
