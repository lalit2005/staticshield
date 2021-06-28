import NextLink from 'next/link';
import { Breadcrumbs, Row, Text, Card, Tooltip, Button } from '@geist-ui/react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardNavbar from '@/components/dashboard/Navbar';
import SiteCard from '@/components/dashboard/SiteCard';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { HarperDBRecord } from 'types/interfaces';
import { mutate } from 'swr';
import sortSiteCardsByUpdatedDate from '@/lib/sortSiteCardsByUpdatedDate';
import getLastLogin from '@/lib/getLastLogin';
import getSuccessfulLogins from '@/lib/getSuccessfulLogins';
import getUnsuccessfulLogins from '@/lib/getUnsuccessfulLogins';
import EmptyImage from '../../public/empty.png';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

export default withPageAuthRequired(function Dashboard({ user }) {
  const { data, error } = useSWR('/api/fetch-sites', fetcher);
  console.log(data);
  const sortedData = data ? sortSiteCardsByUpdatedDate(data) : data;
  const router = useRouter();
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
                <Breadcrumbs.Item nextLink className='overflow-ellipsis'>
                  Sites and Stats
                </Breadcrumbs.Item>
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
                    is_login_blocked={site.is_login_blocked}
                  />
                </div>
              );
            })}
            {sortedData?.length == 0 && (
              <div>
                <p className='text-sm text-gray-700 capitalize'>
                  OH, IT&apos;S
                  <h3 className='text-3xl font-bold'>Empty here 😶</h3>
                </p>
                <div className='mx-auto'>
                  <div className='!w-64 !h-64'>
                    <Image src={EmptyImage} placeholder='blur' alt='' />
                    <NextLink href='/new'>
                      <Button>Password protect a site now</Button>
                    </NextLink>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='block mt-16 lg:hidden'>
            <Text h2 className='mb-10 font-extrabold'>
              Overall stats
            </Text>
            <Tooltip
              text='Sum total of successful logins of all sites'
              type='dark'>
              <Card type='success' className='!mx-2'>
                <Text h4>Successful logins</Text>
                <Text h3>{totalSuccessfulLogins || '00'}</Text>
              </Card>
            </Tooltip>
            <div>
              <Tooltip
                text='Sum total of unsuccessful logins of all sites'
                type='dark'>
                <Card type='warning' className='!mx-2 !my-4'>
                  <Text h4>Unsuccessful logins</Text>
                  <Text h3>{totalUnSuccessfulLogins || '00'}</Text>
                </Card>
              </Tooltip>
            </div>
            {data && data?.length > 0 && (
              <Tooltip
                type='dark'
                className='!mx-2'
                text={new Date(getLastLogin(data)).toLocaleString()}>
                <Card type='secondary'>
                  <Text h4>Last login</Text>
                  <Text h3>
                    {formatDistanceToNow(
                      +new Date(getLastLogin(data)).valueOf(),
                      {
                        addSuffix: true,
                      }
                    ) || 'Loading…'}
                  </Text>
                </Card>
              </Tooltip>
            )}
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
            {data && data?.length > 0 && (
              <Tooltip
                type='dark'
                text={new Date(getLastLogin(data)).toLocaleString()}>
                <Card
                  width='300p'
                  className='!mx-5 !my-5'
                  type='secondary'
                  shadow>
                  <Text h5>Last Login</Text>
                  <Text h2>
                    {formatDistanceToNow(
                      +new Date(getLastLogin(data)).valueOf(),
                      {
                        addSuffix: true,
                      }
                    ) || 'Loading…'}
                  </Text>
                </Card>
              </Tooltip>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
});
