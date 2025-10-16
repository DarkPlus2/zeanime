export default function PlayerEmbed({ url }: { url: string }) {
  if (!url) return null;

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
      <iframe
        src={url}
        allowFullScreen
        className="w-full h-full border-0"
      ></iframe>
    </div>
  );
}
