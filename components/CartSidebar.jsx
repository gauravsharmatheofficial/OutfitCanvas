import { RiDeleteBinLine } from "react-icons/ri";
import { ScrollArea } from "./ui/scroll-area";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { MdOutlineCancelPresentation } from "react-icons/md";

export default function CartSidebar({ cartItems, updateCartItem }) {
  const { toggleCart } = useCart();

  return (
    <div className="w-xs p-4 pr-1 bg-white border-l-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Cart</h2>
        <MdOutlineCancelPresentation
          className="text-2xl mr-4 cursor-pointer hover:text-red-300"
          onClick={toggleCart}
        />
      </div>
      <ScrollArea className="h-[96%] pr-4">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">No items in cart</p>
        ) : (
          <div className="flex flex-col gap-3 pb-3">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white border-[1px] border-outfit-gray-border shadow-md transition rounded-md p-3 hover:cursor-pointer"
              >
                <div className="size-14">
                  <img src={item.src} alt={item.type} className="h-14" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="capitalize font-medium">{item.title}</span>
                    <span className="text-sm text-gray-500">₹{item.price}</span>
                  </div>

                  <div className="flex items-stretch gap-1 justify-between">
                    <button
                      onClick={() => updateCartItem(item.src, "decrement")}
                      className="px-2 rounded hover:bg-gray-300 bg-outfit-gray-border cursor-pointer"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-2">{item.count}</span>
                    <button
                      onClick={() => updateCartItem(item.src, "increment")}
                      className="px-2 rounded hover:bg-gray-300 bg-outfit-gray-border cursor-pointer"
                    >
                      <FiPlus />
                    </button>
                    <button
                      onClick={() => updateCartItem(item.src, "delete")}
                      className="px-2 py-0.5 rounded hover:bg-red-300 bg-red-200 cursor-pointer ml-2"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
