import NextLink from 'next/link';
import { Breadcrumbs, Row, Text, Card, Tooltip } from '@geist-ui/react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardNavbar from '@/components/dashboard/Navbar';
import SiteCard from '@/components/dashboard/SiteCard';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { HarperDBRecord } from '@/lib/interfaces';
import { mutate } from 'swr';
import sortSiteCardsByUpdatedDate from '@/lib/sortSiteCardsByUpdatedDate';
import getLastLogin from '@/lib/getLastLogin';
import getSuccessfulLogins from '@/lib/getSuccessfulLogins';
import getUnsuccessfulLogins from '@/lib/getUnsuccessfulLogins';

export default withPageAuthRequired(function Dashboard({ user }) {
  const { data, error } = useSWR('/api/fetch-sites', fetcher);
  console.log(data);
  const sortedData = data ? sortSiteCardsByUpdatedDate(data) : data;
  const router = useRouter();
  const LastLogin = getLastLogin(data);
  const totalSuccessfulLogins = getSuccessfulLogins(data);
  const totalUnSuccessfulLogins = getUnsuccessfulLogins(data);

  if (router.query?.mutate?.toString() == '1') {
    mutate('/api/fetch-sites');
  }

  return (
    <div className='w-screen h-screen'>
      <DashboardNavbar
        user={user}
        isNewSiteButtonVisible
        isDashboardBadgeVisible
      />
      <div className='flex md:ml-[3vw] lg:ml-[5vw]'>
        <div className='w-2/3 px-16 !mx-auto lg:!mx-0'>
          <div className='pt-24'>
            <Breadcrumbs>
              <Breadcrumbs.Item>StaticShield</Breadcrumbs.Item>
              <Breadcrumbs.Item>Dashboard</Breadcrumbs.Item>
              <NextLink href='/dashboard'>
                <Breadcrumbs.Item nextLink>Sites and Stats</Breadcrumbs.Item>
              </NextLink>
            </Breadcrumbs>
          </div>
          <Text h1 className='mt-5 font-extrabold'>
            Your Sites
          </Text>
          {!data && (
            <Skeleton
              width={500}
              height={150}
              count={3}
              style={{ marginTop: '30px' }}
            />
          )}
          <div>
            {sortedData?.map((site: HarperDBRecord) => {
              return (
                <div key={site.id} className='my-10'>
                  <SiteCard
                    site_desc={site.site_desc}
                    site_name={site.site_name}
                    id={site.id}
                    key={site.id}
                    site_url={site.site_url}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className='fixed top-0 right-0 hidden w-1/3 h-screen px-16 border-l lg:block border-warmgray-200 bg-warmgray-50'>
          <Row className='flex-wrap !-ml-5 justify-evenly -mt-5 pt-60 select-none'>
            <Tooltip text='Total successful logins of all sites' type='dark'>
              <Card width='300p' className='!mx-5 !my-5' type='success' shadow>
                <Text h5>Successful Logins</Text>
                <Text h2>{totalSuccessfulLogins || '00'}</Text>
              </Card>
            </Tooltip>
            <Tooltip text='Total Unsuccessful logins of all sites' type='dark'>
              <Card width='300p' className='!mx-5 !my-5' type='warning' shadow>
                <Text h5>Unsuccessful Logins</Text>
                <Text h2>{totalUnSuccessfulLogins || '00'}</Text>
              </Card>
            </Tooltip>
            <Tooltip
              type='dark'
              text={getLastLogin(data, true).toLocaleString()}>
              <Card
                width='300p'
                className='!mx-5 !my-5'
                type='secondary'
                shadow>
                <Text h5>Last Login</Text>
                <Text h2>{LastLogin || 'Loading…'}</Text>
              </Card>
            </Tooltip>
          </Row>
        </div>
      </div>
      <div className='block max-w-lg mx-auto mt-16 lg:hidden'>
        <Text h1 className='mb-10 font-bold'>
          Overall stats
        </Text>
        <Tooltip text='Total successful logins of all sites' type='dark'>
          <Card type='success'>
            <Text h4>Successful logins</Text>
            <Text h3>{totalSuccessfulLogins || '00'}</Text>
          </Card>
        </Tooltip>
        <Tooltip text='Total Unsuccessful logins of all sites' type='dark'>
          <Card type='warning' className='!my-4 !mx-2'>
            <Text h4>Unsuccessful logins</Text>
            <Text h3>{totalUnSuccessfulLogins || '00'}</Text>
          </Card>
        </Tooltip>
        <Tooltip type='dark' text={getLastLogin(data, true).toLocaleString()}>
          <Card type='secondary'>
            <Text h4>Last login</Text>
            <Text h3>{LastLogin || 'Loading…'}</Text>
          </Card>
        </Tooltip>
      </div>
    </div>
  );
});
