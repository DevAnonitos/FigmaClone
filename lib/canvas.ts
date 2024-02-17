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

};

export const handleCanvasMouseDown = ({ 
  options,
  canvas,
  selectedShapeRef,
  isDrawing,
  shapeRef,
}: CanvasMouseDown) => {

};

export const handleCanvasMouseMove = ({ 
  options,
  canvas,
  isDrawing,
  selectedShapeRef,
  shapeRef,
  syncShapeInStorage,
}: CanvasMouseMove) => {

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

