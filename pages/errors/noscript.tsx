import Navbar from '@/components/Navbar';
import { Text, Link } from '@geist-ui/react';
import Footer from '@/components/Footer';

export default function NoScriptError() {
  return (
    <div className='min-h-screen text-center'>
      <Navbar />
      <div className='pt-32'>
        <div className='max-w-lg mx-auto'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/noscript-error-banner.png'
            alt='StaticShield requires Javascript'
          />
        </div>
        <div className='max-w-lg mx-auto mt-20'>
          <Text h3>
            StaticShield requires Javascript to be enabled in browsers
          </Text>
          <p>
            Staticshield checks for the valid token, verifies it and redirects
            to login page using Javascript. Please visit{' '}
            <Link
              icon
              color
              target='__blank'
              href='https://enablejavascript.io/#chrome'>
              enablejavascript.io
            </Link>
            to learn how to enable Javascript in your preferred browser
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
