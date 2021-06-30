import Navbar from '@/components/Navbar';
import { Page } from '@geist-ui/react';
import Banner from '../public/frameworks.png';
import Image from 'next/image';
import RotatingText from 'react-rotating-text';
import frameworks from '@/lib/frameworks';
import FrameworkCard from '@/components/FrameworkCard';
import Footer from '@/components/Footer';

const With = () => {
  return (
    <div>
      <Navbar />
      <Page className='!pt-24 text-center'>
        <div>
          <div className='max-w-2xl mx-auto'>
            <Image src={Banner} alt='' placeholder='blur' />
          </div>
          <div>
            <h1 className='text-4xl font-bold '>
              Use StaticShield with{' '}
              <RotatingText
                items={[
                  'React',
                  'Next.js',
                  'Preact',
                  'Svelte',
                  'SvelteKit',
                  'Gatsby',
                  'Vue',
                  'Nuxt.js',
                  "Good ol' HTML",
                  'any framework',
                ]}
              />
            </h1>
          </div>
          <div className='flex flex-wrap mt-20 gap-x-2'>
            {frameworks.map(({ name, link, img }) => (
              <FrameworkCard name={name} link={link} img={img} key={name} />
            ))}
          </div>
        </div>
      </Page>
      <Footer />
    </div>
  );
};

export default With;
