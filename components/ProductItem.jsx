// components/ProductItem.js
export default function ProductItem({ src, type, onDragStart }) {
  return (
    <>
      <div className="lg:p-5 p-3 bg-outfit-gray-img items-center justify-center flex rounded-md">
        <img
          src={src}
          alt={type}
          draggable
          onDragStart={(e) => onDragStart(e, type, src)}
          className="h-16 max-w-16 cursor-move"
        />
      </div>
    </>
  );
}
