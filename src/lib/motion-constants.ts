/**
 * motion-constants.ts
 * JS-side mirror of the motion tokens defined in specs/tokens/motion.json.
 *
 * Use this file in GSAP handlers and setTimeout calls that cannot read CSS
 * custom properties at runtime. All values stay in sync with the token JSON
 * — if you change a value in motion.json, update this file to match.
 *
 * CSS consumers should use the generated custom properties (--motion-*, etc.)
 * from globals.css instead of importing this module.
 */

export const MOTION = {
  /** Durations in milliseconds — for setTimeout, JS timers, and GSAP `duration` in ms-mode. */
  duration: {
    instant:  100,
    fast:     150,
    base:     200,
    relaxed:  350,
    toast:    4000,   // auto-dismiss delay (--motion-toast-dismiss-ms)
    spinner:  700,    // one full rotation  (--motion-spinner-duration)
    skeleton: 1600,   // one shimmer sweep  (--motion-skeleton-duration)
  },

  /**
   * Durations in seconds — for GSAP `duration` parameter (GSAP uses seconds,
   * not milliseconds). Covers only the animation-relevant durations.
   */
  durationSeconds: {
    instant: 0.1,
    fast:    0.15,
    base:    0.2,
    relaxed: 0.35,
  },

  /** Easing strings — for GSAP `ease` parameter and JS animation APIs. */
  easing: {
    default:     'ease',
    power2Out:   'cubic-bezier(0.22, 1, 0.36, 1)',   // --primitive-easing-power2-out
    power2InOut: 'cubic-bezier(0.45, 0, 0.55, 1)',   // --primitive-easing-power2-in-out
    spinner:     'linear',
    skeleton:    'ease-in-out',
  },

  /** Scale multipliers — for GSAP `scale` property. */
  scale: {
    hover: 1.05,  // --motion-scale-hover
    rest:  1,     // --motion-scale-rest
  },

  /** Opacity values — for GSAP `opacity` property and inline styles. */
  opacity: {
    hover: 0.85,  // --motion-opacity-hover
    rest:  1,
  },
} as const;
