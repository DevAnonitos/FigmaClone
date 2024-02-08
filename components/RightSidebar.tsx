"use client";

import React from 'react';
import { 
  Color, 
  Dimensions, 
  Text, 
  Export 
} from './settings';

const RightSidebar = () => {

  
  return (
    <>
      <section 
        className='flex flex-col border-r border-l-[1px] border-gray-700  bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 
        h-full max-sm:hidden select-none'
      >
        <h3 className='px-5 pt-4 text-xs uppercase'>
          Design
        </h3> 
        <span 
          className='text-xs text-primary-grey-300 mt-3 
          px-5 border-b-[1px] border-gray-700 pb-4'
        >
        Make changes to canvas as you like
        </span>

        <Dimensions />

        <Text />
        
        <Color />
        <Color />

        <Export />
      </section>
    </>
  );
};

export default RightSidebar;