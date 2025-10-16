import { prisma } from "@/lib/db";
import { GetServerSideProps } from "next";

export default function Watch({ episode }: any) {
  return (
    <div className="bg-zbg text-white min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl mb-3 font-bold">{episode.title}</h1>
      <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl">
        <iframe
          src={episode.embedUrl}
          className="w-full h-[70vh] rounded-lg border-2 border-zaccent"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const episode = await prisma.episode.findUnique({
    where: { id: String(params?.id) },
  });
  return { props: { episode } };
};
