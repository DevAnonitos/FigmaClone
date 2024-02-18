"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { shortcuts } from '@/constants';
import useInterval from '@/hooks/useInterval';
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
import { 
  Reaction, 
  CursorMode, 
  CursorState, 
  ReactionEvent, 
} from '../types/type';
import FlyingReaction from './reaction/FlyingReaction';
import ReactionSelector from './reaction/ReactionButton';
import { Comments } from './comments';

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

  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });
    }
  }, 100);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if(e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if(e.key === "Escape"){
        updateMyPresence({ message: "" });
      } else if(e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      } 
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if(e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    if(cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setCursorState({
      mode: CursorMode.Hidden,
    });

    updateMyPresence({
      cursor: null,
      message: null,
    });

  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {

  }, [cursorState.mode, setCursorState]);

  const handlePointerUp = useCallback(() => {

  }, [cursorState.mode, setCursorState]);

  const handleContextMenuClick = useCallback((key: string) => {

  }, [])

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger 
          className='relative flex h-full w-full flex-1 items-center justify-center'
          id='canvas'
          style={{
            cursor: cursorState.mode === CursorMode.Chat ? "none" : "auto",
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
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

          {/* Realtime Cursor */}
          <LiveCursors others={others} />
          {/* Comment Element */}
          <Comments />
        </ContextMenuTrigger>

        <ContextMenuContent className='right-menu-content'>
          {shortcuts.map((item) => (
            <ContextMenuItem key={item.key} className='right-menu-item cursor-pointer'>
              <p className='text-bold'>{item.name}</p>
              <p className='text-xs text-primary-grey-300'>{item.shortcut}</p>
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
};

export default Live;