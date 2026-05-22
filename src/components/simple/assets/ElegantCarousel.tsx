'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ImagePlus, Sparkles, Zap, Layers, Globe, ShieldCheck, type LucideIcon } from 'lucide-react';
import { ElegantCaseStudyCard } from '../cards/ElegantCaseStudyCard';
import type { CaseStudy } from '../cards/ElegantCaseStudyCard';
import { ElegantIconCard } from '../cards/ElegantIconCard';
import { ElegantImage } from './ElegantImage';
import { ElegantReferralCard } from '../cards/ElegantReferralCard';

// ─── Generic placeholder data ──────────────────────────────────────────────────

const PLACEHOLDER_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'placeholder-1',
    tags: ['UX Design'],
    title: 'Redesigning the Core Onboarding Flow',
    description: 'Led a cross-functional team to redesign the onboarding experience, simplifying key steps and aligning the visual language across 30+ touchpoints.',
    outcome: '+42% completion rate improvement in post-launch tracking.',
    imagePath: '',
  },
  {
    id: 'placeholder-2',
    tags: ['Product Strategy'],
    title: 'Unifying a Fragmented Dashboard Experience',
    description: 'Audited three legacy dashboards and consolidated them into a single, consistent interface with improved data hierarchy.',
    outcome: 'Reduced support tickets related to navigation by 28%.',
    imagePath: '',
  },
  {
    id: 'placeholder-3',
    tags: ['Design Systems'],
    title: 'Building a Token-Based Component Library',
    description: 'Defined the token architecture and component spec for a shared design system, enabling two product teams to ship faster with fewer inconsistencies.',
    outcome: 'Adopted by 4 teams within the first quarter of release.',
    imagePath: '',
  },
];

const PLACEHOLDER_SPECIALTIES = [
  {
    title: 'Fast by default',
    description: 'Optimised for performance at every layer — from token resolution to render time — so users never wait.',
    iconName: 'Zap',
  },
  {
    title: 'Built to scale',
    description: 'Architecture designed to grow with your team and your users, without accumulating structural debt.',
    iconName: 'Layers',
  },
  {
    title: 'Secure by design',
    description: 'Role-based access, encrypted at rest, and audited continuously so your data stays protected.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Works everywhere',
    description: 'Fully responsive across devices, viewports, and assistive technologies with no extra configuration.',
    iconName: 'Globe',
  },
];

const PLACEHOLDER_REFERRALS = [
  {
    quote: 'Working with this team transformed how we approach product design. Every decision was intentional, every detail considered.',
    name: 'Alex Rivera',
    role: 'VP of Product, Horizon Software',
  },
  {
    quote: 'Reliable, thorough, and genuinely collaborative. The quality of output raised the bar for everyone on the project.',
    name: 'Jordan Lee',
    role: 'Engineering Lead, Vertex Labs',
  },
  {
    quote: 'An exceptional eye for detail and a talent for translating complex requirements into clean, usable interfaces.',
    name: 'Morgan Patel',
    role: 'Head of Design, Clearfield Systems',
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────

export type CarouselCardType = 'case-study' | 'icon' | 'referral' | 'image';

export type ImageSize = 'sm' | 'md' | 'lg' | 'full';
export type ImageRatio = '1/1' | '4/3' | '3/2' | '16/9' | '21/9';

export interface ElegantCarouselProps {
  cardType: CarouselCardType;
  /** Number of slides to generate (2–8) */
  count?: number;
  /** Number of slides visible at once (1–4, default 1) */
  slidesVisible?: 1 | 2 | 3 | 4;
  /** Automatically advance slides */
  autoSlide?: boolean;
  /** Auto-slide interval in ms (default 4000) */
  autoSlideInterval?: number;
  /** Alt text for all image slides (image variant only) */
  imageAlt?: string;
  /** Caption shown below all image slides (image variant only) */
  imageCaption?: string;
  /** Display size for image slides (image variant only) */
  imageSize?: ImageSize;
  /** Aspect ratio applied to all image slides — auto not allowed (image variant only) */
  imageRatio?: ImageRatio;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function cycle<T>(source: readonly T[], count: number): T[] {
  if (source.length === 0) return [];
  return Array.from({ length: count }, (_, i) => source[i % source.length]);
}

const ICON_MAP: Record<string, LucideIcon> = { Zap, Layers, Globe, ShieldCheck, Sparkles };

// ─── Image slide (upload-capable) ─────────────────────────────────────────────

const IMAGE_SIZE_CLASSES: Record<ImageSize, string> = {
  sm:   'w-full md:w-1/2 lg:w-1/3',
  md:   'w-full md:w-3/4 lg:w-1/2',
  lg:   'w-full lg:w-2/3',
  full: 'w-full',
};

interface ImageSlideProps {
  src: string | null;
  alt: string;
  caption?: string;
  ratio: ImageRatio;
  onUpload: (file: File) => void;
}

function ImageSlide({ src, alt, caption, ratio, onUpload }: ImageSlideProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onUpload(file);
      }}
    />
  );

  if (src) {
    return (
      <div style={{ position: 'relative', cursor: 'pointer', width: '100%' }} onClick={() => fileInputRef.current?.click()} title="Click to replace">
        {fileInput}
        <ElegantImage src={src} alt={alt} size="full" ratio={ratio} caption={caption} />
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      style={{
        aspectRatio: ratio,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--size-body-to-body)',
        border: '2px dashed var(--color-border-subtle)',
        borderRadius: 'var(--size-card-radius)',
        backgroundColor: 'var(--color-bg-surface)',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      {fileInput}
      <ImagePlus size={24} color="var(--color-text-muted)" strokeWidth={1.5} />
      <span style={{ fontSize: 'var(--primitive-font-size-xs)', fontWeight: 'var(--primitive-font-weight-regular)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
        Upload image
      </span>
    </div>
  );
}

// ─── Slide builder ─────────────────────────────────────────────────────────────

function buildSlides(
  cardType: CarouselCardType,
  count: number,
  uploadedImages: (string | null)[],
  onImageUpload: (index: number, file: File) => void,
  imageAlt: string,
  imageCaption: string,
  imageSize: ImageSize,
  imageRatio: ImageRatio,
): React.ReactNode[] {
  switch (cardType) {
    case 'case-study': {
      return cycle(PLACEHOLDER_CASE_STUDIES, count).map((cs, i) => (
        <ElegantCaseStudyCard
          key={i}
          data={{ ...cs, imagePath: uploadedImages[i] ?? '' }}
          onImageUpload={(file) => onImageUpload(i, file)}
        />
      ));
    }
    case 'icon': {
      return cycle(PLACEHOLDER_SPECIALTIES, count).map((item, i) => (
        <ElegantIconCard
          key={i}
          icon={ICON_MAP[item.iconName] ?? Sparkles}
          heading={item.title}
          description={item.description}
        />
      ));
    }
    case 'referral': {
      return cycle(PLACEHOLDER_REFERRALS, count).map((r, i) => (
        <ElegantReferralCard key={i} quote={r.quote} name={r.name} title={r.role} />
      ));
    }
    case 'image': {
      return Array.from({ length: count }, (_, i) => (
        <ImageSlide
          key={i}
          src={uploadedImages[i] ?? null}
          alt={imageAlt}
          caption={imageCaption}
          ratio={imageRatio}
          onUpload={(file) => onImageUpload(i, file)}
        />
      ));
    }
  }
}

// ─── Arrow button ──────────────────────────────────────────────────────────────

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  label: string;
}

function ArrowButton({ direction, onClick, label }: ArrowButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.75rem',
        height: '2.75rem',
        borderRadius: '50%',
        border: '1px solid var(--color-border-subtle)',
        backgroundColor: 'var(--color-bg-main)',
        cursor: 'pointer',
        color: 'var(--color-text-body)',
        opacity: hovered ? 1 : 0.85,
        transition: `opacity var(--primitive-duration-fast) var(--primitive-easing-default), box-shadow var(--primitive-duration-fast) var(--primitive-easing-default)`,
        boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.10)' : '0 1px 3px rgba(0,0,0,0.06)',
        padding: 0,
        flexShrink: 0,
      }}
    >
      {direction === 'left'
        ? <ChevronLeft size={16} strokeWidth={1.75} />
        : <ChevronRight size={16} strokeWidth={1.75} />
      }
    </button>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ElegantCarousel({
  cardType,
  count = 4,
  slidesVisible = 1,
  autoSlide = false,
  autoSlideInterval = 4000,
  imageAlt = '',
  imageCaption = '',
  imageSize = 'full',
  imageRatio = '16/9',
}: ElegantCarouselProps) {
  const safeCount = clamp(Math.floor(count), 2, 8);

  // ── Per-slide image uploads (case-study + image variants) ─────────────────
  const [uploadedImages, setUploadedImages] = useState<(string | null)[]>(
    () => Array(safeCount).fill(null),
  );

  useEffect(() => {
    setUploadedImages((prev) => {
      const next: (string | null)[] = Array(safeCount).fill(null);
      prev.forEach((img, i) => { if (i < safeCount) next[i] = img; });
      return next;
    });
  }, [safeCount]);

  const handleImageUpload = useCallback((index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setUploadedImages((prev) => {
        const next = [...prev];
        next[index] = dataUrl;
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const slides = buildSlides(
    cardType,
    safeCount,
    uploadedImages,
    handleImageUpload,
    imageAlt,
    imageCaption,
    imageSize,
    imageRatio,
  );

  const maxIndex = Math.max(0, slides.length - slidesVisible);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => setCurrentIndex(Math.max(0, Math.min(index, maxIndex))),
    [maxIndex],
  );

  const goPrev = useCallback(
    () => setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1)),
    [maxIndex],
  );

  const goNext = useCallback(
    () => setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1)),
    [maxIndex],
  );

  useEffect(() => {
    if (!autoSlide || slides.length <= slidesVisible) return;
    const id = setInterval(goNext, autoSlideInterval);
    return () => clearInterval(id);
  }, [autoSlide, autoSlideInterval, goNext, slides.length, slidesVisible]);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const slideWidthPct = 100 / slidesVisible;
  const dotCount = maxIndex + 1;
  const showNav = slides.length > slidesVisible;

  return (
    <div className={cardType === 'image' ? IMAGE_SIZE_CLASSES[imageSize] : 'w-full'}>
      {/* ── Row: arrows + track ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-card-gap)' }}>
        {showNav && <ArrowButton direction="left" onClick={goPrev} label="Previous slide" />}

        <div style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              transform: `translateX(${-(currentIndex * slideWidthPct)}%)`,
              transition: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'none'
                : `transform var(--primitive-duration-relaxed) var(--primitive-easing-power2-out)`,
              alignItems: 'stretch',
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                style={{
                  flex: `0 0 ${slideWidthPct}%`,
                  width: `${slideWidthPct}%`,
                  boxSizing: 'border-box',
                  paddingLeft: i === 0 ? '0' : `calc(var(--size-card-gap) / 2)`,
                  paddingRight: i === slides.length - 1 ? '0' : `calc(var(--size-card-gap) / 2)`,
                  ...(slidesVisible >= 2 && { display: 'flex' }),
                }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showNav && <ArrowButton direction="right" onClick={goNext} label="Next slide" />}
      </div>

      {/* ── Dot pagination ─────────────────────────────────────────────────── */}
      {dotCount > 1 && (
        <div
          role="tablist"
          aria-label="Carousel navigation"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--size-tag-gap)',
            marginTop: 'var(--size-heading-to-body)',
          }}
        >
          {Array.from({ length: dotCount }, (_, i) => {
            const active = i === currentIndex;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                style={{
                  width: active ? '1.25rem' : '0.5rem',
                  height: '0.5rem',
                  borderRadius: 'var(--primitive-radius-full)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  backgroundColor: active
                    ? 'var(--color-text-body)'
                    : 'var(--color-border-subtle)',
                  transition: `background-color var(--primitive-duration-base) var(--primitive-easing-default), width var(--primitive-duration-base) var(--primitive-easing-power2-out)`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
