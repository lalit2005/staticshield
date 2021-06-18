interface NavBarProps {
  feature: string;
  children: JSX.Element;
}

export default function FeatureCard(props: NavBarProps) {
  const { feature, children } = props;
  return (
    <div className='max-w-[420px] mx-auto'>
      <div className='flex flex-col items-center justify-between px-6 py-2 my-4 bg-white rounded shadow'>
        <div className='inline-block p-5 mt-3 border border-gray-700 rounded-full bg-blue-50'>
          {children}
        </div>
        <p>{feature}</p>
      </div>
    </div>
  );
}
