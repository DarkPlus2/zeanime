"use client";
import { useState } from "react";

export default function CommentSection({ animeId }: { animeId: number }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log("Submit comment for anime:", animeId, comment);
    setComment("");
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 bg-background"
        />
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          Post
        </button>
      </form>
    </div>
  );
}
