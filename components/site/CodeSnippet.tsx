import NextLink from 'next/link';
import { Divider, Link, Snippet, Text } from '@geist-ui/react';

const CodeSnippet: React.FC<{
  code: string;
  title: string;
  link: string;
  caption?: string;
}> = ({ code, title, link, caption }) => {
  return (
    <div>
      <NextLink href={link}>
        <Link icon color className='!-my-3'>
          <Text className='font-bold !text-blue-500 hover:!text-blue-400'>
            {title}
          </Text>
        </Link>
      </NextLink>
      <div className='!mb-4'>
        <Text small>{caption}</Text>
      </div>
      <Snippet symbol='' type='dark' text={code} width='70%' />
      <Divider />
    </div>
  );
};

export default CodeSnippet;
