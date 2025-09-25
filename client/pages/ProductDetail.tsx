import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useParams, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, dispatch, state } = useStore();
  const product = getProduct(id!);
  const [qty, setQty] = useState(1);

  if (!product) return <div className="p-4">Product not found.</div>;
  const isFav = state.favourites.includes(product.id);

  return (
    <div className="pb-24">
      <header className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <div className="text-xl font-semibold">{product.name}</div>
        <button
          className="ml-auto text-zinc-600"
          onClick={() => dispatch({ type: "TOGGLE_FAV", id: product.id })}
          aria-label="toggle favourite"
        >
          <Heart className={`h-6 w-6 ${isFav ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </header>

      <div className="px-4">
        <img src={product.image} alt={product.name} className="w-full h-64 object-contain" />
        <div className="mt-4">
          <div className="text-2xl font-semibold">${product.price.toFixed(2)}</div>
          <div className="text-sm text-muted-foreground">{product.unit}, Price</div>
        </div>

        <p className="mt-4 text-zinc-600 text-sm leading-relaxed">
          {product.description}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </Button>
          <div className="w-6 text-center">{qty}</div>
          <Button variant="outline" size="icon" onClick={() => setQty((q) => q + 1)}>
            +
          </Button>
        </div>

        <Button className="w-full h-12 mt-6" onClick={() => dispatch({ type: "ADD_TO_CART", id: product.id, qty })}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
