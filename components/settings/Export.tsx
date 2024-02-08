import React from 'react';
import { exportToPdf } from '@/lib/utils';
import { Button } from '../ui/button';

const Export = () => {
  return (
    <>
      <div className='flex flex-col gap-3 px-5 py-3'>
        <h3 className='text-[10px] uppercase'>
          Export
        </h3>
        <Button 
          variant="outline" 
          className='w-full border-[1px] border-gray-700 
          hover:bg-primary-green hover:text-primary-black transition-all duration-150 ease-in-out' 
          onClick={exportToPdf}
        >
          Export to PDF
        </Button>
      </div>
    </>
  );
};

export default Export;