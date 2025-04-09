export default function CartSidebar({ cartItems, updateCartItem }) {
  return (
    <div className="w-1/4 bg-green-50 p-4 border-l rounded-2xl shadow-2xl">
      <h2 className="text-lg font-bold mb-4">🛒 Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500">No items in cart</p>
      ) : (
        cartItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white p-2 mb-2 rounded shadow"
          >
            <div className="flex items-center gap-2">
              <img src={item.src} alt={item.type} className="w-10 h-10" />
              <span className="capitalize">{item.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateCartItem(item.src, "decrement")}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="px-2">{item.count}</span>
              <button
                onClick={() => updateCartItem(item.src, "increment")}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => updateCartItem(item.src, "delete")}
                className="px-2 py-1 bg-red-500 text-white rounded ml-2"
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
