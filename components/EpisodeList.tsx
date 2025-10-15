import React from "react";

const EpisodeList: React.FC<{
  episodes: any[];
  onSelect: (ep: any) => void;
  currentEpId?: number;
}> = ({ episodes, onSelect, currentEpId }) => (
  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 mt-4">
    {episodes.map((ep) => (
      <button
        key={ep.id}
        onClick={() => onSelect(ep)}
        className={`py-2 text-sm rounded-lg transition ${
          ep.id === currentEpId
            ? "bg-primary text-white"
            : "bg-panel hover:bg-gray-700"
        }`}
      >
        Ep {ep.episode_number}
      </button>
    ))}
  </div>
);

export default EpisodeList;
