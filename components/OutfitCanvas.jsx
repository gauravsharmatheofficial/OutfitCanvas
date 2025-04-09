"use client";

import { useState, forwardRef } from "react";
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

    return (
      <Stage
        width={1100}
        height={750}
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
