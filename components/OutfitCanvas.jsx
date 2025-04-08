"use client";

import { useState, forwardRef } from "react";
import { Stage, Layer } from "react-konva";
import DraggableResizableImage from "./DraggableResizableImage";

const OutfitCanvas = forwardRef(({ droppedItems, setDroppedItems }, ref) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (index) => {
    setSelectedId(index);
  };

  const handleChange = (index, newAttrs) => {
    const updated = [...droppedItems];
    updated[index] = newAttrs;
    setDroppedItems(updated);
  };

  return (
    <Stage width={800} height={600} ref={ref} className="bg-red-50">
      <Layer>
        {droppedItems.map((item, index) => (
          <DraggableResizableImage
            key={index}
            {...item}
            isSelected={index === selectedId}
            onSelect={() => handleSelect(index)}
            onChange={(newAttrs) => handleChange(index, newAttrs)}
          />
        ))}
      </Layer>
    </Stage>
  );
});

OutfitCanvas.displayName = "OutfitCanvas";
export default OutfitCanvas;
