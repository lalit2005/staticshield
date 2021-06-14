import {
  Text,
  Page,
  Input,
  Divider,
  Textarea,
  Link,
  Note,
  Button,
  useModal,
  Modal,
  useToasts,
} from '@geist-ui/react';
import DashboardNavbar from '@/components/dashboard/Navbar';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { NewSiteFormValues } from '@/lib/interfaces';
import checkIsGoodPassword from '@/lib/validatePassword';
import { useEffect, useState } from 'react';
import handleNewSite from '@/lib/handleNewSite';
import { useRouter } from 'next/router';

export default withPageAuthRequired(function New({ user }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  const showErrorMessage = (message: string) => {
    return (
      <p className='px-3 py-1 text-base text-red-500 border border-red-600 rounded max-w-[384px] bg-red-50'>
        {message}
      </p>
    );
  };

  const [warningMessage, setWarningMessage] = useState(
    "That's a very weak password!"
  );
  const [description, setDescription] = useState('');

  const { visible, setVisible, bindings } = useModal();

  const [toasts, setToast] = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSiteFormValues>();

  const onSubmit = async (data: NewSiteFormValues) => {
    console.log(data);
    if (data.site_url.includes(' ') || data.site_url.includes('	')) {
      setToast({
        text: "Website's URL is invalid, it should not contain spaces or tabs",
        type: 'error',
      });
      return;
    }
    const result = checkIsGoodPassword(data.password);
    if (!result.isGoodPassword) {
      setWarningMessage(result.message);
      setVisible(true);
      return;
    }
    const siteCreated = await handleNewSite({
      ...data,
      site_desc: description,
    });
    if (siteCreated.success === true) {
      router.push('/dashboard');
    }
  };

  return (
    <div>
      <DashboardNavbar
        user={user}
        isNewSiteButtonVisible={false}
        isDashboardBadgeVisible={false}
      />
      <Page className='!pt-28'>
        <Text h1>Add new site</Text>
        <Text type='secondary'>
          Please fill out the details of the site you want to password protect
        </Text>
        <Note className='my-10' type='secondary'>
          All the data can be changed later in the dashboard except URL of the
          website you want to password protect
        </Note>
        <div className='px-5 py-10 mt-10 border border-gray-500 rounded-lg'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Acme's employee register"
              width='80%'
              {...register('site_name', { required: true, minLength: 2 })}>
              Name of site
            </Input>
            {errors.site_name &&
              showErrorMessage(
                'Site name should be at least 2 characters long'
              )}
            <Divider />
            <Input
              placeholder='acme.com'
              label='https://'
              width='80%'
              {...register('site_url', {
                required: true,
                pattern:
                  /[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
              })}>
              URL of site
            </Input>
            {errors.site_url && showErrorMessage('Please enter a valid URL')}
            <Divider />
            <Text type='secondary'>
              A short description for your site (optional)
            </Text>
            <Textarea
              placeholder='Acme helps grow your product...'
              width='80%'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.site_desc &&
              showErrorMessage('Please enter a valid description')}
            <Divider />
            <Input.Password
              placeholder='••••••••••'
              width='80%'
              className='mr-5'
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 50,
              })}>
              Password for your website. Keep it at least 8 characters long
            </Input.Password>
            {errors.password &&
              showErrorMessage(
                'Password should be at least 8 characters long and 50 characters at most'
              )}

            <Divider />

            <Input
              placeholder='7'
              initialValue='7'
              labelRight='days'
              type='number'
              className='my-3 text-left'
              {...register('expiration_days', {
                required: true,
                valueAsNumber: true,
                min: 1,
                max: 365,
              })}>
              Login expiration time.{' '}
              <Link color icon target='__blank'>
                Learn more
              </Link>
            </Input>
            {errors.expiration_days &&
              showErrorMessage(
                'Value of days should be more than 1 and less than 365'
              )}
            <Divider />
            <Button type='success' htmlType='submit'>
              Add site
            </Button>
          </form>
        </div>
      </Page>
      <Modal {...bindings}>
        <Modal.Title>
          <h3 className='!text-red-600 text-2xl -mb-10'>Warning</h3>
        </Modal.Title>
        <Modal.Content>
          <p>{warningMessage}</p>
        </Modal.Content>
      </Modal>
    </div>
  );
});
