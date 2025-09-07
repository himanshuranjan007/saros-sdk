import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Saros SDK Docs',
  tagline: 'Comprehensive guides, tutorials, and examples for building on Solana with Saros Finance SDKs',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://saros-sdk-docs.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'saros-finance', // Usually your GitHub org/user name.
  projectName: 'saros-sdk-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/saros-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Saros SDK Docs',
      logo: {
        alt: 'Saros Logo',
        src: 'img/saros-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://docs.saros.xyz/',
          label: 'Official Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/saros-finance',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/introduction',
            },
            {
              label: 'Quick Start',
              to: '/quick-start',
            },
            {
              label: 'API Reference',
              to: '/api-reference',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/saros',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/sarosfinance',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/sarosfinance',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Official Docs',
              href: 'https://docs.saros.xyz/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/saros-finance',
            },
            {
              label: 'Superteam Challenge',
              href: 'https://earn.superteam.fun/listing/saros-sdk-guide-challenge',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Saros Finance. Built for the Superteam Challenge.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
