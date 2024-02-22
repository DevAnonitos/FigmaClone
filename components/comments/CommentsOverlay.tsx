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

const OverlayThread = ({ thread, maxZIndex }: OverplayThreadProps) => {

  const editThreadMetadata = useEditThreadMetadata();

  const { isLoading } = useUser(thread.comments[0].userId);

  const threadRef = useRef<HTMLDivElement>(null);

  const handleIncreaseZIndex = useCallback(() => {

  }, [thread, editThreadMetadata, maxZIndex]);

  if(isLoading) {
    return null;
  }

  return (
    <>
      <div 
        className='absolute left-0 top-0 flex gap-5' 
        id={`thread-${thread.id}`}
        style={{
          transform: `translate(${thread.metadata.x})px, ${thread.metadata.y}px`,
        }}
      >
        <PinnedThread thread={thread} onFocus={handleIncreaseZIndex} />
      </div>
    </>
  );
};

const CommentsOverlay = () => {

  const { threads } = useThreads();
  const maxIndex = useMaxIndex();
  
  return (
    <div>
      {threads.filter((thread) => !thread.metadata.resolved).map((thread) => (
        <OverlayThread
          key={thread.id}
          thread={thread}
          maxZIndex={maxIndex}
        />
      ))}
    </div>
  );
};

export default CommentsOverlay;
