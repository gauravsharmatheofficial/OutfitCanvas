"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

function Navbar() {
  const { toggleCart } = useCart();

  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto p-2">
        <a href="/">
          <Image
            src="/torrins logo.png"
            width={120}
            height={50}
            alt="Torrins Logo"
          />
        </a>
        <button
          onClick={toggleCart}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Toggle Cart
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
