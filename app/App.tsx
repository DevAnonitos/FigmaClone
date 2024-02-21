"use client";

import React, { useState, useRef, useEffect } from 'react';
import Live from '@/components/Live';
import { fabric } from "fabric";
import { useMutation, useRedo, useStorage, useUndo } from '@/liveblocks.config';
import { LeftSidebar, Navbar, RightSidebar } from '@/components/index';

// Type || libs
import { handleImageUpload } from '@/lib/shapes';
import { defaultNavElement } from '@/constants';
import { ActiveElement, Attributes } from '@/types/type';

import { handleDelete, handleKeyDown } from '@/lib/key-events';

import { 
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCanvasObjectMoving,
  handleCanvasObjectScaling,
  handleCanvasZoom,
  handleCanvasSelectionCreated,
  handleResize,
  handlePathCreated,
  initializeFabric,
  renderCanvas,
} from '@/lib/canvas'; 

const Home = () => {

  const undo = useUndo();
  const redo = useRedo();

  const canvasObjects = useStorage((root) => root.canvasObjects);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const selectedShapeRef = useRef<string | null>(null);

  const activeObjectRef = useRef<fabric.Object | null>(null);
  const isEditingRef = useRef(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });
  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(shapeId);
  }, []);

  const deleteAllShapes = useMutation(({ storage}) => {
    const canvasObjects = storage.get("canvasObjects");

    if(!canvasObjects || canvasObjects.size === 0) return true;

    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }
    
    return canvasObjects.size === 0;
  }, []);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if(!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.object = objectId;

    const canvasObjects = storage.get("canvasObjects");

    canvasObjects.set(objectId, shapeData);
  }, []);

  
  return (
    <>
      <main className='h-screen overflow-hidden'>
        <Navbar 
          imageInputRef={imageInputRef}
          activeElement={activeElement}
          handleImageUpload={(e: any) => {
            e.stopPropagation();
            
            handleImageUpload({
              file: e.target.files[0],
              canvas: fabricRef as any,
              // @ts-ignore
              shapeRef,
              syncShapeInStorage,
            });
          }}
        />
        <section className='flex h-full flex-row'>
          <LeftSidebar />

          <Live canvasRef={canvasRef} undo={undo} redo={redo} />

          <RightSidebar
            elementAttributes={elementAttributes}
            setElementAttributes={setElementAttributes}
            fabricRef={fabricRef}
            isEditingRef={isEditingRef}
            activeObjectRef={activeObjectRef}
            syncShapeInStorage={syncShapeInStorage}
          />
        </section>
      </main>
    </>
  );
};

export default Home;