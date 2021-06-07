import { useRouter } from 'next/router';
import DashboardNavbar from '../../components/dashboard/Navbar';
import { useUser } from '@auth0/nextjs-auth0';
import {
  Card,
  Divider,
  Page,
  Row,
  Tabs,
  Text,
  Link,
  Snippet,
  Breadcrumbs,
} from '@geist-ui/react';
import NextLink from 'next/link';
import { Code, Settings } from '@geist-ui/react-icons';
import GeneralSettingsTab from '../../components/site/GeneralSettingsTab';
import AdvancedSettingsTab from '../../components/site/AdvancedSettingsTab';

export default function Site() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const { siteId } = router.query;

  return (
    <div>
      <DashboardNavbar user={user} />
      <div className='pt-20'>
        <Page size='large'>
          <Breadcrumbs className='!mb-10'>
            <Breadcrumbs.Item>StaticShield</Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <NextLink href='/dashboard'>
                <Link color>Dashboard</Link>
              </NextLink>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <NextLink href='/dashboard'>
                <Link color>Sites</Link>
              </NextLink>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>{siteId}</Breadcrumbs.Item>
          </Breadcrumbs>
          <h1 className='text-3xl font-extrabold sm:text-4xl md:text-5xl'>
            Acme's employee register
          </h1>
          <Text size='large' type='secondary'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            beatae quasi distinctio ullam ea soluta quisquam recusandae
            perferendis veniam. Odio, corporis numquam deleniti tempora sequi
            quaerat repellat amet cumque ducimus.
          </Text>
          <Divider volume={2} />
          <Text h2 className='my-10'>
            Some stats
          </Text>
          <Row className='flex-wrap !-ml-5 justify-evenly -mt-5'>
            <Card width='300p' className='!mx-5 !my-5' type='success' shadow>
              <Text h5>Successful Logins</Text>
              <Text h2>59</Text>
            </Card>
            <Card width='300p' className='!mx-5 !my-5' type='warning' shadow>
              <Text h5>Unsuccessful Logins</Text>
              <Text h2>05</Text>
            </Card>
            <Card width='300p' className='!mx-5 !my-5' type='secondary' shadow>
              <Text h5>Last Login At (GMT)</Text>
              <Text h2>12:45 5 June, 2021</Text>
            </Card>
          </Row>
          <Divider volume={2} />
          <div>
            <Text h2 className='my-10'>
              Site Settings
            </Text>
            <Tabs initialValue='1'>
              <Tabs.Item
                value='1'
                label={
                  <>
                    <Code />
                    Code
                  </>
                }>
                <Text h3 className='mt-10'>
                  Code snippet
                </Text>
                <Text>
                  This is the code snippet you should add to your website.{' '}
                  <Link color icon>
                    Visit docs
                  </Link>{' '}
                  for more detailed usage
                </Text>
                <Snippet
                  symbol='𝗝𝗦'
                  type='lite'
                  text="<script src='https://staticshield.vercel.app/js-script'></script>"
                  width='70%'
                  className='mt-10 mb-20'
                />
              </Tabs.Item>
              <div>
                <Tabs.Item
                  value='2'
                  label={
                    <>
                      <Settings color='success' />
                      General
                    </>
                  }>
                  <GeneralSettingsTab />
                </Tabs.Item>
                <Tabs.Item
                  value='3'
                  label={
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      Advanced
                    </>
                  }>
                  <AdvancedSettingsTab />
                </Tabs.Item>
              </div>
            </Tabs>
          </div>
        </Page>
      </div>
    </div>
  );
}
