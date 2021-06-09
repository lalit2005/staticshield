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
import { PlusSquare } from '@geist-ui/react-icons';

export default function DashboardNavbar(props: DashboardNavbarProps) {
  const { user, isNewSiteButtonVisible } = props;

  const avatarPopoverContent = () => {
    return (
      <div className='!min-w-[200px]'>
        <Popover.Item>
          <Tooltip
            text={user?.email}
            type='success'
            className='!-my-5'
            placement='left'>
            <p className='!block font-bold'>{user?.name}</p>
          </Tooltip>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <Link block href='/logout' className='font-bold'>
            Logout
          </Link>
        </Popover.Item>
        <Popover.Item line />
        <Popover.Item>
          <Link block href='#' className='font-bold'>
            Support
          </Link>
        </Popover.Item>
        <Popover.Item line />

        <Popover.Item>
          <Link block href='#' className='font-bold'>
            Docs
          </Link>
        </Popover.Item>
      </div>
    );
  };

  return (
    <div className='fixed z-30 flex items-center justify-between w-full px-16 mb-12 border-b border-gray-200 bg-gray-50'>
      <NextLink href='/dashboard'>
        <div className='flex items-center justify-between cursor-pointer select-none'>
          <img src='/staticshield.png' alt='StaticShield' width='25px' />
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
          )}
          <Popover content={avatarPopoverContent} placement='leftStart'>
            <Avatar
              src={user?.picture}
              size='small'
              className='cursor-pointer'
            />
          </Popover>
        </div>
      </div>
    </div>
  );
}
