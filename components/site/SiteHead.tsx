import { HarperDBRecord } from 'types/interfaces';
import Head from 'next/head';

const SiteHead: React.FC<{ data: HarperDBRecord }> = ({ data }) => {
  return (
    <Head>
      <title>{data?.site_name + ' | StaticShield'}</title>
    </Head>
  );
};

export default SiteHead;
