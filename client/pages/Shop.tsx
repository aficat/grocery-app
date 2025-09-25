import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import BottomNav from "@/components/BottomNav";

export default function Shop() {
  const { dispatch } = useStore();
  return (
    <div className="pb-24">
      <header className="p-4 text-2xl font-semibold">Shop</header>
      <div className="px-4 grid grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg overflow-hidden bg-white">
            <Link to={`/product/${p.id}`} className="block">
              <img src={p.image} alt={p.name} className="w-full h-28 object-contain p-2" />
              <div className="px-3 pb-2">
                <div className="font-medium line-clamp-1">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.unit}, Price</div>
                <div className="font-semibold mt-1">${p.price.toFixed(2)}</div>
              </div>
            </Link>
            <div className="p-3 pt-0">
              <Button className="w-full" onClick={() => dispatch({ type: "ADD_TO_CART", id: p.id })}>
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
