import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import "./app.css";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const Demostage = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: window.innerHeight,
  });

  const updateSize = () => {
    if (canvasRef.current) {
      setDimensions({
        width: canvasRef.current.offsetWidth,
        height: window.innerHeight,
      });
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <h1>kdsjkjf</h1>
    // <ScrollArea className="lg:w-2xs lg:h-full pr-5 pb-5 w-full ">
    //   <div className="lg:grid lg:grid-cols-2 gap-3 pb-4 flex size-16">
    //     {items.map((item) => (
    //       <ProductItem {...item} onDragStart={handleDragStart} key={item.id} />
    //     ))}
    //   </div>
    //   <ScrollBar orientation="horizontal" />
    // </ScrollArea>
  );
};

export default Demostage;
