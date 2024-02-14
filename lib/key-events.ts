import { fabric } from "fabric";
import { v4 as uuidv4 } from "uuid";

import { CustomFabricObject } from "@/types/type";

export const handleCopy = (canvas: fabric.Canvas) => {

};

export const handlePaste = (
  canvas: fabric.Canvas, 
  syncShapeInStorage: (shape: fabric.Object) => void
) => {


};


export const handleDelete = (
  canvas: fabric.Canvas, 
  deleteShapeFromStorage: (id: string) => void
) => {

};

export const handleKeyDown = ({ 
  e,
  canvas,
  undo,
  redo,
  syncShapeInStorage,
  deleteShapeFromStorage,
}: {
  e: KeyboardEvent,
  canvas: fabric.Canvas | any,
  undo: () => void,
  redo: () => void,
  syncShapeInStorage: (shape: fabric.Object) => void,
  deleteShapeFromStorage: (id: string) => void
}) => {

};

