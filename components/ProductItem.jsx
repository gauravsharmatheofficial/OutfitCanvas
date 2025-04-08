// components/ProductItem.js
export default function ProductItem({ src, type, onDragStart }) {
  return (
    <img
      src={src}
      alt={type}
      draggable
      onDragStart={(e) => onDragStart(e, type, src)}
      className="w-16 h-16 m-2 cursor-move"
    />
  );
}
