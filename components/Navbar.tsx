import { Link, Row, Text } from '@geist-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Popover } from '@geist-ui/react';
import { Menu, X } from '@geist-ui/react-icons';
import Logo from '../public/staticshield.png';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const menuContent = () => {
    return (
      <div className='inline-block'>
        <Popover.Item title className='-my-2'>
          <p className='!px-6 text-lg font-semibold'>StaticShield</p>
        </Popover.Item>
        <div className='hover:!bg-blue-100'>
          <Link href='/login' className=''>
            <Popover.Item className='-my-1'>
              <p className='text-blue-600 !px-6'>Sign In</p>
            </Popover.Item>
          </Link>
        </div>
        <Popover.Item line />
        <div className='hover:!bg-blue-100'>
          <Link href='/login' className=''>
            <Popover.Item className='-my-1'>
              <p className='text-blue-600 !px-6'>Sign Up</p>
            </Popover.Item>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Row className=' border-b border-gray-200 !fixed !bg-gray-50 z-10'>
      <div className='text-gray-700 flex justify-around items-center !min-w-[100vw]'>
        <NextLink href='/'>
          <div className='flex items-center justify-between cursor-pointer select-none'>
            <Image src={Logo} alt='StaticShield' width='30px' height='30px' />
            <Text b p className='ml-2 text-2xl'>
              Static
              <span className='px-1 bg-gray-900 rounded-md text-gray-50'>
                Shield
              </span>
            </Text>
            <sup className='ml-1 text-gray-500'>BETA</sup>
          </div>
        </NextLink>
        <div className='hidden sm:block'>
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
        <div className='block cursor-pointer sm:hidden'>
          <Popover
            onVisibleChange={() => {
              setIsVisible(!isVisible);
            }}
            content={menuContent}
            placement='leftStart'>
            {isVisible ? <X /> : <Menu />}
          </Popover>
        </div>
      </div>
    </Row>
  );
}
