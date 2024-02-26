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
  isDrawing.current  = false;
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
  const target = options.target as fabric.Object;

  const canvas = target.canvas as fabric.Canvas;

  target.setCoords();

  if(target && target.left) {
    target.left = Math.max(
      0,
      Math.min(
        target.left,
        (canvas.width || 0) - (target.getScaledWidth() || target.width || 0),
      ),
    );
  }

  if(target && target.top) {
    target.top = Math.max(
      0,
      Math.min(
        target.top,
        (canvas.height || 0) - (target.getScaledHeight() || target.height || 0),
      ),
    );
  }
};

export const handleCanvasSelectionCreated = ({ 
  options,
  isEditingRef,
  setElementAttributes,
}: CanvasSelectionCreated) => {
  if(isEditingRef) {
    return;
  }

  if(!options?.selected) {
    return;
  }

  const selectedElement = options?.selected[0] as fabric.Object;

  if(selectedElement && options.selected.length ===1) {
    const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      stroke: selectedElement?.stroke || "",
      // @ts-ignore
      fontSize: selectedElement?.fontSize || "",
      // @ts-ignore
      fontFamily: selectedElement?.fontFamily || "",
      // @ts-ignore
      fontWeight: selectedElement?.fontWeight || "",
    });
  }
};

export const handleCanvasObjectScaling = ({ 
  options,
  setElementAttributes,
}: CanvasObjectScaling) => {
  const selectedElement = options.target;

  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
};

export const renderCanvas = ({ 
  fabricRef,
  canvasObjects,
  activeObjectRef,
}: RenderCanvas) => {
  fabricRef.current?.clear();

  Array.from(canvasObjects, ([objectId, objectData]) => {
    /**
     * enlivenObjects() is used to render objects on canvas.
     * It takes two arguments:
     * 1. objectData: object data to render on canvas
     * 2. callback: callback function to execute after rendering objects
     * on canvas
     *
     * enlivenObjects: http://fabricjs.com/docs/fabric.util.html#.enlivenObjectEnlivables
     */
    fabric.util.enlivenObjects(
      [objectData],
      (enlivenedObjects: fabric.Object[]) => {
        enlivenedObjects.forEach((enlivenedObj) => {
          // if element is active, keep it in active state so that it can be edited further
          if (activeObjectRef.current?.objectId === objectId) {
            fabricRef.current?.setActiveObject(enlivenedObj);
          }

          // add object to canvas
          fabricRef.current?.add(enlivenedObj);
        });
      },
      /**
       * specify namespace of the object for fabric to render it on canvas
       * A namespace is a string that is used to identify the type of
       * object.
       *
       * Fabric Namespace: http://fabricjs.com/docs/fabric.html
       */
      "fabric"
    );
  });

  fabricRef.current?.renderAll();
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

