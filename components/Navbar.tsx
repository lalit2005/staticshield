import { Link, Row } from '@geist-ui/react';

export default function Navbar() {
  return (
    <Row className='py-4 border-b border-gray-200 !fixed !bg-gray-50 z-10'>
      <div className='text-gray-700 flex justify-around items-center !min-w-[100vw]'>
        <Link block>Sign Up</Link>
        <Link block>Sign In</Link>
      </div>
    </Row>
  );
}
