import '@fontsource/inter/variable.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@/styles/globals.css';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Script from 'next/script';
import ProgressBar from 'nextjs-progressbar';

function MyApp({ Component, pageProps, router }) {
  return (
    <UserProvider>
      {process.env.NODE_ENV !== 'development' && (
        <Script
          strategy='afterInteractive'
          data-domains='staticshield.vercel.app'
          data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
          src={process.env.NEXT_PUBLIC_ANALYTICS_URL}></Script>
      )}
      <Head>
        <link rel='preconnect' href='https://vitals.vercel-insights.com/' />
        <link rel='manifest' href='/manifest.json' />

        <>
          <link
            rel='icon'
            type='image/png'
            sizes='196x196'
            href='/icons/favicon-196.png'
          />
          <link rel='apple-touch-icon' href='/icons/apple-icon-180.png' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2048-2732.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2732-2048.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1668-2388.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2388-1668.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1536-2048.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2048-1536.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1668-2224.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2224-1668.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1620-2160.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2160-1620.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1284-2778.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2778-1284.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1170-2532.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2532-1170.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1125-2436.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2436-1125.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1242-2688.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2688-1242.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-828-1792.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1792-828.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1242-2208.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-2208-1242.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-750-1334.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1334-750.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-640-1136.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
          />
          <link
            rel='apple-touch-startup-image'
            href='/icons/apple-splash-dark-1136-640.jpg'
            media='(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
          />
        </>
      </Head>
      <motion.div
        key={router.route}
        initial='pageInitial'
        animate='pageAnimate'
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}>
        <ProgressBar height={3} color='#0170F3' />
        <GeistProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </GeistProvider>
      </motion.div>
    </UserProvider>
  );
}

export default MyApp;
