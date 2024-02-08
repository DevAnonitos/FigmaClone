"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { shortcuts } from '@/constants';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger 
} from './ui/context-menu';

import { 
  useBroadcastEvent, 
  useEventListener, 
  useMyPresence, 
  useOthers 
} from '@/liveblocks.config';

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  undo: () => void;
  redo: () => void;
}

const Live = ({ canvasRef, undo, redo }: Props) => {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger 
          className='relative flex h-full w-full flex-1 items-center justify-center'
          id='canvas'
        >
          <canvas ref={canvasRef} />
        </ContextMenuTrigger>

        <ContextMenuContent className='right-menu-content'>
          {shortcuts.map((item) => (
            <ContextMenuItem key={item.key} className='right-menu-item cursor-pointer'>
              <p>{item.name}</p>
              <p className='text-xs text-primary-grey-300'>{item.shortcut}</p>
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

export default Live;