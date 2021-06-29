import { FrameworkCardProps } from 'types/interfaces';
import Image from 'next/image';
import NextLink from 'next/link';

const FrameworkCard: React.FC<FrameworkCardProps> = ({ name, link, img }) => {
  return (
    <NextLink href={link}>
      <div className='max-w-sm px-32 py-4 mx-auto my-3 transition-all duration-100 border border-gray-300 rounded-md shadow-md cursor-pointer hover:shadow-xl'>
        <div className='!w-32 mx-auto'>
          <Image src={img} alt='' placeholder='blur' />
        </div>
        <h3 className='text-2xl font-extrabold'>{name}</h3>
      </div>
    </NextLink>
  );
};

export default FrameworkCard;
