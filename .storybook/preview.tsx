import React, { useEffect } from 'react'
import type { Preview } from '@storybook/nextjs-vite'
import '@fontsource/dm-sans'
import '@fontsource/lora'
import '@fontsource/dm-mono'
import '../src/app/globals.css'

// Reads URL synchronously — safe because Storybook always runs in the browser.
function isEmbedMode() {
  return new URLSearchParams(window.location.search).get('embed') === '1';
}

function StoryFrame({ children }: { children: React.ReactNode }) {
  const embed = isEmbedMode();

  useEffect(() => {
    if (!embed) return;

    // Hide scrollbar track visually without disabling scroll interactions.
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        scrollbar-width: none;        /* Firefox */
        -ms-overflow-style: none;     /* IE/Edge */
      }
      html::-webkit-scrollbar,
      body::-webkit-scrollbar { display: none; }  /* Chrome/Safari */
    `;
    document.head.appendChild(style);

    const send = () => {
      window.parent?.postMessage(
        { type: 'sb-iframe-resize', height: document.body.scrollHeight },
        '*',
      );
    };
    const ro = new ResizeObserver(send);
    ro.observe(document.body);
    send();

    return () => {
      style.remove();
      ro.disconnect();
    };
  }, [embed]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: embed ? 'flex-start' : 'center',
      minHeight: embed ? 'auto' : '100vh',
      padding: embed ? '24px' : '0',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  );
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <StoryFrame><Story /></StoryFrame>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
