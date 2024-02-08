import React from 'react';
import { Label } from '../ui/label';

type Props = {
  inputRef: any;
  attribute: string;
  placeholder: string;
  attributeType: string;
  handleInputChange: (property: string, value: string) => void;
};

const Color = ({ 
  inputRef, 
  attribute, 
  placeholder, 
  attributeType, 
  handleInputChange 
}: Props) => {
  return (
    <>
      <div className='flex flex-col gap-3 border-b-[1px] border-gray-700 p-5'>
        <h3 className='text-[10px] uppercase'>
          {placeholder}
        </h3>
      </div>
    </>
  );
};

export default Color;