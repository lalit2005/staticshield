import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardNavbar from '@/components/dashboard/Navbar';
import {
  Input,
  Page,
  Text,
  Divider,
  Textarea,
  Button,
  useToasts,
} from '@geist-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Footer from '@/components/Footer';

export default withPageAuthRequired(function Support({ user }) {
  const [sub, setSub] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [_, setToast] = useToasts();
  const router = useRouter();

  const handleSubmit = () => {
    if (sub === '' || desc === '' || !desc.trim() || !sub.trim()) {
      setToast({
        text: 'Please enter a valid Subject and Description',
        type: 'error',
      });
      return;
    }
    axios
      .post('https://api.web3forms.com/submit/', {
        apikey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        sub: sub,
        description: desc,
        email: user?.email,
        name: user?.name,
      })
      .then(() => {
        setSub('');
        setDesc('');
        setToast({
          text: 'Message successfully delivered',
          type: 'success',
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      });
  };

  return (
    <div>
      <DashboardNavbar
        user={user}
        isDashboardBadgeVisible={false}
        isNewSiteButtonVisible
      />
      <Page>
        <div>
          <Text h1 className='pt-20'>
            Support
          </Text>
          <Divider />
          <Input
            onChange={(e) => setSub(e.target.value)}
            width='600px'
            placeholder='How to…'>
            Subject
          </Input>
          <div className='mt-10'>
            <Text className='text-base !text-gray-600'>Description</Text>
          </div>
          <Textarea
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Can you help me with…'
            width='600px'
          />
          <div>
            <Button
              className='w-full mt-12'
              type='success'
              onClick={handleSubmit}>
              Send message
            </Button>
          </div>
          <Divider />
        </div>
      </Page>
      <Footer />
    </div>
  );
});
