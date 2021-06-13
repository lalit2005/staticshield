import { Link, Row, Text } from '@geist-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  if (user) {
    router.push('/dashboard');
  }

  return (
    <Row className=' border-b border-gray-200 !fixed !bg-gray-50 z-10'>
      <div className='text-gray-700 flex justify-around items-center !min-w-[100vw]'>
        <NextLink href='/'>
          <div className='flex items-center justify-between cursor-pointer select-none'>
            <img src='/staticshield.png' alt='StaticShield' width='25px' />
            <Text b p className='ml-2 text-2xl'>
              Static
              <span className='px-1 bg-gray-900 rounded-md text-gray-50'>
                Shield
              </span>
            </Text>
            <sup className='ml-1 text-gray-500'>BETA</sup>
          </div>
        </NextLink>
        <div>
          <div className='inline-block'>
            <NextLink href='/login'>
              <Link block href='/login'>
                Sign Up
              </Link>
            </NextLink>
          </div>
          <div className='inline-block'>
            <NextLink href='/login'>
              <Link block href='/login'>
                Sign In
              </Link>
            </NextLink>
          </div>
        </div>
      </div>
    </Row>
  );
}
