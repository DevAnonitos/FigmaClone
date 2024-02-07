
import Image from "next/image";

export default function Loading() {
  
  return (
    <div 
      className='flex h-screen w-screen flex-col 
      items-center justify-center gap-2'
    >
      <Image
        src='/assets/loader.gif'
        alt='Loading Spinner'
        width={100}
        height={100}
        priority={true}
        className='object-contain'
      />
      <p className='flex items-center justify-center text-sm font-bold text-primary-grey-300'>
        Loading...
      </p>
    </div>
  );
};