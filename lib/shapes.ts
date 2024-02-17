import { fabric } from "fabric"; 
import { v4 as uuidv4 } from "uuid";

import { 
  CustomFabricObject, 
  ElementDirection, 
  ImageUpload, 
  ModifyShape 
} from "@/types/type";

export const createRectangle = (pointer: PointerEvent) => {
  const rect = new fabric.Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Rect>);

  return rect;
};

export const createTriangle = (pointer: PointerEvent) => {
  const triangle = new fabric.Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Triangle>); 
  
  return triangle;
};

export const createCircle = (pointer: PointerEvent) => {
  const circle =  new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 100,
    fill: "#aabbcc",
    objectId: uuidv4(),
  } as any);

  return circle;
};

export const createLine = (pointer: PointerEvent) => {
  const line = new fabric.Line(
    [pointer.x, pointer.y, pointer.x + 100, pointer.y + 100],
    {
      stroke: "#aabbcc",
      strokeWidth: 2,
      objectId: uuidv4(),
    } as CustomFabricObject<fabric.Line> 
  );

  return line;
};

export const createText = (pointer: PointerEvent, text: string) => {
  const txt = new fabric.Text(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: '400',
    objectId: uuidv4(),
  } as fabric.ITextOptions);

  return txt;
};

export const createSpecificShape = (shapeType: string, pointer: PointerEvent) => {

};

export const handleImageUpload = () => {

};

export const createShape = ({ 
  file,
  canvas,
  shapeRef,
  syncShapeInStorage,
}: ImageUpload) => {

};

export const modifyShape = ({ 
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}: ModifyShape) => {

};

export const bringElement = ({ 
  canvas,
  direction,
  syncShapeInStorage
}: ElementDirection) => {
  
};

