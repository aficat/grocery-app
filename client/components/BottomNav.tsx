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
    <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-2 px-3 flex justify-between z-40">
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 text-xs text-zinc-600 dark:text-zinc-300 px-2",
              isActive && "text-primary"
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
