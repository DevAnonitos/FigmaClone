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

            <div 
              className='absolute left-2 top-5 bg-blue-500 px-4 py-2 
              text-sm leading-relaxed text-white' 
              style={{borderRadius: 20}}
            >
              {cursorState.previousMessage && <div>{cursorState.previousMessage}</div>}
              <input
                className='z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none'
                autoFocus={true}
                placeholder={cursorState.previousMessage ? "" : "Say Something."}
                value={cursorState.message}
                maxLength={50}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CursorChat;