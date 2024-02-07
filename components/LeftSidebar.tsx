"use client";

import React, { useMemo } from 'react';

const LeftSidebar = ({ allShapes }: {allShapes: Array<any>}) => {

  const memorizedShapes = useMemo(() => (
      <>
        <section 
          className='flex flex-col border-t border-r-[1px] border-gray-700  bg-primary-black text-primary-grey-300 min-w-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20'
        >
          <h3 className='border-[1px] border-gray-700 px-5 py-4 text-xs uppercase'>
            Layers
          </h3>
        </section>
      </>
    ),
    [allShapes?.length],
  );

  return memorizedShapes;
};

export default LeftSidebar;