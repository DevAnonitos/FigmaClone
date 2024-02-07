"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import  ShapesMenu from './ShapesMenu';
import { navElements } from '@/constants';

import { NavbarProps, ActiveElement } from '@/types/type';


const Navbar = ({ 
  activeElement, 
  imageInputRef, 
  handleImageUpload, 
  handleActiveElement 
}: NavbarProps) => {

  const isActive =  (value: string | Array<ActiveElement>) => (activeElement && activeElement.value === value) || (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value));

  return (
    <>
      <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white border-b-[1px] border-gray-700'>
        ProFigClone

        <ul className='flex flex-row'>
          {navElements.map((item: ActiveElement | any) => (
            <li 
              key={item.name}
              onClick={() => {
                if(Array.isArray(item.value)) return;
                handleActiveElement(item)
              }}
              className={`group px-2.5 py-5 flex justify-center items-center  
                ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}
              `}
            >
              {Array.isArray(item.value) ? (
                <>
                  <ShapesMenu
                    item={item}
                    activeElement={activeElement}
                    imageInputRef={imageInputRef}
                    handleActiveElement={handleActiveElement}
                    handleImageUpload={handleImageUpload}
                  />
                </>
              ): item?.value === "comments" ? (
                <>
                </>
              ): (
                <>
                  <Button className='relative w-5 h-5 object-contain'>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className={isActive(item.value) ? "invert" : ""}
                    />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default memo(Navbar, (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement);