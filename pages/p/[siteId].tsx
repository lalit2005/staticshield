import { Lock, ArrowRight } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { useState } from 'react';
import axios from 'axios';
import { Loading, Row, useToasts, Text } from '@geist-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { HarperDBRecord } from 'types/interfaces';

export default function Site({ id, title, caption, isLoginBlocked, logoUrl }) {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toasts, setToast] = useToasts();
  const [shownError, setShownError] = useState<boolean>(false);

  if (isLoginBlocked) {
    router.replace('/errors/logins-blocked');
  }

  if (router.query?.invalidtoken == '1') {
    setTimeout(() => {
      !shownError &&
        setToast({
          text: 'The token stored in the browser has been modified by someone manually. Please login again',
          type: 'success',
        });
      setShownError(true);
    }, 1000);
  }
  if (router.query?.expired == '1') {
    setTimeout(() => {
      !shownError &&
        setToast({
          text: 'Your session has been expired.\n Please login again',
          type: 'success',
        });
      setShownError(true);
    }, 1000);
  }

  const handleSubmit = async (e) => {
    if (isLoginBlocked) {
      setToast({ text: 'Login is blocked', type: 'error' });
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/api/login-to-site', {
        password: password,
        siteId: id,
        siteUrl: router.query.redirecturl,
      });
      if (res.data) {
        setIsLoading(false);
      }
      console.log(res.data);
      if (res.data.success) {
        const redirectUrl = new URL(router.query.redirecturl.toString());
        redirectUrl.searchParams.set('token', res.data.token);
        router.replace(redirectUrl);
      }
      if (!res.data.success) {
        setToast({ text: res.data.message, type: 'error' });
      }
    } catch (error) {
      setToast({
        text: 'You have exceeded the rate limit. Try again later',
        type: 'error',
        delay: 5000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='w-screen h-screen max-w-md mx-auto'>
        <div className='text-center pt-[30vh]'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} className='mx-auto mb-8 -mt-12 h-28' alt='' />
          <h1 className='mb-5 text-xl font-medium sm:text-2xl'>
            {title || 'This page is password protected'}
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='password' hidden>
              Enter password
            </label>
            <Lock className='inline-block px-2 !text-gray-400' />
            <input
              type='password'
              name='password'
              id='password'
              autoFocus
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value.toString())}
              className='px-5 py-2 border-b border-gray-400 rounded'
            />
            <button>
              {isLoading ? (
                <Row className='py-[10px] w-[50px] relative bottom-2'>
                  <Loading size='large' />
                </Row>
              ) : (
                <ArrowRight className='inline-block px-3 !text-gray-500 hover:!text-gray-900' />
              )}
            </button>
          </form>
          <p className='!mt-7 text-sm text-gray-700'>{caption}</p>
        </div>
        <NextLink href='/'>
          <div className='relative block mt-40 text-center cursor-pointer hover:underline bottom-4'>
            <span className='text-gray-700'>Powered by</span>
            <div className='!relative !inline-block !w-5 !h-5 !ml-2 !mr-1 !top-px'>
              <Image src={Logo} alt='' />
            </div>
            <span className='font-medium'>StaticShield</span>
          </div>
        </NextLink>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const siteId = params.siteId as string;

  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `SELECT * FROM site_schema.sites where id = "${siteId}"`,
    }),
  });
  const data: HarperDBRecord = (await res.json())[0];

  return {
    props: {
      id: siteId,
      title: data.title || '',
      isLoginBlocked: data.is_login_blocked,
      caption: data.cap,
      logoUrl: data.logo_url || '',
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
