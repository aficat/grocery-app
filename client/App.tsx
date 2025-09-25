import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Explore from "./pages/Explore";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";
import Account from "./pages/Account";
import ProductDetail from "./pages/ProductDetail";
import { StoreProvider } from "@/lib/store";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/account" element={<Account />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
