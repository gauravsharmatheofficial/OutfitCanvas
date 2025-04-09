// app/page.js
import axios from "axios";

export default async function Home() {
  const res = await axios.get("https://fakestoreapi.com/products");
  const products = res.data;

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="mb-2 bg-amber-100 flex flex-col p-4 gap-3 justify-between items-center"
          >
            <img src={product.image} width={100} alt="" />
            <h1 className="text-center text-xl">{product.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
