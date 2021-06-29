import { Link, Text } from '@geist-ui/react';
import NextLink from 'next/link';

const Footer: React.FC<{ alignRight?: boolean }> = ({ alignRight = true }) => {
  return (
    <div className='py-10 mt-5 px-7 bg-warmgray-100'>
      <div
        className={`grid max-w-xl grid-cols-2 ${alignRight && 'sm:mx-auto'}`}>
        <div className='grid gap-x-2 gap-y-3'>
          <Text small className='mt-2 uppercase !font-bold !text-left'>
            Frameworks
          </Text>
          <NextLink href='/docs/with/nextjs-11'>
            <Link underline>Nextjs 11</Link>
          </NextLink>
          <NextLink href='/docs/with/nextjs'>
            <Link underline>Nextjs</Link>
          </NextLink>
          <NextLink href='/docs/with/svelte'>
            <Link underline>Svelte</Link>
          </NextLink>
          <NextLink href='/docs/with/sveltekit'>
            <Link underline>Svelte Kit</Link>
          </NextLink>
          <NextLink href='/docs/with/vue'>
            <Link underline>Vuejs</Link>
          </NextLink>
          <NextLink href='/docs/with/vue'>
            <Link underline>Nuxtjs</Link>
          </NextLink>
          <NextLink href='/docs/with/vue'>
            <Link underline>React</Link>
          </NextLink>
          <NextLink href='/docs/with/vue'>
            <Link underline>Gatsby</Link>
          </NextLink>
          <NextLink href='/docs/with/vue'>
            <Link underline>HTML</Link>
          </NextLink>
        </div>
        <div className='flex flex-col'>
          <Text small className='mt-2 uppercase !font-bold !text-left'>
            Useful Links
          </Text>
          <NextLink href='/with'>
            <Link underline className='mt-2'>
              Guides
            </Link>
          </NextLink>
          <NextLink href='/docs/'>
            <Link underline className='mt-2'>
              Docs
            </Link>
          </NextLink>
          <NextLink href='/with'>
            <Link underline className='mt-2'>
              Support
            </Link>
          </NextLink>
          <Link href='https://github.com/Lalit2005' underline className='mt-2'>
            Made by Lalit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
