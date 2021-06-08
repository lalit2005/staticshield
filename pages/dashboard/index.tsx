import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { Breadcrumbs, Row, Text, Card } from '@geist-ui/react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import DashboardNavbar from '../../components/dashboard/Navbar';
import SiteCard from '../../components/dashboard/SiteCard';
import { SiteCardProps } from '../../lib/interfaces';

export default function Dashboard() {
  const { user, error, isLoading } = useUser();

  const data: SiteCardProps[] = [
    {
      id: '1',
      site_desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque impedit error quo nobis est quasi, et qui fugit officia quae.',
      site_name: 'Test 1',
      site_url: 'https://example.com',
    },
    {
      id: '2',
      site_desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto harum neque sint enim quae quibusdam nulla quidem aspernatur! Eum, nisi!',
      site_name: 'Test 2',
      site_url: 'https://example.com',
    },
    {
      id: '3',
      site_desc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit libero porro hic magni ab eius, provident eligendi voluptatum nesciunt tempore. Assumenda explicabo ea sapiente eaque.',
      site_name: 'Test 3',
      site_url: 'https://example.com',
    },
    {
      id: '4',
      site_desc: 'Lorem ipsum dolor sit amet consectetur',
      site_name: 'Test 4',
      site_url: 'https://example.com',
    },
  ];

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
          <div className='grid grid-flow-row mt-6 overflow-y-scroll gap-y-8'>
            {data.map((site) => {
              return (
                <SiteCard
                  site_desc={site.site_desc}
                  site_name={site.site_name}
                  id={site.id}
                  key={site.id}
                  site_url={site.site_url}
                />
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
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
