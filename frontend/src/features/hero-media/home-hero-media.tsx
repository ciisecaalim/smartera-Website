'use client';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { HeroMedia, HeroMediaItem } from './hero-media.data';
import { heroAssetUrl } from './hero-media.data';

export function HomeHeroMedia({ media, fallbackImage, fallbackAlt }: { media?: HeroMedia; fallbackImage: string; fallbackAlt: string }) {
  const items = useMemo<HeroMediaItem[]>(() => {
    if (media?.items?.length) return [...media.items].sort((a, b) => a.sortOrder - b.sortOrder);
    if (media?.videoUrl && media.mediaType === 'VIDEO_ONLY') return [{ id: 'legacy-video', type: 'VIDEO', mediaUrl: media.videoUrl, posterUrl: media.videoPosterUrl, sortOrder: 1 }];
    if (media?.imageUrl) return [{ id: 'legacy-image', type: 'IMAGE', mediaUrl: media.imageUrl, altText: media.imageAlt, sortOrder: 1 }];
    return [{ id: 'fallback-image', type: 'IMAGE', mediaUrl: fallbackImage, altText: fallbackAlt, sortOrder: 1 }];
  }, [media, fallbackImage, fallbackAlt]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const touchStart = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const videoEndTimer = useRef<number | null>(null);
  const autoplay = media?.autoplay ?? true;
  const loopCarousel = media?.loop ?? true;
  const interval = (media?.intervalSeconds ?? 6) * 1000;
  const videoEndDelay = (media?.videoEndDelaySeconds ?? 0) * 1000;
  const current = items[active] || items[0];
  const advance = useCallback(() => {
    setActive((index) => index + 1 < items.length ? index + 1 : loopCarousel ? 0 : index);
  }, [items.length, loopCarousel]);
  const next = useCallback(() => setActive((index) => (index + 1) % items.length), [items.length]);
  const previous = useCallback(() => setActive((index) => (index - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (videoEndTimer.current !== null) {
      window.clearTimeout(videoEndTimer.current);
      videoEndTimer.current = null;
    }
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      if (index === active && items[index]?.type === 'VIDEO') {
        setMuted(true);
        setPlaying(true);
        void video.play().catch(() => setPlaying(false));
      }
    });
  }, [active, items]);

  useEffect(() => {
    if (!autoplay || items.length < 2 || current.type === 'VIDEO') return;
    const timer = window.setTimeout(advance, interval);
    return () => window.clearTimeout(timer);
  }, [active, advance, autoplay, current.type, interval, items.length]);

  const handleVideoEnded = () => {
    setPlaying(false);
    if (!autoplay || items.length < 2) return;
    videoEndTimer.current = window.setTimeout(advance, videoEndDelay);
  };

  const togglePlayback = () => {
    const video = videoRefs.current[active];
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };
  const toggleMuted = () => {
    const video = videoRefs.current[active];
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };
  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (containerRef.current) void containerRef.current.requestFullscreen();
  };
  const controlClass = 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-[#092A55]/80 text-white shadow-lg backdrop-blur transition hover:border-[#F59223] hover:bg-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 focus-visible:ring-offset-[#092A55]';

  return <div ref={containerRef} className="relative h-full min-h-[220px] w-full overflow-hidden bg-slate-950" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
    if (touchStart.current === null || items.length < 2) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) {
      if (distance < 0) next();
      else previous();
    }
    touchStart.current = null;
  }}>
    {items.map((item, index) => {
      const visible = index === active;
      const source = heroAssetUrl(item.mediaUrl);
      const poster = heroAssetUrl(item.posterUrl);
      return <div key={item.id} aria-hidden={!visible} className={'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ' + (visible ? 'z-0 opacity-100' : 'pointer-events-none opacity-0')}>
        {item.type === 'IMAGE'
          ? <Image unoptimized={source.startsWith('http')} src={source} alt={item.altText || fallbackAlt} fill priority={index === 0} loading={index === 0 ? 'eager' : 'lazy'} sizes="(max-width:1279px) 100vw,55vw" className="object-cover" />
          : <video ref={(node) => { videoRefs.current[index] = node; }} autoPlay={visible} muted={visible ? muted : true} playsInline preload={visible ? 'metadata' : 'none'} poster={poster || undefined} onEnded={visible ? handleVideoEnded : undefined} onPlay={() => { if (visible) setPlaying(true); }} onPause={() => { if (visible) setPlaying(false); }} onVolumeChange={(event) => { if (visible) setMuted(event.currentTarget.muted); }} className="h-full w-full object-cover"><source src={source} /></video>}
      </div>;
    })}
    <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-[#092A55]/35 p-1.5 shadow-lg backdrop-blur-md" aria-label="Home hero media controls">
      {items.length > 1 ? <button type="button" onClick={previous} className={controlClass} aria-label="Previous hero slide"><ControlIcon path="M15 18l-6-6 6-6" /></button> : null}
      {current.type === 'VIDEO' ? <>
        <button type="button" onClick={togglePlayback} className={controlClass} aria-label={playing ? 'Pause hero video' : 'Play hero video'}>
          {playing ? <ControlIcon path="M9 5v14M15 5v14" /> : <ControlIcon path="M8 5v14l11-7z" />}
        </button>
        <button type="button" onClick={toggleMuted} className={controlClass} aria-label={muted ? 'Unmute hero video' : 'Mute hero video'}>
          {muted ? <ControlIcon path="M11 5L6 9H2v6h4l5 4V5zM15 9l6 6M21 9l-6 6" /> : <ControlIcon path="M11 5L6 9H2v6h4l5 4V5zM15 9.5a4 4 0 010 5M18 7a7 7 0 010 10" />}
        </button>
      </> : null}
      {items.length > 1 ? <button type="button" onClick={next} className={controlClass} aria-label="Next hero slide"><ControlIcon path="M9 18l6-6-6-6" /></button> : null}
      <button type="button" onClick={toggleFullscreen} className={controlClass} aria-label="Toggle fullscreen hero media"><ControlIcon path="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" /></button>
    </div>
    {items.length > 1 ? <div className="absolute bottom-4 left-4 z-20 flex gap-2" aria-label="Home hero carousel slides">
      {items.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} aria-label={'Show hero slide ' + (index + 1)} aria-current={index === active} className={'h-2.5 rounded-full border border-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ' + (index === active ? 'w-6 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/75')} />)}
    </div> : null}
  </div>;
}

function ControlIcon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>;
}
