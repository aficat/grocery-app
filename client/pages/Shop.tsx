import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";
import BottomNav from "@/components/BottomNav";
import MobileShell from "@/components/MobileShell";
import { Plus } from "lucide-react";

export default function Shop() {
  const { dispatch } = useStore();
  return (
    <MobileShell>
      <div className="pb-28">
        <header className="p-4 text-2xl font-semibold">Shop</header>
        <div className="px-4 grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative rounded-xl overflow-hidden bg-white border"
            >
              <Link to={`/product/${p.id}`} className="block">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-28 object-contain p-2"
                />
                <div className="px-3 pb-4">
                  <div className="font-medium line-clamp-1">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.unit}, Price
                  </div>
                  <div className="font-semibold mt-1">
                    ${p.price.toFixed(2)}
                  </div>
                </div>
              </Link>
              <button
                className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-blue-600 text-white grid place-items-center shadow"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch({ type: "ADD_TO_CART", id: p.id });
                }}
                aria-label={`Add ${p.name}`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <BottomNav />
      </div>
    </MobileShell>
  );
}
