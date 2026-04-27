type ImageSize = 'sm' | 'md' | 'lg' | 'full';
type ImageRatio = 'auto' | '1/1' | '4/3' | '3/2' | '16/9' | '21/9';

// Breakpoint-aligned column spans (4-col → 8-col → 12-col grid):
//   sm:   4/4 → 4/8 (50%)  → 4/12 (33%)
//   md:   4/4 → 6/8 (75%)  → 6/12 (50%)
//   lg:   4/4 → 8/8 (100%) → 8/12 (67%)
//   full: always 100%
const sizeClasses: Record<ImageSize, string> = {
  sm:   'w-full md:w-1/2 lg:w-1/3',
  md:   'w-full md:w-3/4 lg:w-1/2',
  lg:   'w-full lg:w-2/3',
  full: 'w-full',
};

interface ElegantImageProps {
  src: string;
  alt: string;
  size?: ImageSize;
  ratio?: ImageRatio;
  caption?: string;
  className?: string;
}

export function ElegantImage({
  src,
  alt,
  size = 'md',
  ratio = 'auto',
  caption,
  className = '',
}: ElegantImageProps) {
  return (
    <figure
      className={`${sizeClasses[size]}${className ? ` ${className}` : ''}`}
      style={{
        margin: 0,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--primitive-scale-2)',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          aspectRatio: ratio === 'auto' ? undefined : ratio,
          objectFit: ratio === 'auto' ? undefined : 'cover',
          borderRadius: 'var(--primitive-radius-md)',
          backgroundColor: 'var(--color-bg-surface)',
        }}
      />
      {caption && (
        <figcaption
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-xs)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            lineHeight: 1.5,
            color: 'var(--color-text-muted)',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
