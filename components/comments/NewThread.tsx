"use client";

import React, { 
  FormEvent, 
  ReactNode, 
  useCallback, 
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as Portal from "@radix-ui/react-portal";
import { ComposerSubmitComment } from "@liveblocks/react-comments/primitives";

import { useCreateThread } from '@/liveblocks.config';
import { useMaxIndex } from '@/lib/useMaxZIndex';

import PinnedComposer from './PinnedComposer';
import NewThreadCursor from './NewThreadCursor';

type Props = {
  children: ReactNode;
};  

const NewThread = ({ children }: Props) => {
  return (
    <>
      <Slot>
        {children}
      </Slot>
    </>
  );
};

export default NewThread;