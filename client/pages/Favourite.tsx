import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import MobileShell from "@/components/MobileShell";

export default function Favourite() {
  const { state, dispatch, getProduct } = useStore();
  const favProducts = state.favourites
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <MobileShell>
      <div className="pb-28">
        <header className="p-4 text-2xl font-semibold">Favourite</header>
        <div className="px-4 flex flex-col gap-4">
          {favProducts.length === 0 && (
            <div className="text-sm text-muted-foreground">No favourites yet.</div>
          )}
          {favProducts.map((p) => (
            <div key={p.id} className="flex items-center gap-3 border-b pb-3">
              <img src={p.image} alt={p.name} className="w-12 h-12 object-contain" />
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.unit}, Price</div>
              </div>
              <div className="font-semibold">${p.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        {favProducts.length > 0 && (
          <div className="fixed left-1/2 -translate-x-1/2 bottom-20 w-[min(100%,420px)] px-4">
            <Button
              className="w-full h-12"
              onClick={() => favProducts.forEach((p) => dispatch({ type: "ADD_TO_CART", id: p.id }))}
            >
              Add item(s) to cart
            </Button>
          </div>
        )}
        <BottomNav />
      </div>
    </MobileShell>
  );
}
