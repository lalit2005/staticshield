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
          <Text h3>Logins are blocked to this site</Text>
          <p>
            Logins to this site are temporarily blocked. If you are the site
            owner, visit the `Advanced` tab under settings for this site in
            StaticShield dashboard.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
