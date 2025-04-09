// components/ProductItem.js
export default function ProductItem({ src, type, onDragStart }) {
  return (
    <img
      src={src}
      alt={type}
      draggable
      onDragStart={(e) => onDragStart(e, type, src)}
      className="h-16 cursor-move"
    />
  );
}
