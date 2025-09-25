import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/lib/store";

import MobileShell from "@/components/MobileShell";

export default function Cart() {
  const { state, dispatch, getProduct, totals } = useStore();
  return (
    <MobileShell>
      <div className="pb-32">
        <header className="p-4 text-2xl font-semibold">My Cart</header>
        <div className="px-4 flex flex-col gap-4">
          {state.cart.length === 0 && (
            <div className="text-sm text-muted-foreground">
              Your cart is empty.
            </div>
          )}
          {state.cart.map((item) => {
            const p = getProduct(item.id)!;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-3"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.unit}, Price
                  </div>
                  <div className="mt-1 font-semibold">
                    ${p.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      dispatch({
                        type: "SET_QTY",
                        id: item.id,
                        qty: item.qty - 1,
                      })
                    }
                  >
                    −
                  </Button>
                  <div className="w-6 text-center">{item.qty}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      dispatch({
                        type: "SET_QTY",
                        id: item.id,
                        qty: item.qty + 1,
                      })
                    }
                  >
                    +
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", id: item.id })
                    }
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed left-1/2 -translate-x-1/2 bottom-20 w-[min(100%,420px)] px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full h-12">
                Checkout{" "}
                <span className="ml-auto opacity-80 pl-2">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl pb-8">
              <SheetHeader>
                <SheetTitle>Checkout</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Items</span>
                  <span>{totals.count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full h-12"
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                >
                  Place order
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <BottomNav />
      </div>
    </MobileShell>
  );
}
