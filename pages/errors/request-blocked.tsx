import Navbar from '@/components/Navbar';
import { Text, Link } from '@geist-ui/react';
import Footer from '@/components/Footer';

export default function NoScriptError() {
  return (
    <div className='min-h-screen text-center'>
      <Navbar />
      <div className='pt-32'>
        <div className='max-w-lg mx-auto'></div>
        <div className='max-w-lg mx-auto mt-20'>
          <Text h3>StaticShield has to make Network requests</Text>
          <p>
            Staticshield checks for the valid token, verifies it and redirects
            to login page using Javascript. All this is done by the script that
            is loaded externally. Please enable network requests in your
            browser.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
