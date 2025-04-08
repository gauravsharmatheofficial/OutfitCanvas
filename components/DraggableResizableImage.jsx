"use client";

import { useRef, useEffect } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";

export default function DraggableResizableImage({
  image,
  x,
  y,
  isSelected,
  onSelect,
  onChange,
  width,
  height,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        image={image}
        x={x}
        y={y}
        ref={shapeRef}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        width={width}
        height={height}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            x: node.x(),
            y: node.y(),
            image,
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            const aspectRatio = oldBox.width / oldBox.height;
            return {
              ...newBox,
              height: newBox.width / aspectRatio,
            };
          }}
        />
      )}
    </>
  );
}
