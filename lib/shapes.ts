import { fabric } from "fabric"; 
import { v4 as uuidv4 } from "uuid";

import { 
  CustomFabricObject, 
  ElementDirection, 
  ImageUpload, 
  ModifyShape 
} from "@/types/type";

export const createRectangle = (pointer: PointerEvent) => {

};

export const createTriangle = (pointer: PointerEvent) => {

};

export const createCircle = (pointer: PointerEvent) => {

};

export const createLine = (pointer: PointerEvent) => {

};

export const createText = (pointer: PointerEvent, text: string) => {

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

