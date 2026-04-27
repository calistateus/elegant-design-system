import type { Preview } from '@storybook/nextjs-vite'
import '@fontsource/dm-sans'
import '@fontsource/lora'
import '@fontsource/dm-mono'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
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