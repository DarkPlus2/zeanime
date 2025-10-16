type PlayerEmbedProps = { url: string };

export default function PlayerEmbed({ url }: PlayerEmbedProps) {
  if (!url) {
    return <div className="text-sm text-gray-500">No stream available.</div>;
  }

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-800">
      <iframe
        src={url}
        className="w-full h-full"
        allowFullScreen
        referrerPolicy="no-referrer"
      ></iframe>
    </div>
  );
}
