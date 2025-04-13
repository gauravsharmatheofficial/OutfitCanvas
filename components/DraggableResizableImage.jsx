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
  const [scaledWidth, setScaledWidth] = useState(width);
  const FIXED_HEIGHT = 150;

  // Maintain aspect ratio on image load
  useEffect(() => {
    if (image && image.width && image.height) {
      const ratio = image.width / image.height;
      const newWidth = FIXED_HEIGHT * ratio;
      setScaledWidth(newWidth);

      // Notify parent of the dimension change if not already set
      if (!width || !height) {
        onChange({
          x,
          y,
          image,
          src: image.src,
          width: newWidth,
          height: FIXED_HEIGHT,
        });
      }
    }
  }, [image]);

  // Handle transformer selection
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
        width={scaledWidth}
        height={FIXED_HEIGHT}
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
            src: image.src,
            width: node.width() * scaleX,
            height: node.height() * scaleY,
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
            text="🗑️"
            x={x + scaledWidth - 15}
            y={y - 20}
            fontSize={18}
            onClick={onDelete}
            onTap={onDelete}
            fill="red"
            style={{ cursor: "pointer" }}
          />
        </>
      )}
    </>
  );
}
