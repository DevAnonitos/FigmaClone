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
      <div>
        
      </div>
    </>
  );
};

const CommentsOverlay = () => {

  const { threads } = useThreads();
  const maxIndex = useMaxIndex();
  
  return (
    <div>CommentsOverlay</div>
  );
};

export default CommentsOverlay;
