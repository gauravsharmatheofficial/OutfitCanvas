"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { Stage, Layer } from "react-konva";
import DraggableResizableImage from "./DraggableResizableImage";

const OutfitCanvas = forwardRef(
  (
    { droppedItems, setDroppedItems, handleDelete, selectedId, setSelectedId },
    ref
  ) => {
    const handleSelect = (index) => setSelectedId(index);

    const handleChange = (index, newAttrs) => {
      const updated = [...droppedItems];
      updated[index] = { ...updated[index], ...newAttrs };
      setDroppedItems(updated);
    };

    const handleStageClick = (e) => {
      if (e.target === e.target.getStage()) setSelectedId(null);
    };

    return (
      <div className="w-full border-2 border-outfit-gray-border rounded-2xl border-dashed">
        <Stage
          width={800}
          height={400}
          ref={ref}
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
      </div>
    );
  }
);

OutfitCanvas.displayName = "OutfitCanvas";
export default OutfitCanvas;
