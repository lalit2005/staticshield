import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { Breadcrumbs, Text } from '@geist-ui/react';
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
  ];

  return (
    <div className='w-screen min-h-screen'>
      <DashboardNavbar user={user} />
      <div className='px-16'>
        <div>
          <Breadcrumbs>
            <Breadcrumbs.Item>StaticShield</Breadcrumbs.Item>
            <Breadcrumbs.Item>Dashboard</Breadcrumbs.Item>
            <NextLink href='/dashboard'>
              <Breadcrumbs.Item nextLink>Sites</Breadcrumbs.Item>
            </NextLink>
          </Breadcrumbs>
        </div>
        <Text h1 className='mt-3 font-extrabold'>
          Your Sites
        </Text>
        <div className='grid grid-flow-row mt-6 gap-y-8'>
          {data.map((site) => {
            return (
              <SiteCard
                site_desc={site.site_desc}
                site_name={site.site_name}
                id={site.id} // to avoid typescript errors
                key={site.id}
                site_url={site.site_url}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
