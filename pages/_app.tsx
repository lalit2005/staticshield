import '@fontsource/inter/variable.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@/styles/globals.css';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { motion } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  return (
    <UserProvider>
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
        <GeistProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </GeistProvider>
      </motion.div>
    </UserProvider>
  );
}

export default MyApp;
