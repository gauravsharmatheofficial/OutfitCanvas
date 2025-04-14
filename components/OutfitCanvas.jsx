"use client";

import { useState, forwardRef, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import DraggableResizableImage from "./DraggableResizableImage";

const OutfitCanvas = forwardRef(
  (
    { droppedItems, setDroppedItems, handleDelete, selectedId, setSelectedId },
    ref
  ) => {
    const handleSelect = (index) => {
      setSelectedId(index);
    };

    const handleChange = (index, newAttrs) => {
      const updated = [...droppedItems];
      const prevItem = droppedItems[index];

      updated[index] = {
        ...prevItem, // Keep all previous values including `addedToCart`
        ...newAttrs, // Update the modified ones like x, y, width, height
      };

      setDroppedItems(updated);
    };

    const handleStageClick = (e) => {
      // If clicked on empty canvas (not an image)
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        setSelectedId(null);
      }
    };

    const [dimensions, setDimensions] = useState({
      width: window.innerWidth - 400,
      height: window.innerHeight - 300,
    });

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1024) {
          setDimensions({
            width: window.innerWidth - 100,
            height: window.innerHeight - 300,
          });
        } else {
          setDimensions({
            width: window.innerWidth - 400,
            height: window.innerHeight - 300,
          });
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        ref={ref}
        className="border-2 border-outfit-gray-border rounded-2xl border-dashed w-full h-full"
        onMouseDown={handleStageClick}
        onTouchStart={handleStageClick}
      >
        <Layer>
          {droppedItems.map((item, index) => (
            <DraggableResizableImage
              key={index}
              {...item}
              isSelected={index === selectedId}
              onSelect={() => handleSelect(index)}
              onChange={(newAttrs) => handleChange(index, newAttrs)}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
);

OutfitCanvas.displayName = "OutfitCanvas";
export default OutfitCanvas;
