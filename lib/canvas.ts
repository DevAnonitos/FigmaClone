import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid"; 

import { 
  CanvasMouseDown, 
  CanvasMouseMove, 
  CanvasMouseUp, 
  CanvasObjectModified, 
  CanvasObjectScaling, 
  CanvasPathCreated, 
  CanvasSelectionCreated, 
  RenderCanvas,
} from "@/types/type";

import { defaultNavElement } from "@/constants";
import { createSpecificShape } from "./shapes";
import React from "react";

export const initializeFabric = ({
  fabricRef,
  canvasRef,
}: {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
}) => {
  const canvasElement = document.getElementById("canvas");

  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  fabricRef.current = canvas;

  return canvas;
};

export const handleCanvasMouseDown = ({ 
  options,
  canvas,
  selectedShapeRef,
  isDrawing,
  shapeRef,
}: CanvasMouseDown) => {
  const pointer = canvas.getPointer(options.e);

  const target = canvas.findTarget(options.e, false);

  canvas.isDrawingMode = false;

  if(selectedShapeRef.current === "freeform") {
    isDrawing.current = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    return;
  }

  canvas.isDrawingMode = false;

  if(
    target && (
      target.type === selectedShapeRef.current || 
      target.type === "activeSelection"
    )
  ) {
    isDrawing.current = false;

    canvas.setActiveObject(target);

    target.setCoords();
  } else {
    isDrawing.current = true;

    shapeRef.current = createSpecificShape(
      selectedShapeRef.current,
      pointer as any,
    );

    if(shapeRef.current) {
      canvas.add(shapeRef.current);
    }
  }
};

export const handleCanvasMouseMove = ({ 
  options,
  canvas,
  isDrawing,
  selectedShapeRef,
  shapeRef,
  syncShapeInStorage,
}: CanvasMouseMove) => {
  if(!isDrawing.current) return;
  if(selectedShapeRef.current  === "freeform") return;

  canvas.isDrawingMode = false;

  const pointer = canvas.getPointer(options.e);

  switch (selectedShapeRef?.current) {
    case "rectangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "circle":
      shapeRef.current.set({
        radius: Math.abs(pointer.x - (shapeRef.current?.left || 0)) / 2,
      });
      break;

    case "triangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "line":
      shapeRef.current?.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      break;

    case "image":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });

    default:
      break;
  }

  canvas.renderAll();

  if(shapeRef.current?.objectId) {
    syncShapeInStorage(shapeRef.current);
  }
};

export const handleCanvasMouseUp = ({ 
  canvas,
  isDrawing,
  shapeRef,
  activeObjectRef,
  selectedShapeRef,
  syncShapeInStorage,
  setActiveElement,
}: CanvasMouseUp) => {
  if(selectedShapeRef.current === "freeform") return;

  syncShapeInStorage(shapeRef.current);

  shapeRef.current = null;
  activeObjectRef.current = null;
  selectedShapeRef.current = null;

  if(!canvas.isDrawingMode) {
    setTimeout(() => {
      setActiveElement(defaultNavElement);
    }, 700)
  }
};

export const handleCanvasObjectModified = ({ 
  options,
  syncShapeInStorage,
}: CanvasObjectModified) => {
  const target = options.target;

  if(!target) return;

  if(target?.type =="activeSelection") {

  }else {
    syncShapeInStorage(target);
  }
};

export const handlePathCreated = ({ 
  options,
  syncShapeInStorage
}: CanvasPathCreated) => {
  const path = options.path;
  if(!path) return;

  path.set({
    objectId: uuidv4(),
  });

  syncShapeInStorage(path);
};

export const handleCanvasObjectMoving = ({ 
  options,
}: { options: fabric.IEvent }) => {

};

export const handleCanvasSelectionCreated = ({ 
  options,
  isEditingRef,
  setElementAttributes,
}: CanvasSelectionCreated) => {

};

export const handleCanvasObjectScaling = ({ 
  options,
  setElementAttributes,
}: CanvasObjectScaling) => {

};

export const renderCanvas = ({ 
  fabricRef,
  canvasObjects,
  activeObjectRef,
}: RenderCanvas) => {
  
};

export const handleResize = ({ 
  canvas 
}: { 
  canvas: fabric.Canvas | null 
}) => {

};

export const handleCanvasZoom = ({ 
  options,
  canvas,
}: { 
  options: fabric.IEvent & { e: WheelEvent },
  canvas: fabric.Canvas
}) => {

};

