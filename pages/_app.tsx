import '@fontsource/inter/variable.css';
import '../styles/globals.css';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </UserProvider>
  );
}

export default MyApp;
