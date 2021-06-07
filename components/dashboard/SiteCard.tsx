import { Card, Link, Text, Tooltip } from '@geist-ui/react';
import { ExternalLink } from '@geist-ui/react-icons';
import { SiteCardProps } from '../../lib/interfaces';
import NextLink from 'next/link';

export default function SiteCard(props: SiteCardProps) {
  const { site_desc, site_url, site_name, id: siteId } = props;

  let shortenedSiteDesc: string;
  if (site_desc.length > 100) {
    shortenedSiteDesc = site_desc.substr(0, 200) + '…';
  } else {
    shortenedSiteDesc = site_desc;
  }

  return (
    <div>
      <NextLink href={'/site/' + siteId}>
        <Card hoverable className='min-h-[40px] max-w-3xl cursor-pointer'>
          <Text h2 className='inline-block'>
            {site_name}
          </Text>
          <div className='relative inline-block left-3 bottom-1'>
            <Tooltip type='success' text={site_url}>
              <Link block className='flex !items-center'>
                Visit
                <ExternalLink className='w-4 h-4 ml-1' />
              </Link>
            </Tooltip>
          </div>
          <div className='flex items-center'>
            <Text className='-mt-2 !text-gray-700'>{shortenedSiteDesc}</Text>
          </div>
        </Card>
      </NextLink>
    </div>
  );
}
