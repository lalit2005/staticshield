import { Lock, ArrowRight } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import Logo from './public/staticshield.png';
import { useState } from 'react';

export default function Site() {
  const router = useRouter();
  const { siteId } = router.query;
  const [password, setPassword] = useState('');
  return (
    <div>
      <div className='w-screen h-screen max-w-md mx-auto'>
        <div className='text-center pt-[30vh]'>
          <h1 className='mb-5 text-xl font-medium sm:text-2xl'>
            This page is password protected
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(password);
            }}>
            <label htmlFor='password' hidden>
              Enter password
            </label>
            <Lock className='inline-block px-2 !text-gray-400' />
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
              className='px-5 py-2 border-b border-gray-400 rounded'
            />
            <button>
              <ArrowRight className='inline-block px-1 !text-gray-500 hover:!text-gray-900' />
            </button>
          </form>
        </div>
        <NextLink href='/'>
          <p className='relative block mt-40 text-center cursor-pointer hover:underline bottom-4'>
            <span className='text-gray-700'>Powered by</span>
            <div className='!relative !inline-block !w-5 !h-5 !ml-2 !mr-1 !bottom-px'>
              <Image src={Logo} alt='' />
            </div>
            <span className='font-medium'>StaticShield</span>
          </p>
        </NextLink>
      </div>
    </div>
  );
}
