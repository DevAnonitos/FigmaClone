"use client";

import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import { Thread } from '@liveblocks/react-comments';
import { ThreadData } from '@liveblocks/client';
import { ThreadMetadata, useRedo } from '@/liveblocks.config';

type Props = {
  thread: ThreadData<ThreadMetadata>;
  onFocus: (threadId: string) => void;
};

const PinnedThread = ({ thread, onFocus, ...props }: Props) => {

  const startMinimized = useMemo(
    () => Number(new Date()) - Number(new Date(thread.createdAt)) > 100, [thread]
  );

  const [minimized, setMinimized] = useState(startMinimized);

  const memoizedContent = useMemo(() => (
    <>
      <div 
        className='absolute flex cursor-pointer gap-4' 
        {...props}
        onClick={(e: any) => {
          onFocus(thread.id);

          if (
            e.target &&
            e.target.classList.contains("lb-icon") &&
            e.target.classList.contains("lb-button-icon")
          ) {
            return;
          }

          setMinimized(!minimized);
        }}
        
      >
        <div 
          className='relative flex h-9 w-9 select-none items-center 
          justify-center rounded-bl-full rounded-br-full rounded-tl-md 
          rounded-tr-full bg-white shadow'
          data-draggable={true}
        >

        </div>
        {!minimized ? (
          <>
            <div 
              className='flex min-w-60 flex-col overflow-hidden 
              rounded-lg bg-white text-sm shadow'
            > 
              <Thread
                thread={thread}
                indentCommentContent={false}
                onKeyUp={(e) => {
                  e.stopPropagation();
                }}
              /> 
            </div>
          </>
        ): null}
      </div>
    </>
  ), [thread.comments.length]);

  return <>{memoizedContent}</>
};

export default PinnedThread;