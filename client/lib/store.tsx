import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { Product, products as mockProducts } from "@/data/products";

export type CartItem = { id: string; qty: number };

type State = {
  products: Product[];
  cart: CartItem[];
  favourites: string[];
  user: { id: string; name: string; email: string } | null;
};

type Action =
  | { type: "ADD_TO_CART"; id: string; qty?: number }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_FAV"; id: string }
  | { type: "LOGIN_MOCK"; name: string; email: string }
  | { type: "LOGOUT" };

const initialState: State = {
  products: mockProducts,
  cart: [],
  favourites: [],
  user: { id: "u1", name: "Angela Lim", email: "angelalim@gmail.com" },
};

const STORAGE_KEY = "fusion_grocery_state_v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_CART": {
      const qty = action.qty ?? 1;
      const existing = state.cart.find((c) => c.id === action.id);
      const cart = existing
        ? state.cart.map((c) => (c.id === action.id ? { ...c, qty: c.qty + qty } : c))
        : [...state.cart, { id: action.id, qty }];
      return { ...state, cart };
    }
    case "REMOVE_FROM_CART": {
      return { ...state, cart: state.cart.filter((c) => c.id !== action.id) };
    }
    case "SET_QTY": {
      const cart = state.cart
        .map((c) => (c.id === action.id ? { ...c, qty: Math.max(0, action.qty) } : c))
        .filter((c) => c.qty > 0);
      return { ...state, cart };
    }
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "TOGGLE_FAV": {
      const exists = state.favourites.includes(action.id);
      return {
        ...state,
        favourites: exists
          ? state.favourites.filter((id) => id !== action.id)
          : [...state.favourites, action.id],
      };
    }
    case "LOGIN_MOCK": {
      return {
        ...state,
        user: { id: "u1", name: action.name, email: action.email },
      };
    }
    case "LOGOUT": {
      return { ...state, user: null };
    }
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  totals: { count: number; subtotal: number };
  getProduct: (id: string) => Product | undefined;
} | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...init, ...JSON.parse(saved) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cart: state.cart, favourites: state.favourites, user: state.user })
    );
  }, [state.cart, state.favourites, state.user]);

  const totals = useMemo(() => {
    const subtotal = state.cart.reduce((sum, item) => {
      const p = state.products.find((x) => x.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const count = state.cart.reduce((s, i) => s + i.qty, 0);
    return { count, subtotal };
  }, [state.cart, state.products]);

  const value = useMemo(
    () => ({ state, dispatch, totals, getProduct: (id: string) => state.products.find((p) => p.id === id) }),
    [state, totals]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
