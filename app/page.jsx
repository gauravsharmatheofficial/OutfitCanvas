"use client";

import { useState, useRef, useEffect } from "react";
import ProductItem from "@/components/ProductItem";
import OutfitCanvas from "@/components/OutfitCanvas";
import CartSidebar from "@/components/CartSidebar";
import Demostage from "@/components/Demostage";
import { RiResetLeftFill } from "react-icons/ri";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

import { useCart } from "@/context/CartContext";

import { items } from "@/lib/getProducts";

export default function Home() {
  const [droppedItems, setDroppedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const stageRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const { showCart, toggleCart } = useCart();

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

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

  const handleDragStart = (e, type, src, title, price) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData("src", src);
    e.dataTransfer.setData("title", title);
    e.dataTransfer.setData("price", price);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("src");
    const type = e.dataTransfer.getData("type");
    const title = e.dataTransfer.getData("title");
    const price = e.dataTransfer.getData("price");

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
        title,
        price,
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
    notAddedItems.forEach(({ src }) => {
      const product = items.find((item) => item.src === src);
      if (!product) return;

      if (newItemsMap[src]) {
        newItemsMap[src].count += 1;
      } else {
        newItemsMap[src] = {
          src: product.src,
          type: product.type,
          title: product.title,
          price: product.price,
          count: 1,
        };
      }
    });

    console.log("notAddedItems", notAddedItems);

    setCartItems((prev) => {
      const updated = [...prev];
      Object.values(newItemsMap).forEach(
        ({ src, type, count, title, price }) => {
          const existingIndex = updated.findIndex((item) => item.src === src);
          if (existingIndex !== -1) {
            updated[existingIndex] = {
              ...updated[existingIndex],
              count: updated[existingIndex].count + count,
            };
          } else {
            updated.push({ src, type, count, title, price });
          }
        }
      );
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
    <>
      <div className="bg-outfit-gray-bg p-3 relative h-full">
        <div className="mx-auto flex lg:flex-row flex-col lg:h-[85vh] border-2 border-outfit-gray-border rounded-md bg-white">
          {/* Products */}
          <div className="p-5 border-r-2 border-outfit-gray-border pr-2 overflow-hidden">
            <h1 className="text-center text-xl text-bold mb-2">Products</h1>
            <div className="flex lg:grid lg:grid-cols-2 overflow-auto lg:gap-5 gap-3 h-full pr-3 lg:pb-8 pb-3">
              {items.map((item) => (
                <ProductItem
                  {...item}
                  onDragStart={handleDragStart}
                  key={item.id}
                />
              ))}
            </div>
          </div>

          <div className="p-5 flex flex-col justify-center items-center ">
            <div className="pb-5 gap-5 flex justify-center">
              <button
                onClick={handleClearCanvas}
                className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 
              hover:cursor-pointer"
              >
                <RiResetLeftFill />
                Reset Canvas
              </button>
              {/* <button
              onClick={handleClearCanvas}
              className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 hover:cursor-pointer"
            >
              <FaRegSave />
              Save Canvas
            </button> */}
              <button
                onClick={handleAddToCart}
                className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 hover:cursor-pointer"
              >
                <PiShoppingCartSimpleBold />
                Add to Cart
              </button>
              {/* <button
              onClick={handleDelete}
              className="flex gap-1.5 items-center bg-outfit-gray-button border-[1px] border-outfit-gray-border shadow-md hover:bg-outfit-gray-border transition rounded-md px-5 py-1.5 hover:cursor-pointer"
            >
              <RiDeleteBinLine />
            </button> */}
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
        </div>

        {showCart && (
          <div className="absolute right-0 top-0 flex justify-end bg-[rgba(0,0,0,0.1)] h-full w-full">
            <CartSidebar
              cartItems={cartItems}
              updateCartItem={updateCartItem}
            />
          </div>
        )}
      </div>
    </>
  );
}
