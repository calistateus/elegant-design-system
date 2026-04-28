import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/nextjs-vite",
  viteFinal: async (config) => {
    // Alias fix
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> ?? {}),
      '@storybook/blocks': '@storybook/addon-docs/blocks',
    };

    // Pre-bundle heavy deps once at startup so individual story imports
    // don't trigger transforms on first navigation (lazy compilation).
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'gsap',
        'lucide-react',
      ],
    };

    // Only pre-warm the global stylesheet; story modules compile on demand.
    config.server = {
      ...config.server,
      warmup: {
        clientFiles: ['../src/app/globals.css'],
      },
    };

    return config;
  },
};
export default config;