import {
  Avatar,
  Badge,
  Button,
  Link,
  Popover,
  Text,
  Tooltip,
} from '@geist-ui/react';
import { DashboardNavbarProps } from '@/lib/interfaces';
import NextLink from 'next/link';
import Image from 'next/image';
import Logo from '../../public/staticshield.png';
import { Book, LogOut, PlusSquare, Smile, User } from '@geist-ui/react-icons';

export default function DashboardNavbar(props: DashboardNavbarProps) {
  const { user, isNewSiteButtonVisible } = props;

  const avatarPopoverContent = () => {
    return (
      <div className='!min-w-[200px]'>
        <Popover.Item>
          <p className='!block font-bold'>
            <User className='inline-block w-5 h-5 mr-3' />
            {user?.name}
          </p>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item className='md:!hidden'>
          <Link block href='/new' className='-mx-5'>
            <p className='!font-bold -my-1'>
              <PlusSquare className='inline-block w-5 h-5 mr-3' />
              Add new site
            </p>
          </Link>
        </Popover.Item>
        <Popover.Item line className='md:!hidden' />
        <Popover.Item>
          <Link block href='/logout' className='-mx-5'>
            <p className='!font-bold -my-1'>
              <LogOut className='inline-block w-5 h-5 mr-3' />
              Logout
            </p>
          </Link>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <Link block href='#' className='font-bold'>
            <p className='-my-1 !font-bold'>
              <Smile className='inline-block w-5 h-5 mr-3' />
              Support
            </p>
          </Link>
        </Popover.Item>
        <Popover.Item line />

        <Popover.Item>
          <Link block href='#' className='font-bold'>
            <p className='-my-1 !font-bold'>
              <Book className='inline-block w-5 h-5 mr-3' />
              Docs
            </p>
          </Link>
        </Popover.Item>
      </div>
    );
  };

  return (
    <div className='fixed z-30 flex items-center justify-between w-full px-16 mb-12 border-b border-gray-200 bg-gray-50'>
      <NextLink href='/dashboard'>
        <div className='flex items-center justify-between cursor-pointer select-none'>
          <Image src={Logo} alt='StaticShield' width='30px' height='30px' />
          <Text b p className='ml-2 text-2xl'>
            Static
            <span className='px-1 bg-gray-900 rounded-md text-gray-50'>
              Shield
            </span>
          </Text>
          <span>
            <sup className='ml-1 text-gray-500'>BETA</sup>
          </span>
          <Badge
            type='success'
            size='small'
            className='invisible ml-2 sm:visible'>
            <strong>DASHBOARD</strong>
          </Badge>
        </div>
      </NextLink>
      <div className='absolute right-48'>
        <div className='flex items-center justify-between'>
          {isNewSiteButtonVisible && (
            <Tooltip
              text='Password protect a new website'
              placement='leftStart'
              enterDelay={200}
              type='dark'>
              <NextLink href='/new'>
                <Button
                  size='small'
                  auto
                  type='success'
                  className='invisible mr-3 sm:visible'>
                  Add new site
                  <PlusSquare className='inline-block w-5 h-5 ml-2' />
                </Button>
              </NextLink>
            </Tooltip>
          )}
          <div className='-mt-2 asdasdasd'>
            <Popover content={avatarPopoverContent} placement='leftStart'>
              <Tooltip
                text={user?.email}
                type='dark'
                className='!-my-5'
                placement='leftStart'>
                <Avatar
                  src={user?.picture}
                  size='small'
                  className='cursor-pointer'
                />
              </Tooltip>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
