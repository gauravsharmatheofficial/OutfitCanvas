"use client";

import { useState, useRef, useEffect } from "react";
import ProductItem from "@/components/ProductItem";
import OutfitCanvas from "@/components/OutfitCanvas";
import CartSidebar from "@/components/CartSidebar";
import { getProducts } from "@/lib/getProducts";
import { FaRegSave } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [items, setItems] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const stageRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const products = await getProducts();
      const mapped = products.map((product) => ({
        src: product.image,
        type: product.category,
        title: product.title,
        price: product.price,
        id: product.id,
      }));
      setItems(mapped);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const savedCanvas = localStorage.getItem("droppedItems");
    const savedCart = localStorage.getItem("cartItems");

    if (savedCanvas) {
      const parsedCanvas = JSON.parse(savedCanvas);
      parsedCanvas.forEach((item) => {
        const img = new window.Image();
        img.src = item.src;
        img.onload = () => {
          item.image = img;
          setDroppedItems((prev) => [...prev, item]);
        };
      });
    }

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const serializableItems = droppedItems.map((item) => ({
      ...item,
      image: undefined,
    }));
    localStorage.setItem("droppedItems", JSON.stringify(serializableItems));
  }, [droppedItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleDragStart = (e, type, src) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("src", src);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("src");
    const type = e.dataTransfer.getData("type");

    const stage = stageRef.current;
    const rect = stage.container().getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const newItem = {
        image: img,
        x,
        y,
        width: img.width * 0.5,
        height: img.height * 0.5,
        type,
        src,
        addedToCart: false,
      };
      setDroppedItems((prev) => [...prev, newItem]);
    };
  };

  const handleAddToCart = () => {
    const notAddedItems = droppedItems.filter((item) => !item.addedToCart);
    if (notAddedItems.length === 0) return;

    const newItemsMap = {};
    notAddedItems.forEach(({ src, type }) => {
      if (newItemsMap[src]) {
        newItemsMap[src].count += 1;
      } else {
        newItemsMap[src] = { src, type, count: 1 };
      }
    });

    setCartItems((prev) => {
      const updated = [...prev];
      Object.values(newItemsMap).forEach(({ src, type, count }) => {
        const existingIndex = updated.findIndex((item) => item.src === src);
        if (existingIndex !== -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            count: updated[existingIndex].count + count,
          };
        } else {
          updated.push({ src, type, count });
        }
      });
      return updated;
    });

    setDroppedItems((prev) =>
      prev.map((item) =>
        !item.addedToCart ? { ...item, addedToCart: true } : item
      )
    );
  };

  const updateCartItem = (src, action) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.src !== src) return item;
          if (action === "increment") return { ...item, count: item.count + 1 };
          else if (action === "decrement")
            return item.count > 1 ? { ...item, count: item.count - 1 } : item;
          else if (action === "delete") return null;
        })
        .filter(Boolean)
    );
  };

  const handleClearCanvas = () => {
    setDroppedItems([]);
    localStorage.removeItem("droppedItems");
  };

  const handleDelete = (index) => {
    const updated = droppedItems.filter((_, i) => i !== index);
    setDroppedItems(updated);
    setSelectedId(null);
  };

  return (
    <div className="bg-outfit-gray-bg py-3 ">
      <div className="max-w-7xl mx-auto flex h-[85vh] border-outfit-gray-border border-2 rounded-md bg-white">
        {/* Products */}
        <div className="p-5 grid grid-cols-2 gap-3">
          {items.map((item) => (
            <ProductItem
              {...item}
              onDragStart={handleDragStart}
              key={item.id}
            />
          ))}
        </div>

        <div className="p-5">
          <div className="pb-5 gap-5 flex justify-center">
            <button
              onClick={handleClearCanvas}
              className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 
              hover:cursor-pointer"
            >
              <RiResetLeftFill />
              Reset Canvas
            </button>
            <button
              onClick={handleClearCanvas}
              className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 hover:cursor-pointer"
            >
              <FaRegSave />
              Save Canvas
            </button>
            <button
              onClick={handleAddToCart}
              className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 hover:cursor-pointer"
            >
              <PiShoppingCartSimpleBold />
              Add to Cart
            </button>
            <button
              onClick={handleDelete}
              className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 hover:cursor-pointer"
            >
              <RiDeleteBinLine />
            </button>
          </div>

          {/* Canvas */}
          <div
            className=""
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <OutfitCanvas
              droppedItems={droppedItems}
              setDroppedItems={setDroppedItems}
              handleDelete={handleDelete}
              ref={stageRef}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>
        </div>

        <CartSidebar cartItems={cartItems} updateCartItem={updateCartItem} />
      </div>
    </div>
  );
}
