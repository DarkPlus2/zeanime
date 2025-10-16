export default function PlayerEmbed({ src }: { src: string }) {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border-2 border-zaccent">
      <iframe
        src={src}
        allowFullScreen
        allow="autoplay; encrypted-media"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
