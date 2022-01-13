import { FrameworkCardProps } from '../types/interfaces';
import Next from '../public/frameworks/nextjs.png';
import Svelte from '../public/frameworks/svelte.png';
import SvelteKit from '../public/frameworks/svelte.png';
import Preact from '../public/frameworks/preact.png';
import React from '../public/frameworks/react.png';
import Vue from '../public/frameworks/vue.png';
import Nuxt from '../public/frameworks/nuxtjs.png';
import Gatsby from '../public/frameworks/gatsby.png';
import Angular from '../public/frameworks/angular.png';

const frameworks: FrameworkCardProps[] = [
  {
    name: 'Next.js',
    img: Next,
    link: '/docs/with/nextjs-11',
  },

  {
    name: 'SvelteKit',
    img: SvelteKit,
    link: '/docs/with/sveltekit',
  },
  {
    name: 'Gatsby',
    img: Gatsby,
    link: '/docs/with/gatsby',
  },
  {
    name: 'Nuxt.js',
    img: Nuxt,
    link: '/docs/with/nuxtjs',
  },
  {
    name: 'Angular',
    img: Angular,
    link: '/docs/with/angular',
  },
  {
    name: 'React',
    img: React,
    link: '/docs/with/react',
  },
  {
    name: 'Preact',
    img: Preact,
    link: '/docs/with/preact',
  },
  {
    name: 'Svelte',
    img: Svelte,
    link: '/docs/with/svelte',
  },
  {
    name: 'Vue',
    img: Vue,
    link: '/docs/with/vue',
  },
];

export default frameworks;
