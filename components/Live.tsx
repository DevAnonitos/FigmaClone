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
  Cursor, 
  CursorChat, 
  LiveCursors 
} from './cursor';

import { 
  useBroadcastEvent, 
  useEventListener, 
  useMyPresence, 
  useOthers, 
} from '@/liveblocks.config';
import { Reaction, CursorMode, CursorState, ReactionEvent } from '../types/type';
import useInterval from '@/hooks/useInterval';
import FlyingReaction from './reaction/FlyingReaction';
import ReactionSelector from './reaction/ReactionButton';

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  undo: () => void;
  redo: () => void;
};

const Live = ({ canvasRef, undo, redo }: Props) => {

  const others = useOthers();
  const [{cursor}, updateMyPresence] = useMyPresence() as any;

  const broadcast = useBroadcastEvent();

  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  },[]);

  useInterval(() => {
    setReactions((reactions) => reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000));
  }, 1000);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger 
          className='relative flex h-full w-full flex-1 items-center justify-center'
          id='canvas'
        >
          <canvas ref={canvasRef} />

          {/* Cursor live */}
          {reactions.map((reaction) => (
            <FlyingReaction 
              key={reaction.timestamp.toString()}
              x={reaction.point.x}
              y={reaction.point.y}
              timestamp={reaction.timestamp}
              value={reaction.value}
            />
          ))}

          {cursor && (
            <CursorChat
              cursor={cursor}
              cursorState={cursorState}
              setCursorState={setCursorState}
              updateMyPresence={updateMyPresence}
            />
          )}

          {cursorState.mode === CursorMode.ReactionSelector && (
            <ReactionSelector
              setReaction={(reaction) => {
                setReaction(reaction);
              }}
            />
          )}

          <LiveCursors others={others} />
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