import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { ChevronRight, CreditCard, Bell, HelpCircle, MapPin, Ticket, User2, Info, ShoppingBag } from "lucide-react";

const Item = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-zinc-400" />
  </div>
);

export default function Account() {
  const { state, dispatch } = useStore();
  return (
    <div className="pb-24">
      <header className="p-4 text-2xl font-semibold">Account</header>
      <div className="px-4">
        {state.user ? (
          <div className="mb-6">
            <div className="text-xl font-semibold">{state.user.name}</div>
            <div className="text-zinc-500">{state.user.email}</div>
          </div>
        ) : (
          <div className="mb-4 text-sm text-muted-foreground">Not logged in.</div>
        )}

        <div className="divide-y">
          <Item icon={ShoppingBag} label="Orders" />
          <Item icon={User2} label="My Details" />
          <Item icon={MapPin} label="Delivery Address" />
          <Item icon={CreditCard} label="Payment Methods" />
          <Item icon={Ticket} label="Promo Code" />
          <Item icon={Bell} label="Notifications" />
          <Item icon={HelpCircle} label="Help" />
          <Item icon={Info} label="About" />
        </div>

        <div className="mt-8">
          {state.user ? (
            <Button variant="outline" className="w-full" onClick={() => dispatch({ type: "LOGOUT" })}>
              Log Out
            </Button>
          ) : (
            <Button className="w-full" onClick={() => dispatch({ type: "LOGIN_MOCK", name: "Angela Lim", email: "angelalim@gmail.com" })}>
              Log In
            </Button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
