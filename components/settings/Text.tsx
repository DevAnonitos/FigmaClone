import React from 'react';
import { 
  fontFamilyOptions, 
  fontSizeOptions, 
  fontWeightOptions 
} from '@/constants';

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';

type TextProps = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  handleInputChange: (property: string, value: string) => void;
};

const Text = ({ 
  fontFamily, 
  fontSize, 
  fontWeight, 
  handleInputChange 
}: TextProps) => {
  return (
    <>
      <div className='flex flex-col gap-3 border-b-[1px] border-gray-700 px-5 py-3'>
        <h3 className='text-[10px] uppercase'>
          Text
        </h3>

        <div className='flex flex-col gap-3'>

        </div>

        <div className='flex gap-2'>

        </div>
      </div>
    </>
  );
};

export default Text;