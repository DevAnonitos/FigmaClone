"use client";

import React from 'react';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger 
} from './ui/context-menu';

const Live = () => {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger 
          className='relative flex h-full w-full flex-1 items-center justify-center'
        >

        </ContextMenuTrigger>
      </ContextMenu>
    </>
  );
};

export default Live;