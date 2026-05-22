'use client';

import { useEffect } from 'react';

/**
 * Listens for `{ type: 'sb-iframe-resize', height }` messages posted by
 * embedded Storybook iframes and resizes the matching iframe element.
 * Matching is done via event.source === iframe.contentWindow so multiple
 * iframes on the same page each resize independently.
 */
export function IframeAutoResize() {
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.data?.type !== 'sb-iframe-resize') return;
      const height: number = event.data.height;
      if (!height || height <= 0) return;

      const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe.sb-frame');
      for (const iframe of iframes) {
        if (iframe.contentWindow === event.source) {
          iframe.style.height = `${height}px`;
          break;
        }
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return null;
}
