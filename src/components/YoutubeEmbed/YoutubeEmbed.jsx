import React, { useMemo } from "react";

/**
 * @param {string} url - YouTube full URL or video ID
 * @param {boolean} autoplay
 * @param {boolean} controls
 */
export default function YoutubeEmbed({
  url,
  autoplay = false,
  controls = true,
}) {
  const videoData = useMemo(() => {
    if (!url) return null;

    // If already video ID
    if (url.length === 11 && !url.includes("http")) {
      return { id: url, start: 0 };
    }

    // Extract ID
    const idMatch = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/,
    );

    // Extract start time (?t=9s or &t=9)
    const timeMatch = url.match(/[?&]t=(\d+)/);

    if (!idMatch) return null;

    return {
      id: idMatch[1],
      start: timeMatch ? timeMatch[1] : 0,
    };
  }, [url]);

  if (!videoData) {
    return (
      <div className="alert alert-warning text-center">
        Invalid YouTube video
      </div>
    );
  }

  const src = `https://www.youtube.com/embed/${videoData.id}?start=${
    videoData.start
  }&autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}`;

  return (
   <div className="container">
     <div className="youtube-wrapper">
      <iframe
        src={src}
        title="YouTube video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
   </div>
  );
}
