import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ABP React',
  tagline: 'A React framework for building applications with ABP Framework',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.abpjs.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'abpjs', // Usually your GitHub org/user name.
  projectName: 'abp-react', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    // Additional meta tags for broader platform support
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#3182ce', // Mobile browser theme color
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/logo.png',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card for link previews (WhatsApp, Facebook, Twitter, LinkedIn, etc.)
    image: 'img/abp-react-social-card.jpg',
    metadata: [
      // Open Graph (Facebook, WhatsApp, LinkedIn, Discord, Telegram)
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ABP React' },
      { property: 'og:title', content: 'ABP React - React UI for ABP Framework' },
      { property: 'og:description', content: 'A collection of React packages providing UI components and services for building applications with ABP Framework. TypeScript-first with pre-built modules for authentication, identity, permissions, and multi-tenancy.' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'ABP React - React UI for ABP Framework' },
      { name: 'twitter:description', content: 'React packages for ABP Framework with pre-built components for authentication, identity management, permissions, and multi-tenancy.' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ABP React',
      logo: {
        alt: 'ABP React Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://www.abpjs.io',
          label: 'abpjs.io',
          position: 'right',
        },
        {
          href: 'https://github.com/abpjs/abp-react',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/abpjs/abp-react/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'abpjs.io',
              href: 'https://www.abpjs.io',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/abpjs/abp-react',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/org/abpjs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} abpjs.io. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
