import { Card, Text, Input, Button, Textarea } from '@geist-ui/react';
import checkIsGoodPassword from '@/lib/validatePassword';
import { HarperDBRecord } from '@/lib/interfaces';

export default function GeneralSettingsTab({ data }) {
  const siteData: HarperDBRecord = data;
  // const changePassword = () => {
  //   checkIsGoodPassword();
  // };

  return (
    <div>
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Site name</Text>
        <Text p>
          The name of your password protected website ({siteData?.site_name})
        </Text>
        <Input
          placeholder="Acme's website"
          width='70%'
          clearable
          initialValue={siteData.site_name}
        />
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
        <Textarea
          width='50%'
          minHeight='100px'
          initialValue={siteData.site_desc}
          placeholder='Description...'
        />
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
        <Input initialValue={siteData.site_url} disabled width='70%' />
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
        <Input
          className='mt-4'
          type='pass'
          labelRight='days'
          clearable
          initialValue={siteData.max_login_duration.toString()}
        />
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
        <Input.Password
          width='70%'
          className='mt-4'
          placeholder='••••••••••'
          label='New Password →'
        />
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
