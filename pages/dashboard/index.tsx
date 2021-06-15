import NextLink from 'next/link';
import { Breadcrumbs, Row, Text, Card, Loading } from '@geist-ui/react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardNavbar from '@/components/dashboard/Navbar';
import SiteCard from '@/components/dashboard/SiteCard';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default withPageAuthRequired(function Dashboard({ user }) {
  const { data, error } = useSWR('/api/fetch-sites', fetcher);
  console.log(data);

  const router = useRouter();

  useEffect(() => {
    data?.forEach((site) => {
      router.prefetch('/site/' + site.id);
    });
  }, []);

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
                <Breadcrumbs.Item nextLink>Sites</Breadcrumbs.Item>
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
            {data?.map((site) => {
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
        </div>
      </div>
    </div>
  );
});
