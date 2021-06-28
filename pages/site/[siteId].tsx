import { useRouter } from 'next/router';
import DashboardNavbar from '@/components/dashboard/Navbar';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
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
  Tooltip,
  Dot,
} from '@geist-ui/react';
import NextLink from 'next/link';
import { Code, ExternalLink, Settings, Tool } from '@geist-ui/react-icons';
import GeneralSettingsTab from '@/components/site/GeneralSettingsTab';
import AdvancedSettingsTab from '@/components/site/AdvancedSettingsTab';
import { fromUnixTime, formatDistanceToNow, getUnixTime } from 'date-fns';
import { useEffect } from 'react';
import useSites from '@/lib/useSites';
import { HarperDBRecord } from 'types/interfaces';
import SiteHead from '@/components/site/SiteHead';
import CodeSnippet from '@/components/site/CodeSnippet';

export default withPageAuthRequired(function Site({ user }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, [router]);

  const { siteId } = router.query;

  const { response: data, error } = useSites<HarperDBRecord>(siteId.toString());

  if (JSON.stringify(data) === '[]') {
    router.replace('/dashboard');
  }

  console.log('---------------- From [siteId] -----------------------');
  console.log(JSON.stringify(data));

  const lastLoginTime = data?.last_login || getUnixTime(new Date()); //! new Date is to avoid error during build time
  const prettifiedTime = formatDistanceToNow(+lastLoginTime, {
    addSuffix: true,
  });

  return (
    <div>
      <SiteHead data={data} />
      <DashboardNavbar
        user={user}
        isDashboardBadgeVisible={true}
        isNewSiteButtonVisible={true}
      />
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
            <Breadcrumbs.Item>
              {data?.site_name || 'Loading...'}
            </Breadcrumbs.Item>
          </Breadcrumbs>
          <div className='flex items-center'>
            <h1 className='inline-block mr-5 text-3xl font-extrabold sm:text-4xl md:text-5xl'>
              {data?.site_name || 'Loading...'}
            </h1>
            <Tooltip
              offset={15}
              text={
                data?.is_login_blocked
                  ? `Logins to '${data?.site_name}' have been blocked. Enable logins in Advanced Settings Tab below`
                  : `Logins to '${data?.site_name}' are enabled. You can disable logins in Advanced Setting Tab`
              }
              placement='top'
              type='dark'>
              <Dot type={data?.is_login_blocked ? 'error' : 'success'} />
            </Tooltip>
            <Link
              href={'http://' + data?.site_url || 'Loading...'}
              target='__blank'>
              <Tooltip
                text={data?.site_url || 'Just a second please…'}
                type='dark'
                placement='right'>
                <ExternalLink className='inline-block ml-5 !text-blue-400 hover:!text-blue-600' />
              </Tooltip>
            </Link>
          </div>
          <Text size='large' type='secondary'>
            {data?.site_desc || 'No description ¯\\_(ツ)_/¯'}
          </Text>
          <Divider volume={2} />
          <h2 className='my-10 text-2xl font-bold sm:!text-3xl md:text-5xl'>
            Some stats
          </h2>
          <Row className='flex-wrap !-ml-5 justify-evenly -mt-5 select-none'>
            <Card width='300p' className='!mx-5 !my-5' type='success' shadow>
              <Text h5>Successful Logins</Text>
              <Text h2>{data?.no_of_logins}</Text>
            </Card>
            <Card width='300p' className='!mx-5 !my-5' type='warning' shadow>
              <Text h5>Unsuccessful Logins</Text>
              <Text h2>{data?.no_of_failed_logins}</Text>
            </Card>
            <Tooltip
              text={new Date(lastLoginTime).toLocaleString()}
              type='dark'>
              <Card
                width='300p'
                className='!mx-5 !my-5'
                type='secondary'
                shadow>
                <Text h5>Last Login</Text>
                <Text h2>{prettifiedTime}</Text>
              </Card>
            </Tooltip>
          </Row>
          <Divider volume={2} />
          <div>
            <h2 className='my-10 text-2xl font-bold sm:!text-3xl md:text-5xl'>
              Site Settings
            </h2>
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
                <Text className='!mb-10'>
                  This is the code snippet you should add to your website.{' '}
                  <Link color icon href='/docs'>
                    Visit docs
                  </Link>{' '}
                  for more detailed usage
                </Text>
                <CodeSnippet
                  title='Vanilla HTML, JS, CSS'
                  code={`<script src='https://staticshield.vercel.app/script.js' data-site-id='${data?.id}' data-cap='${data?.cap}'></script> <style>.staticshield-div { display: none }</style>  <noscript> <meta http-equiv='refresh' content='0; url=https://staticshield.vercel.app/errors/noscript'/></noscript>`}
                  link='#'
                  caption='Add this snippet to any page in the head tag to password protect it.'
                />
                <CodeSnippet
                  title='Nextjs 11'
                  code={`<Script src='https://staticshield.vercel.app/script.js' data-cap='${data?.cap}' data-site-id='${data?.id}' strategy='beforeInteractive'></Script><style jsx>{\`.staticshield-div { display: none }\`}</style><noscript><meta httpEquiv='refresh' content='0; url=https://staticshield.vercel.app/errors/noscript'/></noscript>`}
                  link='/docs/with/nextjs-11'
                  caption="Do not forget to import Script from 'next/script'"
                />
                <CodeSnippet
                  title='Svelte'
                  code={`<svelte:head> <script data-site-id='${data?.id}' data-cap='${data?.cap}' src='https://staticshield.vercel.app/script.js'></script> <style>.staticshield-div { display: none }</style> <noscript> <meta http-equiv='refresh' content='0; url=https://staticshield.vercel.app/errors/noscript'/></noscript> </svelte:head>`}
                  link='#'
                  caption='Add this to any svelte page to password protect it.'
                />
                <CodeSnippet
                  title='SvelteKit'
                  code={`<svelte:head> <script data-site-id='${data?.id}' data-cap='${data?.cap}' src='https://staticshield.vercel.app/script.js'></script> <style>.staticshield-div { display: none }</style> <noscript> <meta http-equiv='refresh' content='0; url=https://staticshield.vercel.app/errors/noscript'/></noscript> </svelte:head>`}
                  link='/docs/with/nextjs-11'
                  caption='Add the snippet in any page to password protect it.s'
                />
                <CodeSnippet
                  title='VueJS'
                  code={`<script src='https://staticshield.vercel.app/script.js' data-site-id='${data?.id}' data-cap='${data?.cap}'></script> <style>.staticshield-div { display: none }</style>  <noscript> <meta http-equiv='refresh' content='0; url=https://staticshield.vercel.app/errors/noscript'/></noscript>`}
                  link='/docs/with/nextjs-11'
                  caption='Add the snippet in any page to password protect it.s'
                />
                <CodeSnippet
                  title='NuxtJS'
                  code={`<script>
export default {
  head() {
    return {
      title: 'StaticShield + Nuxtjs',
      script: [
        {
          hid: 'staticshield',
          src: 'https://staticshield.vercel.app/script.js',
          'data-site-id': 'fbe1e7da-d79b-4265-8209-a14f099d838e',
          'data-cap': 'The password is 123test123',
        },
      ],
    }
  },
}
</script>
`}
                  link='/docs/with/nextjs-11'
                  caption='Add the snippet in `index.html` to protect the whole Vue app. To password protect a single site, please visit docs'
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
                  <GeneralSettingsTab data={data} />
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
                  <AdvancedSettingsTab siteData={data} />
                </Tabs.Item>
              </div>
            </Tabs>
          </div>
        </Page>
      </div>
    </div>
  );
});
