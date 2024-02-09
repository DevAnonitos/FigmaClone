import React from 'react';
import { CursorChatProps, CursorMode } from '@/types/type';
import CursorSVG from '@/public/assets/CursorSVG';

const CursorChat = ({ 
  cursor, 
  cursorState, 
  setCursorState, 
  updateMyPresence 
}: CursorChatProps) => {
  return (
    <>
      <div 
        className='absolute top-0 left-0' 
        style={{
          transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
        }}
      >
        {cursorState.mode === CursorMode.Chat && (
          <>
            <CursorSVG color='#000' />
          </>
        )}
      </div>
    </>
  );
};

export default CursorChat;