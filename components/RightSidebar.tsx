
import React, { useMemo, useRef } from 'react';
import { 
  Color, 
  Dimensions, 
  Text, 
  Export 
} from './settings';

import { RightSidebarProps } from '@/types/type';

import { bringElement, modifyShape } from '@/lib/shapes';

const RightSidebar = ({ 
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) => {

  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property: string, value: string) => {

  };

  const memoizedContent = useMemo(() => (
    
    <section 
      className='flex flex-col border-r border-l-[1px] border-gray-700  
      bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 
      h-full max-sm:hidden select-none'
    >
      <h3 className='px-5 pt-4 text-xs uppercase'>
        Design
      </h3> 
      <span 
        className='text-xs text-primary-grey-300 mt-3 
        px-5 border-b-[1px] border-gray-700 pb-4'
      >
        Make changes to canvas as you like
      </span>

      <Dimensions 
        // isEditingRef={isEditingRef}
        // width={elementAttributes.width}
        // height={elementAttributes.height}
        // handleInputChange={handleInputChange}
      />

      <Text
        // fontFamily={elementAttributes.fontFamily}
        // fontSize={elementAttributes.fontSize}
        // fontWeight={elementAttributes.fontWeight}
        // handleInputChange={handleInputChange}
      />
        
      <Color
        // inputRef={colorInputRef}
        // attribute={elementAttributes.fill}
        // placeholder='color'
        // attributeType='fill'
        // handleInputChange={handleInputChange}
      />
      <Color
        // inputRef={colorInputRef}
        // attribute={elementAttributes.stroke}
        // placeholder='stroke'
        // attributeType='stroke'
        // handleInputChange={handleInputChange}
      />

      <Export />
    </section>
  ), [elementAttributes]);

  return memoizedContent;
};

export default RightSidebar;