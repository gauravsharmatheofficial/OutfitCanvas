export default function CartSidebar({ cartItems }) {
  return (
    <div className="w-1/4 bg-green-50 p-4 border-l">
      <h2 className="text-lg font-bold mb-2">🛒 Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500">No items yet</p>
      ) : (
        cartItems.map((item, i) => (
          <div key={i} className="text-sm mb-2">
            ✅ {item.type}
          </div>
        ))
      )}
    </div>
  );
}
