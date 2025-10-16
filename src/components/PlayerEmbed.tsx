type Props = { url: string };

export default function PlayerEmbed({ url }: Props) {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={url}
        className="w-full h-full"
        allowFullScreen
        frameBorder={0}
      />
    </div>
  );
}
