"use client";

import { useRef, useEffect, useState } from "react";
import { Image as KonvaImage, Transformer, Text } from "react-konva";

export default function DraggableResizableImage({
  image,
  x,
  y,
  isSelected,
  onSelect,
  onChange,
  onDelete,
  width,
  height,
}) {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const FIXED_WIDTH = 150;
  const [currentWidth, setCurrentWidth] = useState(width || FIXED_WIDTH);
  const [currentHeight, setCurrentHeight] = useState(height || 0);

  // Set initial dimensions (width = 150px, height based on aspect ratio)
  useEffect(() => {
    if (image && image.width && image.height) {
      const ratio = image.height / image.width;
      const initialHeight = FIXED_WIDTH * ratio;

      const initialWidth = width || FIXED_WIDTH;
      const finalHeight = height || initialHeight;

      setCurrentWidth(initialWidth);
      setCurrentHeight(finalHeight);

      // Notify parent only if width/height not yet provided
      if (!width || !height) {
        onChange({
          x,
          y,
          image,
          src: image.src,
          width: initialWidth,
          height: finalHeight,
        });
      }
    }
  }, [image, width, height]);

  // Handle selection for transformer
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
        width={currentWidth}
        height={currentHeight}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          const newWidth = node.width() * scaleX;
          const newHeight = node.height() * scaleY;

          setCurrentWidth(newWidth);
          setCurrentHeight(newHeight);

          onChange({
            x: node.x(),
            y: node.y(),
            image,
            src: image.src,
            width: newWidth,
            height: newHeight,
          });
        }}
      />

      {isSelected && (
        <>
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
          {/* Delete Button */}
          <Text
            text="🗑️ Delete"
            x={x + 15}
            y={y - 20}
            fontSize={18}
            onClick={onDelete}
            onTap={onDelete}
            fill="red"
           
          />
        </>
      )}
    </>
  );
}
