import {
  Avatar,
  Badge,
  Button,
  Link,
  Popover,
  Spinner,
  Text,
  Textarea,
  Tooltip,
  useToasts,
} from '@geist-ui/react';
import { DashboardNavbarProps } from 'types/interfaces';
import NextLink from 'next/link';
import Image from 'next/image';
import Logo from '../../public/staticshield.png';
import {
  Book,
  LogOut,
  PlusSquare,
  Send,
  Smile,
  User,
} from '@geist-ui/react-icons';
import { useState } from 'react';
import axios from 'axios';

export default function DashboardNavbar(props: DashboardNavbarProps) {
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [toasts, setToast] = useToasts();
  const { user, isNewSiteButtonVisible } = props;

  const handleSubmit = () => {
    setLoading(true);

    if (feedback.length === 0 || !feedback || !feedback.trim()) {
      setToast({ text: 'Please enter a valid feedback', type: 'error' });
      setLoading(false);
      return;
    }

    axios
      .post('https://api.web3forms.com/submit/', {
        apikey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        feedback: feedback,
        email: user?.email,
        name: user?.name,
      })
      .then(() => {
        setLoading(false);
        setFeedback('');
        setToast({
          text: 'Your feedback was successfully delivered',
          type: 'success',
        });
      });
  };

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
          <Link block href='/support' className='font-bold'>
            <p className='-my-1 !font-bold'>
              <Smile className='inline-block w-5 h-5 mr-3' />
              Support
            </p>
          </Link>
        </Popover.Item>
        <Popover.Item line />

        <Popover.Item>
          <Link block href='/docs' className='font-bold'>
            <p className='-my-1 !font-bold'>
              <Book className='inline-block w-5 h-5 mr-3' />
              Docs
            </p>
          </Link>
        </Popover.Item>
      </div>
    );
  };

  const feedbackPopover = () => (
    <>
      <Popover.Item>Thanks for giving feedback 😀</Popover.Item>
      <Popover.Item>
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value.toString())}
        />
      </Popover.Item>
      <Popover.Item>
        <Button type='secondary' onClick={handleSubmit}>
          {loading ? (
            <Spinner className='relative top-1' />
          ) : (
            <>
              Send Feedback <Send className='p-1' />
            </>
          )}
        </Button>
      </Popover.Item>
    </>
  );

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
          <Popover content={feedbackPopover} className='invisible sm:visible'>
            <Button size='small' auto className='!cursor-text mr-3'>
              Feedback
            </Button>
          </Popover>
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
                  type='default'
                  className='flex items-center justify-center invisible mr-3 sm:visible'>
                  <PlusSquare className='mt-1 -mx-2' />
                </Button>
              </NextLink>
            </Tooltip>
          )}
          <div className='-mt-2'>
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
