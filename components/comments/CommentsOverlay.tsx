"use client";

import React, { useCallback, useRef } from 'react';
import { ThreadData } from '@liveblocks/client';
import { useMaxIndex } from '@/lib/useMaxZIndex';

import PinnedThread from './PinnedThread';
import { 
  ThreadMetadata, 
  useEditThreadMetadata, 
  useThreads, 
  useUser, 
} from '../../liveblocks.config';

type OverplayThreadProps = {
  thread: ThreadData<ThreadMetadata>
  maxZIndex: number;
};

const overlayThread = ({ thread, maxZIndex }: OverplayThreadProps) => {

  return (
    <>
      <div 
        className='absolute left-0 top-0 flex gap-5' 
        id={`thread-${thread.id}`}
        style={{
          transform: `translate(${thread.metadata.x})px, ${thread.metadata.y}px`,
        }}
      >
        
      </div>
    </>
  );
};

const CommentsOverlay = () => {

  const { threads } = useThreads();
  const maxIndex = useMaxIndex();
  
  return (
    <div>
      
    </div>
  );
};

export default CommentsOverlay;
