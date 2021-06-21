import { Lock, ArrowRight } from '@geist-ui/react-icons';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading, Row, useToasts } from '@geist-ui/react';

export default function Site() {
  const router = useRouter();
  const { id } = router.query;
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callbackUrl, setCallbackUrl] = useState<string>('https://example.com');
  const [toasts, setToast] = useToasts();

  useEffect(() => {
    setCallbackUrl(document.referrer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.post('/api/login-to-site', {
      password: password,
      siteId: id,
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
  };

  return (
    <div>
      <div className='w-screen h-screen max-w-md mx-auto'>
        <div className='text-center pt-[30vh]'>
          <h1 className='mb-5 text-xl font-medium sm:text-2xl'>
            This page is password protected
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
