"use client";

import { useState, useRef } from "react";
import ProductItem from "@/components/ProductItem";
import OutfitCanvas from "@/components/OutfitCanvas";

const items = [
  { src: "/products/tops/top1.webp", type: "shirt" },
  { src: "/products/tops/top2.jpg", type: "pants" },
  { src: "/products/tops/top3.jpg", type: "cap" },
];

export default function Home() {
  const [droppedItems, setDroppedItems] = useState([]);
  const stageRef = useRef(null);

  const handleDragStart = (e, type, src) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("src", src);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("src");

    const stage = stageRef.current;
    const rect = stage.container().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setDroppedItems((prev) => [
        ...prev,
        {
          image: img,
          x,
          y,
          width: img.width * 0.5, // optional initial size
          height: img.height * 0.5,
        },
      ]);
    };
  };

  return (
    <div className="max-w-screen-xl flex mx-auto p-4 min-h-screen gap-3">
      <div className="w-2s p-4 bg-yellow-100 rounded-2xl shadow-2xl">
        <h1 className="text-center textl-xl">Products</h1>
        {items.map((item, index) => (
          <ProductItem key={index} {...item} onDragStart={handleDragStart} />
        ))}
      </div>

      <div
        className="flex-1 rounded-2xl shadow-2xl bg-amber-500 relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <OutfitCanvas
          droppedItems={droppedItems}
          setDroppedItems={setDroppedItems}
          ref={stageRef}
        />
      </div>
    </div>
  );
}
