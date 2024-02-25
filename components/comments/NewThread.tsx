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

  const [allowUseComposer, setAllowUseComposer] = useState(false);
  const allowComposerRef = useRef(allowUseComposer);
  allowComposerRef.current = allowUseComposer;

  useEffect(() => {
    if(creatingCommentState === "complete") {
      return;
    }

    const newComment = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.documentElement.addEventListener("click", newComment);

    return () => {
      document.documentElement.removeEventListener("click", newComment);
    };
  }, [creatingCommentState]);


  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      (e as any)._saveComposedPath = e.composedPath();
      lastPointerEvent.current = e;
    };

    document.documentElement.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.documentElement.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    if(creatingCommentState !== "placing") {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      if(allowComposerRef.current) {
        return;
      }

      (e as any)._saveComposedPath = e.composedPath();
      lastPointerEvent.current = e;
      setAllowUseComposer(true);
    };

    const handleContextMenu = (e: Event) => {
      if(creatingCommentState === "placing") {
        e.preventDefault();
        setCreatingCommentState("complete");
      }
    };

    document.documentElement.addEventListener("pointerdown", handlePointerDown);
    document.documentElement.addEventListener("contextmenu", handleContextMenu);
  }, [creatingCommentState]);


  const handleComposerSubmit = useCallback(({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

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