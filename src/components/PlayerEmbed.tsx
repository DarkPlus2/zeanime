export default function PlayerEmbed({ url }) {
  return (
    <div className="aspect-video w-full">
      <iframe src={url} className="w-full h-full" allowFullScreen />
    </div>
  );
}
