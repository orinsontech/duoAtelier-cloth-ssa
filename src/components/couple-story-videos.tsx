'use client';

import { useRef, useState } from 'react';

const stories = [
  {
    src: 'https://embed-ssl.wistia.com/deliveries/22809aeb63074aa0c6d7db4f5340ee957db61a74.bin',
    poster: '/assets/couple-story-1-poster.jpg',
  },
  {
    src: 'https://embed-ssl.wistia.com/deliveries/1116e7cc6fc6808b3ba0916f09ed1072620e7309.bin',
    poster: '/assets/couple-story-2-poster.jpg',
  },
  {
    src: 'https://embed-ssl.wistia.com/deliveries/9c01e5fee9e5b11af77fc6b57cc947a8cca4553d.bin',
    poster: '/assets/couple-story-3-poster.jpg',
  },
];

export function CoupleStoryVideos() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [mutedIndex, setMutedIndex] = useState<number | null>(null);

  const toggleMute = (i: number) => {
    const video = videoRefs.current[i];
    if (!video) return;
    video.muted = !video.muted;
    setMutedIndex(video.muted ? i : null);
    if (i === stories.length - 1) {
      // last video's audio always stays muted, regardless of the toggle
      video.muted = true;
    }
  };

  const toggle = (i: number) => {
    const video = videoRefs.current[i];
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    // Start the requested video first so the browser ties the play() call
    // directly to this click, then pause the others once it's confirmed
    // playing — pausing them first can race with (and block) the new
    // video's playback on some mobile browsers.
    video
      .play()
      .then(() => {
        videoRefs.current.forEach((other, idx) => {
          if (other && idx !== i) other.pause();
        });
      })
      .catch(() => {});
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {stories.map((v, i) => (
        <div
          key={i}
          className="relative aspect-[9/16] rounded-2xl overflow-hidden ring-1 ring-black/5 bg-ink"
        >
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={v.src}
            poster={v.poster}
            muted={i === stories.length - 1 ? true : undefined}
            playsInline
            preload="metadata"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onPlay={() => setPlayingIndex(i)}
            onPause={() => setPlayingIndex((p) => (p === i ? null : p))}
            onEnded={() => setPlayingIndex(null)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => toggle(i)}
            aria-label={playingIndex === i ? 'Pause video' : 'Play video'}
            className={`absolute inset-0 grid place-items-center transition-colors ${
              playingIndex === i ? 'bg-transparent' : 'bg-ink/10 hover:bg-ink/0'
            }`}
          >
            <span className="grid place-items-center w-14 h-14 rounded-full bg-ivory/90 backdrop-blur text-burgundy text-lg shadow-md">
              {playingIndex === i ? '⏸' : '▶'}
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute(i);
            }}
            aria-label={mutedIndex === i ? 'Unmute video' : 'Mute video'}
            className="absolute bottom-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-ivory/90 backdrop-blur text-burgundy text-sm shadow-md"
          >
            {mutedIndex === i ? '🔇' : '🔊'}
          </button>
        </div>
      ))}
    </div>
  );
}
