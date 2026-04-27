'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ImagePlus } from 'lucide-react';
export interface CaseStudy {
  id: string;
  tags: string[];
  title: string;
  description: string;
  outcome: string;
  imagePath: string;
}

interface ElegantCaseStudyCardProps {
  data: CaseStudy;
  onImageUpload?: (file: File) => void;
}

export function ElegantCaseStudyCard({ data, onImageUpload }: ElegantCaseStudyCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseEnter = () => {
    if (data.imagePath) {
      gsap.to(imageRef.current, { scale: 1.05, duration: 0.35, ease: 'power2.out' });
    }
    gsap.to(contentRef.current, { scale: 1.02, duration: 0.35, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (data.imagePath) {
      gsap.to(imageRef.current, { scale: 1, duration: 0.35, ease: 'power2.inOut' });
    }
    gsap.to(contentRef.current, { scale: 1, duration: 0.35, ease: 'power2.inOut' });
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--size-card-radius)',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image slot */}
      <div
        style={{ overflow: 'hidden', aspectRatio: '16 / 9' }}
      >
        {data.imagePath ? (
          <div
            ref={imageRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${data.imagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transformOrigin: 'center center',
            }}
            aria-hidden="true"
          />
        ) : (
          <div
            onClick={() => onImageUpload && fileInputRef.current?.click()}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--size-body-to-body)',
              border: '2px dashed var(--color-border-subtle)',
              backgroundColor: 'var(--color-bg-main)',
              cursor: onImageUpload ? 'pointer' : 'default',
            }}
          >
            {onImageUpload && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImageUpload(file);
                }}
              />
            )}
            <ImagePlus size={24} color="var(--color-text-muted)" strokeWidth={1.5} />
            <span
              style={{
                fontFamily: 'var(--primitive-font-sans)',
                fontSize: 'var(--primitive-font-size-xs)',
                fontWeight: 'var(--primitive-font-weight-regular)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Upload image
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ padding: 'var(--size-card-padding)', transformOrigin: 'center center', willChange: 'transform', backfaceVisibility: 'hidden' }}>
        {/* Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size-tag-gap)',
            marginBottom: 'var(--size-heading-to-sub)',
          }}
        >
          {data.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--primitive-font-sans)',
                fontSize: 'var(--primitive-font-size-xs)',
                fontWeight: 'var(--primitive-font-weight-regular)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--primitive-font-serif)',
            fontSize: 'var(--primitive-font-size-2xl)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            lineHeight: '1.25',
            letterSpacing: '-0.02em',
            color: 'var(--color-text-title)',
            margin: 0,
            marginBottom: 'var(--size-heading-to-body)',
          }}
        >
          {data.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            lineHeight: '1.5',
            color: 'var(--color-text-body)',
            margin: 0,
            marginBottom: 'var(--size-body-to-body)',
          }}
        >
          {data.description}
        </p>

        {/* Outcome */}
        <p
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            lineHeight: '1.5',
            color: 'var(--color-text-accent)',
            margin: 0,
          }}
        >
          {data.outcome}
        </p>
      </div>
    </article>
  );
}
