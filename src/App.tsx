import React, { useState, useEffect } from "react";
import { Sparkles, MessageSquare, Phone, MapPin, Award, ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import OutletsSection from "./components/OutletsSection";
import Menu from "./components/Menu";
import CakeCustomizer from "./components/CakeCustomizer";
import Cart from "./components/Cart";
import WishlistDrawer from "./components/WishlistDrawer";
import OrderTracker from "./components/OrderTracker";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Logo from "./components/Logo";
import { Product, CartItem, Order, Review, InventoryItem, CustomizedCake } from "./types";
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_ORDERS } from "./data/menuData";

export default function App() {
  // Global States from Static Data
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("ovengrains_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved reviews", e);
      }
    }
    return INITIAL_REVIEWS;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("ovengrains_orders");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved orders", e);
      }
    }
    return INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [preselectedCake, setPreselectedCake] = useState<Product | null>(null);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ovengrains_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart load issue", e);
      }
    }

    const savedWishlist = localStorage.getItem("ovengrains_wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Wishlist load issue", e);
      }
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save cart to localStorage automatically
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("ovengrains_cart", JSON.stringify(newCart));
  };

  // Toggle products on wishlist
  const handleToggleWishlist = (productId: string) => {
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(updated);
    localStorage.setItem("ovengrains_wishlist", JSON.stringify(updated));
  };

  // Add standard product or custom cake to cart
  const handleAddToCart = (product: Product, quantity: number, customization?: CustomizedCake) => {
    const compositeId = customization 
      ? `${product.id}-${customization.size}-${customization.flavor}-${customization.eggless ? "veg" : "reg"}-${customization.message || ""}`
      : product.id;

    const existingIndex = cart.findIndex((item) => item.id === compositeId);

    if (existingIndex !== -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      updateCartState(updated);
    } else {
      const newItem: CartItem = {
        id: compositeId,
        product,
        quantity,
        customization
      };
      updateCartState([...cart, newItem]);
    }
  };

  // Special launcher helper when clicking custom from base item card
  const handleCustomizeClick = (product: Product) => {
    setPreselectedCake(product);
    // Navigate straight to customizer panel
    setCurrentSection("custom");
    const elem = document.getElementById("custom");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  // Customized Cake Submission to cart
  const handleAddCustomizedToCart = (customization: CustomizedCake, totalPrice: number) => {
    // Locate the matching base product
    const baseProduct = products.find(p => p.id === customization.productId) || products[0];
    if (!baseProduct) return;

    // Treat as a virtual custom product incorporating calculated weight/flavor modifications
    const virtualProduct: Product = {
      ...baseProduct,
      price: baseProduct.price // keep base price reference, pricing multiplier math handles it in Cart display
    };

    handleAddToCart(virtualProduct, 1, customization);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    const updated = cart.map((item) => (item.id === id ? { ...item, quantity: newQty } : item));
    updateCartState(updated);
  };

  const handleRemoveItem = (id: string) => {
    const filtered = cart.filter((item) => item.id !== id);
    updateCartState(filtered);
  };

  const handleClearCart = () => {
    updateCartState([]);
  };

  // Order Submission (Client-Side)
  const handlePlaceOrder = async (orderPayload: Partial<Order>): Promise<Order | null> => {
    try {
      const orderId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
      const paymentMethod = orderPayload.paymentMethod || "UPI";
      const newOrder: Order = {
        id: orderId,
        status: "pending",
        paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
        paymentId: orderPayload.paymentId || "pay_sim_" + Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        paymentMethod,
        items: cart,
        customerName: orderPayload.customerName || "Customer",
        phone: orderPayload.phone || "",
        whatsapp: orderPayload.whatsapp || "",
        email: orderPayload.email || "",
        address: orderPayload.address || "",
        deliveryType: orderPayload.deliveryType || "delivery",
        totalAmount: orderPayload.totalAmount || 0,
        orderNotes: orderPayload.orderNotes || ""
      };

      const updatedOrders = [newOrder, ...orders];
      setOrders(updatedOrders);
      localStorage.setItem("ovengrains_orders", JSON.stringify(updatedOrders));
      return newOrder;
    } catch (err) {
      console.error("Order submission error", err);
      return null;
    }
  };

  // Redirect to Order tracking state immediately on success
  const handleOrderSuccess = (order: Order) => {
    setActiveTrackingId(order.id);
    setCurrentSection("tracker");
    setTimeout(() => {
      const element = document.getElementById("tracker");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Post verified Review (Client-Side)
  const handleAddReview = async (reviewPayload: Partial<Review>): Promise<Review> => {
    const newReview: Review = {
      id: "rev" + Date.now(),
      author: reviewPayload.author || "Guest Customer",
      rating: reviewPayload.rating || 5,
      text: reviewPayload.text || "",
      date: new Date().toISOString().split("T")[0],
      verified: true,
      avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23c29b38'/%3E%3Cpath d='M50 45a15 15 0 1 0 0-30 15 15 0 0 0 0 30zm0 10c-20 0-35 12-35 25v5h70v-5c0-13-15-25-35-25z' fill='%23ffffff'/%3E%3C/svg%3E"
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("ovengrains_reviews", JSON.stringify(updated));
    return newReview;
  };

  // Track an Order (Client-Side)
  const handleTrackOrder = async (orderId: string): Promise<Order | null> => {
    const found = orders.find((o) => o.id.trim().toUpperCase() === orderId.trim().toUpperCase());
    return found || null;
  };

  // Submit order feedback/review (Client-Side)
  const handleAddOrderReview = async (orderId: string, rating: number, text: string): Promise<Order | null> => {
    const targetOrderIndex = orders.findIndex((o) => o.id === orderId);
    if (targetOrderIndex !== -1) {
      const updatedOrder = {
        ...orders[targetOrderIndex],
        reviewSubmitted: true,
        reviewRating: rating,
        reviewText: text
      };
      const updatedOrders = [...orders];
      updatedOrders[targetOrderIndex] = updatedOrder;
      setOrders(updatedOrders);
      localStorage.setItem("ovengrains_orders", JSON.stringify(updatedOrders));

      const newReview: Review = {
        id: "rev" + Date.now(),
        author: updatedOrder.customerName || "Verified Customer",
        rating: rating,
        text: `${text} (Verified customer review for Order #${orderId})`,
        date: new Date().toISOString().split("T")[0],
        verified: true,
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23c29b38'/%3E%3Cpath d='M50 45a15 15 0 1 0 0-30 15 15 0 0 0 0 30zm0 10c-20 0-35 12-35 25v5h70v-5c0-13-15-25-35-25z' fill='%23ffffff'/%3E%3C/svg%3E"
      };
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem("ovengrains_reviews", JSON.stringify(updatedReviews));

      return updatedOrder;
    }
    return null;
  };

  // Navigate smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setCurrentSection(sectionId);
    
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fdfbf7] selection:bg-[#c29b38]/20 selection:text-[#3d271d]">
      
      {/* Sticky Topbar Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="flex-grow relative">
          
          {/* 1. Hero */}
          <Hero
            onOrderNow={() => handleNavigate("menu")}
            onCustomizeCake={() => handleNavigate("custom")}
          />

          {/* 2. About */}
          <About />

          {/* 3. Products Menu */}
          <Menu
            products={products}
            onAddToCart={handleAddToCart}
            onCustomizeClick={handleCustomizeClick}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />

          {/* 4. Cake Interactive Customizer Studio */}
          <CakeCustomizer
            products={products}
            onAddCustomizedToCart={handleAddCustomizedToCart}
            preselectedProduct={preselectedCake}
          />

          {/* 5. Live Order tracking */}
          <OrderTracker
            onTrackOrder={handleTrackOrder}
            activeTrackingId={activeTrackingId}
            onAddOrderReview={handleAddOrderReview}
          />

          {/* 6. Customer Reviews section */}
          <Reviews
            reviews={reviews}
            onAddReview={handleAddReview}
          />

          {/* 7. Both Bakery Outlets Section */}
          <OutletsSection />

          {/* 8. Contact Details and Map */}
          <Contact />

        </main>

      {/* Shared Slide-out Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderSuccess}
        products={products}
        onAddToCart={handleAddToCart}
      />

      {/* Shared Slide-out Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        products={products}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* FOOTER SECTION */}
      <footer className="bg-[#2a170f] text-white py-12 border-t border-[#ffd700]/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Slogan */}
          <div className="space-y-3">
            <Logo size="md" showTagline={true} />
            <p className="text-[#ebdcb9] text-xs leading-relaxed mt-2">
              Baking fresh memories daily across our 2 outlets in Ranchi (Harmu & Manatu Chowk).
              Enjoy pure vegetarian gourmet cakes, pastries, and custom tiers crafted with love.
            </p>
            <span className="text-[10px] text-[#ffd700]/80 uppercase font-mono tracking-widest font-bold block">
              ★ 4.9 Star Local Rated Bakery
            </span>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#ebdcb9]">Quick Links</h4>
            <ul className="text-xs space-y-2 text-[#f4ecd8]">
              <li><button onClick={() => handleNavigate("home")} className="hover:text-[#ffd700] cursor-pointer transition">Home</button></li>
              <li><button onClick={() => handleNavigate("about")} className="hover:text-[#ffd700] cursor-pointer transition">Our Story</button></li>
              <li><button onClick={() => handleNavigate("menu")} className="hover:text-[#ffd700] cursor-pointer transition">Bakery Menu</button></li>
              <li><button onClick={() => handleNavigate("custom")} className="hover:text-[#ffd700] cursor-pointer transition">Customizer Studio</button></li>
              <li><button onClick={() => handleNavigate("outlets")} className="hover:text-[#ffd700] cursor-pointer transition">Outlets & Locations</button></li>
            </ul>
          </div>

          {/* Outlet Locations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#ebdcb9]">Our 2 Ranchi Outlets</h4>
            <div className="text-xs text-[#f4ecd8] space-y-2.5">
              <div>
                <strong className="text-white block">1. Harmu Outlet:</strong>
                <p className="text-[11px] text-[#ebdcb9]/80">Mahalaxmi Plaza, Sahjanand Chowk, Harmu</p>
              </div>
              <div>
                <strong className="text-white block">2. Manatu Outlet:</strong>
                <p className="text-[11px] text-[#ebdcb9]/80">Opp. Hotel La Vista, Manatu Chowk, Ring Road</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#ebdcb9]">Bakery Contact Lines</h4>
            <div className="text-xs text-[#f4ecd8] space-y-2">
              <p className="flex items-center gap-1.5 font-bold text-[#ffd700]">
                <Phone className="w-3.5 h-3.5 text-[#ffd700] shrink-0" />
                <a href="tel:+919939123878" className="hover:underline">+91 99391 23878</a>
                <span className="text-[9px] bg-emerald-700 text-white px-1.5 py-0.2 rounded font-normal">Order/WA</span>
              </p>
              <p className="flex items-center gap-1.5 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>+91 88253 55475</span>
              </p>
              <p className="flex items-center gap-1.5 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>+91 99391 45534</span>
              </p>
              <p className="text-[10px] text-gray-400 font-mono pt-2">
                © {new Date().getFullYear()} Oven Grains Bakery. All rights reserved.
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating back to top trigger */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-[#3d271d] hover:bg-[#c29b38] text-white transition-all shadow-lg hover:shadow-xl cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

    </div>
  );
}
