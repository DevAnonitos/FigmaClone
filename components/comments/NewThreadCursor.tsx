"use client";

import React, { useEffect, useState } from 'react';
import * as Portal from "@radix-ui/react-portal";


const DEFAULT_CURSOR_POSITION = -10000;

const NewThreadCursor = ({ display }: { display: boolean }) => {

  const [coords, setCoords] = useState({
    x: DEFAULT_CURSOR_POSITION,
    y: DEFAULT_CURSOR_POSITION,
  });

  return (
    <>
      <Portal.Root>
        <div 
          className='pointer-events-none fixed left-0 top-0 h-9 w-9 
          cursor-grab select-none rounded-bl-full rounded-br-full 
          rounded-tl-full bg-white shadow-2xl' 
          style={{
            transform: `translate(${coords.x}px, ${coords.y}px)`
          }}
        />
      </Portal.Root>
    </>
  );
};

export default NewThreadCursor;