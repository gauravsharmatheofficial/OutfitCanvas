"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

function Navbar() {
  const { toggleCart } = useCart();

  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="flex justify-between items-center mx-auto py-2 px-3">
        <a href="/">
          <Image
            src="/torrins logo.png"
            width={120}
            height={50}
            alt="Torrins Logo"
          />
        </a>

        <PiShoppingCartSimpleBold
          onClick={toggleCart}
          className="text-xl cursor-pointer"
        />
      </div>
    </nav>
  );
}

export default Navbar;
