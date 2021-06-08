import {
  Text,
  Page,
  Input,
  Divider,
  Textarea,
  Link,
  Note,
  Button,
} from '@geist-ui/react';
import DashboardNavbar from '../components/dashboard/Navbar';
import { useUser } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';
import { NewSiteFormValues } from '../lib/interfaces';

export default function New() {
  const { user, error, isLoading } = useUser();
  const showToast = (message: string) => {
    return (
      <p className='px-3 py-1 text-base text-red-500 border border-red-600 rounded max-w-[384px] bg-red-50'>
        {message}
      </p>
    );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSiteFormValues>();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className='w-screen min-h-screen'>
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
        <Note className='my-10' type='error'>
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
              showToast('Site name should be at least 2 characters long')}
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
            {errors.site_url && showToast('Please enter a valid URL')}
            <Divider />
            <Text type='secondary'>
              A short description for your site (optional)
            </Text>
            <Textarea
              placeholder='Acme helps grow your product...'
              width='80%'
            />
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
              showToast(
                'Password should be at least 8 characters long and 50 characters at most'
              )}

            <Divider />
            <Input
              placeholder='0'
              initialValue='0'
              labelRight='hours'
              className='mx-5 my-3 text-left'
              {...register('expiration_hours', {
                required: true,
                valueAsNumber: true,
                min: 0,
                max: 23,
              })}>
              Login expiration time.{' '}
              <Link color icon target='__blank'>
                Learn more
              </Link>
            </Input>
            {errors.expiration_hours &&
              showToast('Value of hours should be between 0 and 23')}

            <Input
              placeholder='7'
              initialValue='7'
              labelRight='days'
              className='mx-5 my-3 text-left'
              {...register('expiration_days', {
                required: true,
                valueAsNumber: true,
                min: 0,
                max: 29,
              })}
            />
            {errors.expiration_days &&
              showToast('Value of days should be between 0 and 29')}
            <Input
              placeholder='0'
              initialValue='0'
              labelRight='months'
              className='my-3 ml-5 text-left'
              {...register('expiration_months', {
                required: true,
                valueAsNumber: true,
                min: 0,
                max: 12,
              })}
            />
            {errors.expiration_months &&
              showToast('Value of month should be between 0 and 12')}
            <Divider />
            <Button type='success' htmlType='submit'>
              Add site
            </Button>
          </form>
        </div>
      </Page>
    </div>
  );
}
