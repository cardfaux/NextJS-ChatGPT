import Image from 'next/image';

import stacksJson from '@/data/stacks.json';
import { StackTypes } from '@/types/StackTypes';

const stacks = stacksJson as StackTypes;

export default function Stack({ stack, stackKey }: { stack: any; stackKey: string }) {
  return (
    <div className='h-full flex flex-col'>
      <div className='header flex bg-slate-200 p-4 rounded-2xl'>
        <div className='flex mr-4 justify-center items-center'>
          <Image src={stack.logo} width={200} height={200} alt={`${stackKey} stack`} />
        </div>
        <div className='flex font-bold text-sm'>{stack.info}</div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const paths = Object.keys(stacks).map((key) => ({ params: { stack: key } }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }: { params: { stack: string } }) {
  try {
    return {
      props: {
        stack: stacks[params.stack],
        stackKey: params.stack,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
