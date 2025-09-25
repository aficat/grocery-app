import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShoppingCart, Home, Search, Heart, User2 } from "lucide-react";

const tabs = [
  { to: "/", label: "Shop", icon: Home },
  { to: "/explore", label: "Explore", icon: Search },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/favourite", label: "Favourite", icon: Heart },
  { to: "/account", label: "Account", icon: User2 },
];

export default function BottomNav() {
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 bottom-2 w-[min(100%,420px)] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-2 px-3 flex justify-between z-40 rounded-2xl shadow-lg pb-[max(env(safe-area-inset-bottom),0.5rem)]">
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 text-xs text-zinc-600 dark:text-zinc-300 px-2",
              isActive && "text-primary",
            )
          }
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
