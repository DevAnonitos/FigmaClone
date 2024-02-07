"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { ShapesMenu } from '.';
import { navElements } from '@/constants';



const Navbar = () => {
  return (
    <>
      <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white border-b-[1px] border-gray-700'>
        ProFigClone
      </nav>
    </>
  );
};

export default Navbar;