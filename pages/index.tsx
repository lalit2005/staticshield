import { Button, Divider, Page, Text, Link } from '@geist-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import features from '@/lib/features';
import Image from 'next/image';
import Logo from '../public/staticshield.png';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  if (user) {
    router.push('/dashboard');
  }

  return (
    <div className='text-center text-gray-900 bg-gray-50'>
      <div className='block'>
        <Navbar />
      </div>
      <Page>
        <Head>
          <title>StaticShield</title>
          <link rel='icon' href='/staticshield.png' />
        </Head>
        <div className='mx-auto mt-16'>
          <Image
            src={Logo}
            alt=''
            width='160px'
            height='160px'
            placeholder='blur'
            priority={true}
          />
        </div>
        <Text
          className='!font-extrabold mt-12 text-5xl sm:text-7xl bg-gradient-to-r from-black via-gray-600 to-gray-500 !text-transparent bg-clip-text'
          h1>
          Static
          <span className='px-2 bg-gray-900 rounded-xl text-gray-50'>
            Shield
          </span>
        </Text>
        <Text className='text-2xl'>
          StaticShield is the easiest way to{' '}
          <span className='z-10 mx-1 heading-underline isolate whitespace-nowrap'>
            password protect
          </span>{' '}
          <br />
          your static and dyanmic sites.
        </Text>

        <div className='mt-12'>
          <Link href='/signup'>
            <Button
              size='large'
              type='success'
              className='!inline-block ml-2 !shadow-md'>
              Get Started &rarr;
            </Button>
          </Link>
        </div>
        <div className='mt-32'>
          <h2 className='mb-12 text-4xl font-extrabold'>
            Watch password protecting a website in record time
          </h2>
          <div
            style={{ position: 'relative', paddingBottom: '62.5%', height: 0 }}
            className='!max-w-5xl !mx-10'>
            <iframe
              className='shadow-2xl rounded-2xl'
              src={process.env.NEXT_PUBLIC_LOOM_ID}
              frameBorder={0}
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
        <div className='mt-32'>
          <h2 className='mb-12 text-4xl font-extrabold'>Features</h2>
          <div className='flex flex-wrap'>
            {features.map((feature) => {
              return (
                <FeatureCard
                  key={feature.feature}
                  feature={feature.feature}
                  // eslint-disable-next-line react/no-children-prop
                  children={feature.children}
                />
              );
            })}
          </div>
        </div>
      </Page>
      <style jsx>{`
        span.heading-underline {
          position: relative;
        }

        span.heading-underline::after {
          content: '';
          background-color: #bfdbfe;
          border-radius: 3px;
          transform: rotate(-2deg);
          margin: auto;
          position: absolute;
          bottom: -0.125rem;
          left: -0.5rem;
          right: -0.5rem;
          height: 2rem;
          z-index: -1;
        }
      `}</style>
    </div>
  );
}
