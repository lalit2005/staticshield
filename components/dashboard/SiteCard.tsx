import { Card, Text, Tooltip } from '@geist-ui/react';
import { SiteCardProps } from '@/lib/interfaces';
import NextLink from 'next/link';

export default function SiteCard(props: SiteCardProps) {
  const { site_desc, site_url, site_name, id: siteId } = props;

  let shortenedSiteDesc: string;
  if (site_desc?.length > 100) {
    shortenedSiteDesc = site_desc?.substr(0, 200) + '…';
  } else {
    shortenedSiteDesc = site_desc;
  }

  return (
    <div>
      <NextLink href={'/site/' + siteId}>
        <Card
          hoverable
          className='min-h-[40px] lg:max-w-md max-w-2xl cursor-pointer'>
          <Text h3 className='-mb-1 font-bold'>
            {site_name}
          </Text>
          <Text small type='secondary'>
            {site_url}
          </Text>
          <div className='flex items-center'>
            <Text className=' !text-gray-700'>
              {shortenedSiteDesc || 'No description ¯\\_(ツ)_/¯'}
            </Text>
          </div>
        </Card>
      </NextLink>
    </div>
  );
}
