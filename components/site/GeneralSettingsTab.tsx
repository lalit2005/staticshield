import { Card, Text, Input, Button, Textarea } from '@geist-ui/react';
import checkIsGoodPassword from '@/lib/validatePassword';

export default function GeneralSettingsTab() {
  // const changePassword = () => {
  //   checkIsGoodPassword();
  // };

  return (
    <div>
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Site name</Text>
        <Text p>
          The name of your password protected website (
          {'Acme employee register'})
        </Text>
        <Input placeholder='https://employee.acme.com' width='70%' />
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Please use 48 characters at maximum</Text>
            </div>
            <div>
              <Button type='secondary' auto size='small'>
                Save
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Site Description</Text>
        <Text p>A short description about your password protected site</Text>
        <Textarea width='50%' minHeight='100px' placeholder='Description...' />
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Please use 250 characters at maximum</Text>
            </div>
            <div>
              <Button type='secondary' auto size='small'>
                Save
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Site URL</Text>
        <Text p>URL of the password protected website</Text>
        <Input value={'https://employee.acme.com'} disabled width='70%' />
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>This field cannot be changed</Text>
            </div>
            <div>
              <Button type='secondary' auto size='small' disabled>
                Save
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Login Expiration</Text>
        <Text p>
          The maximum duration for which a user has access to the website after
          a successful login
        </Text>
        <Input className='mx-5 mt-4' type='pass' labelRight='hours' />
        <Input className='mx-5 mt-4' type='pass' labelRight='days' />
        <Input className='mx-5 mt-4' type='pass' labelRight='months' />
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>The default value is 7 days</Text>
            </div>
            <div>
              <Button type='secondary' auto size='small'>
                Change expiration time
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Change password</Text>
        <Text p>URL of the password protected website</Text>
        <Input
          value='••••••••••'
          disabled
          width='70%'
          label='Current Password'
        />
        <Input.Password width='70%' className='mt-4' label='New Password →' />
        <Card.Footer className='!bg-warmgray-50'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Passwords should be at least 8 characters long</Text>
            </div>
            <div>
              <Button type='error' auto size='small'>
                Change password
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
