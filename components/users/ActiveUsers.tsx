"use client";

import React, { useMemo } from 'react';
import Avatar from './Avatar';
import { generateRandomName } from '@/lib/utils';
import { useOthers, useSelf } from '@/liveblocks.config';

const ActiveUsers = () => {

  const others = useOthers();

  const currentUser = useSelf();

  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2;

    return (
      <>
        <div className='flex items-center justify-center gap-1'>
          {currentUser && (
            <Avatar name='You' otherStyles='border-[3px] border-primary-green' />
          )}
        </div>
      </>
    );
  }, [others.length -2]);

  return memoizedUsers;
};

export default ActiveUsers;