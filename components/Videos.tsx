import React from 'react';
import { VIDEOS, embedUrl } from '../data/videos';
import { VideoEntry } from '../types';

const VideoCard: React.FC<{
  video: VideoEntry;
  onRecommendsClick: () => void;
}> = ({ video, onRecommendsClick }) => {
  const src = embedUrl(video.url);
  return (
    <div className="w-full max-w-[380px] mx-auto flex flex-col rounded-2xl border border-brand-navy/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Vertical 9:16 player for Shorts. Full width on phone, capped on desktop. */}
      <div className="relative w-full bg-black" style={{ aspectRatio: '9 / 16' }}>
        {src ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={src}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
            Video unavailable
          </div>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-extrabold text-brand-navy leading-snug">{video.title}</h3>
        <p className="mt-2 text-sm text-brand-charcoal/70 leading-relaxed flex-grow">
          {video.description}
        </p>
        <p className="mt-4 text-xs text-brand-charcoal/50">
          The products from these videos are on my{' '}
          <a
            href="/recommends"
            onClick={(e) => {
              e.preventDefault();
              onRecommendsClick();
            }}
            className="text-brand-gold font-semibold hover:underline"
          >
            recommended products page
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const Videos: React.FC<{ onRecommendsClick: () => void }> = ({ onRecommendsClick }) => {
  return (
    <div className="pt-14 sm:pt-20 pb-24 bg-brand-cream/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-navy">
            Homeowner Tips
          </h1>
          <div className="h-1.5 w-20 bg-brand-gold rounded-full mt-5 mb-7" />
          <p className="text-base sm:text-lg text-brand-charcoal/70 leading-relaxed">
            Short videos on the problems I see most, and how to catch them early.
          </p>
        </header>

        {/* Video grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
          {VIDEOS.map((video) => (
            <VideoCard key={video.url} video={video} onRecommendsClick={onRecommendsClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
