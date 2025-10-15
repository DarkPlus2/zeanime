// components/Player.tsx
interface PlayerProps {
  sources: { url: string; type: string }[];
}

export default function Player({ sources }: PlayerProps) {
  return (
    <div className="w-full aspect-video bg-black mb-4 rounded-lg overflow-hidden shadow-lg">
      <video controls className="w-full h-full">
        {sources.map((source, i) => (
          <source key={i} src={source.url} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
