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

type ComposerCoords = null | { x: number; y: number};

type Props = {
  children: ReactNode;
};  

const NewThread = ({ children }: Props) => {

  const [creatingCommentState, setCreatingCommentState] = useState< "placing" | "placed" | "complete" >("complete");

  const createThread = useCreateThread();

  const maxZIndex = useMaxIndex();

  const [composerCoords, setComposerCoords] = useState<ComposerCoords>(null);

  const lastPointerEvent = useRef<PointerEvent>();



  const handleComposerSubmit = useCallback(() => {

  }, [createThread, composerCoords, maxZIndex]);

  return (
    <>
      <Slot
        style={{ opacity: creatingCommentState !== "complete" ? 0.7 : 1 }}
        onClick={() => 
          setCreatingCommentState(
            creatingCommentState !== "complete" ? "complete": "placing"
        )}
      >
        {children}
      </Slot>
      {composerCoords && creatingCommentState === "placed" ? (
        <>
          <Portal.Root 
            className='absolute left-0 top-0' 
            data-hide-cursors
            style={{
              transform: `translate(${composerCoords.x}px, ${composerCoords.y}px)`
            }}
          >
            <PinnedComposer onComposerSubmit={handleComposerSubmit} />
          </Portal.Root>
        </>
      ) : null}

      <NewThreadCursor display={creatingCommentState === "placing"} />
    </>
  );
};

export default NewThread;