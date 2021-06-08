import { Button, Divider, Page, Text, Link } from '@geist-ui/react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import { useUser } from '@auth0/nextjs-auth0';
import features from '../lib/features';

export default function Home() {
  const { user, error, isLoading } = useUser();

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
        <img
          src='/staticshield.png'
          alt=''
          className='w-40 h-40 mx-auto mt-16'
        />
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
          <Link href={user ? '/dashboard' : '/signup'}>
            <Button
              size='large'
              type='success'
              className='!inline-block ml-2 !shadow-md'>
              {user ? 'Go to Dashboard →' : 'Get started →'}
            </Button>
          </Link>
        </div>

        <Divider className='!mt-20 !mb-12'>
          <span className='-mx-6 text-gray-500 bg-gray-50'>FEATURES</span>
        </Divider>

        <div className='flex flex-wrap'>
          {features.map((feature) => {
            return (
              <FeatureCard
                key={feature.feature}
                feature={feature.feature}
                children={feature.children}
              />
            );
          })}
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
