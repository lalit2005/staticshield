import { Link, Row, Text } from '@geist-ui/react';

export default function Navbar() {
  return (
    <Row className=' border-b border-gray-200 !fixed !bg-gray-50 z-10'>
      <div className='text-gray-700 flex justify-around items-center !min-w-[100vw]'>
        <div className='flex items-center justify-between'>
          <img src='/logo.svg' alt='StaticShield' width='25px' />
          <Text b p className='ml-2 text-2xl'>
            StaticShield
          </Text>
        </div>
        <div>
          <Link block>Sign Up</Link>
          <Link block>Sign In</Link>
        </div>
      </div>
    </Row>
  );
}
