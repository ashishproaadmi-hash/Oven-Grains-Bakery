import React, { useState, useEffect } from "react";
import { X, Trash2, Shield, Sparkles, MapPin, Truck, Store, Check, MessageSquare, Send, Phone } from "lucide-react";
import { CartItem, Order, Product } from "../types";
import { getLocalRecommendations } from "../data/menuData";

interface CartProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (orderData: Partial<Order>) => Promise<Order | null>;
  onClearCart: () => void;
  onOrderSuccess: (order: Order) => void;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Cart({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onClearCart,
  onOrderSuccess,
  products,
  onAddToCart
}: CartProps) {
  // Form State
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');

  // AI Recommendations
  const [recommendations, setRecommendations] = useState<{ heading: string; recommendedIds: string[] } | null>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // Modal / WhatsApp Submission states
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  useEffect(() => {
    if (cart.length === 0) {
      setRecommendations(null);
      return;
    }

    const recs = getLocalRecommendations(cart);
    setRecommendations(recs);
  }, [cart]);

  if (!isOpen) return null;

  // Calculators
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  };

  const calculateCustomizationSurcharges = () => {
    let extra = 0;
    cart.forEach(item => {
      if (item.customization) {
        // Multipliers based on sizes
        let base = item.product.price;
        let scale = 1.0;
        const size = item.customization.size;
        if (size === "1/2 Pound") scale = 0.65;
        if (size === "1 Pound") scale = 1.0;
        if (size === "2 Pound") scale = 1.8;

        const customizedBase = Math.round(base * scale);
        // Added delta
        extra += (customizedBase - base) * item.quantity;
        
        // Add eggless option (+₹50)
        if (item.customization.eggless) {
          extra += 50 * item.quantity;
        }
        // Add photo upload (+₹200)
        if (item.customization.photoUrl) {
          extra += 200 * item.quantity;
        }
      }
    });
    return extra;
  };

  const deliveryCharge = deliveryType === "delivery" ? 60 : 0;
  const totalAmount = calculateSubtotal() + calculateCustomizationSurcharges() + deliveryCharge;

  // Build structured WhatsApp message text
  const buildWhatsAppMessage = (orderId?: string) => {
    let msg = `🎂 *NEW ORDER - OVEN GRAINS BAKERY* 🎂\n`;
    if (orderId) msg += `Order Reference: #${orderId}\n`;
    msg += `-------------------------------------------\n`;
    msg += `👤 *CUSTOMER DETAILS:*\n`;
    msg += `• Name: ${name || 'Customer'}\n`;
    msg += `• Phone: ${phone}\n`;
    if (whatsapp) msg += `• WhatsApp: ${whatsapp}\n`;
    if (email) msg += `• Email: ${email}\n\n`;

    msg += `🚚 *FULFILLMENT:* ${deliveryType === 'delivery' ? 'Home Delivery' : 'Self-Pickup'}\n`;
    if (deliveryType === 'delivery') {
      msg += `📍 *Delivery Address:* ${address}\n`;
    } else {
      msg += `📍 *Pickup Point:* Sahjanand Chowk, Harmu Road, Ranchi\n`;
    }
    if (orderNotes) {
      msg += `📝 *Notes / Greeting Card:* ${orderNotes}\n`;
    }

    msg += `\n🍰 *ORDERED ITEMS (${cart.length}):*\n`;
    cart.forEach((item, index) => {
      let unitPrice = item.product.price;
      if (item.customization) {
        let scale = 1.0;
        const sz = item.customization.size;
        if (sz === "1/2 Pound") scale = 0.65;
        if (sz === "1 Pound") scale = 1.0;
        if (sz === "2 Pound") scale = 1.8;
        unitPrice = Math.round(unitPrice * scale);
        if (item.customization.eggless) unitPrice += 50;
        if (item.customization.photoUrl) unitPrice += 200;
      }
      const itemTotal = unitPrice * item.quantity;
      msg += `${index + 1}. *${item.product.name}* x ${item.quantity} = ₹${itemTotal}\n`;
      if (item.customization) {
        msg += `   • Size: ${item.customization.size}\n`;
        msg += `   • Flavor: ${item.customization.flavor}\n`;
        msg += `   • Preference: ${item.customization.eggless ? "100% Pure Veg (Eggless)" : "Regular"}\n`;
        if (item.customization.message) {
          msg += `   • Cake Text: "${item.customization.message}"\n`;
        }
        if (item.customization.photoUrl) {
          msg += `   • Photo Print: Yes (+₹200)\n`;
        }
        if (item.customization.specialInstructions) {
          msg += `   • Baking Instructions: ${item.customization.specialInstructions}\n`;
        }
      }
    });

    msg += `\n💳 *Payment Preference:* ${paymentMethod === 'UPI' ? 'UPI' : 'Cash on Delivery (COD)'}\n\n`;
    msg += `💰 *PRICING BREAKDOWN:*\n`;
    msg += `• Items Subtotal: ₹${calculateSubtotal()}\n`;
    msg += `• Customization Charges: ₹${calculateCustomizationSurcharges()}\n`;
    msg += `• Delivery Fee: ₹${deliveryCharge}\n`;
    msg += `• *GRAND TOTAL:* ₹${totalAmount}\n\n`;
    msg += `Please confirm my order and dispatch schedule. Thank you!`;

    return msg;
  };

  // Submit order directly to WhatsApp
  const handleWhatsAppOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    if (deliveryType === 'delivery' && !address) {
      alert("Please enter your delivery address in Ranchi.");
      return;
    }

    setPaymentProcessing(true);

    const orderPayload: Partial<Order> = {
      items: cart,
      customerName: name,
      phone,
      whatsapp: whatsapp || phone,
      email,
      address: deliveryType === "delivery" ? address : "Store Pickup - Sahjanand Chowk, Harmu Road, Ranchi",
      deliveryType,
      totalAmount,
      paymentStatus: "pending",
      paymentId: "WHATSAPP_ORDER",
      paymentMethod,
      orderNotes
    };

    try {
      const order = await onPlaceOrder(orderPayload);
      const orderId = order ? order.id : undefined;
      const textMsg = buildWhatsAppMessage(orderId);
      const waUrl = `https://wa.me/919939123878?text=${encodeURIComponent(textMsg)}`;

      setLastWhatsAppUrl(waUrl);

      // Open WhatsApp directly in new window
      window.open(waUrl, "_blank");

      if (order) {
        setPlacedOrder(order);
        setShowCheckoutModal(true);
        setPaymentProcessing(false);
        onClearCart();
        onOrderSuccess(order);
      } else {
        setPaymentProcessing(false);
      }
    } catch (err) {
      console.error("Order processing error:", err);
      // Fallback: Open WhatsApp anyway so user doesn't lose details
      const textMsg = buildWhatsAppMessage();
      const waUrl = `https://wa.me/919939123878?text=${encodeURIComponent(textMsg)}`;
      setLastWhatsAppUrl(waUrl);
      window.open(waUrl, "_blank");
      setPaymentProcessing(false);
    }
  };

  return (
    <>
      {/* Drawer Overlay backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#3d271d]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#faf8f5] shadow-2xl flex flex-col justify-between h-full border-l border-[#ebdcb9]/40">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 bg-[#3d271d] text-white flex justify-between items-center border-b border-[#ffd700]/20">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#593c2f] rounded-lg text-[#ffd700]">
              🛍️
            </span>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-white">Your Bakery Cart</h2>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ebdcb9]">
                Oven Grains Fresh Baking
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Cart Items List */}
          {cart.length > 0 ? (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400 font-mono">
                Items Selected
              </span>
              
              {cart.map((item) => {
                // Compute total item pricing inclusive of customizations
                let price = item.product.price;
                if (item.customization) {
                  let scale = 1.0;
                  const size = item.customization.size;
                  if (size === "1/2 Pound") scale = 0.65;
                  if (size === "1 Pound") scale = 1.0;
                  if (size === "2 Pound") scale = 1.8;
                  
                  price = Math.round(price * scale);
                  if (item.customization.eggless) price += 50;
                  if (item.customization.photoUrl) price += 200;
                }

                return (
                  <div
                    key={item.id}
                    className="bg-white p-3 rounded-xl border border-gray-100 flex gap-3 shadow-sm"
                  >
                    {/* Img Thumbnail */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-[#faf6ed]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-sm text-[#3d271d] leading-tight pr-4">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Customization Details Block if any */}
                        {item.customization ? (
                          <div className="mt-1 bg-[#faf6ed] p-2 rounded-lg text-[10px] text-[#5c4a40] space-y-0.5 border border-[#ebdcb9]/30">
                            <div className="flex justify-between">
                              <span className="font-semibold">Size:</span>
                              <span className="font-bold">{item.customization.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">Flavor:</span>
                              <span>{item.customization.flavor}</span>
                            </div>
                            {item.customization.message && (
                              <div className="flex justify-between font-serif text-emerald-800 italic">
                                <span>Icing:</span>
                                <span>"{item.customization.message}"</span>
                              </div>
                            )}
                            <div className="flex justify-between font-mono">
                              <span>Spec:</span>
                              <span>{item.customization.eggless ? "Eggless (Veg)" : "Regular"}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[10px] text-gray-400 mt-1">Standard Recipe Bakery Fresh</p>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                        {/* Quantity selector */}
                        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-0.5 bg-gray-50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-xs font-bold text-gray-500 hover:text-gray-900 w-4 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-semibold w-6 text-center text-[#3d271d]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-xs font-bold text-gray-500 hover:text-gray-900 w-4 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif font-black text-xs text-[#3d271d] font-mono">
                          ₹{price * item.quantity}
                        </span>
                      </div>

                    </div>

                  </div>
                );
              })}

              {/* AI-Powered Smart Recommendations Widget */}
              {recommendations && (
                <div className="bg-[#fdfbf7] p-4 rounded-2xl border border-dashed border-[#c29b38]/40 space-y-3 relative overflow-hidden mt-6">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#c29b38]/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-1.5 text-xs text-[#3d271d] font-serif font-bold">
                    <Sparkles className="w-4 h-4 text-[#c29b38]" />
                    <span>{recommendations.heading || "Complete the occasion!"}</span>
                  </div>

                  {loadingRecommendations ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="w-5 h-5 rounded-full border-2 border-[#3d271d] border-t-[#c29b38] animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {recommendations.recommendedIds?.map((recId) => {
                        const recProduct = products.find((p) => p.id === recId);
                        if (!recProduct) return null;

                        return (
                          <div
                            key={recId}
                            className="bg-white p-2.5 rounded-xl border border-gray-100 flex gap-2 items-center justify-between shadow-xs hover:shadow-sm transition"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={recProduct.image}
                                alt={recProduct.name}
                                className="w-10 h-10 object-cover rounded-md"
                                referrerPolicy="no-referrer"
                              />
                              <div className="max-w-[120px]">
                                <span className="text-[10px] font-serif font-bold block truncate leading-tight text-[#3d271d]">
                                  {recProduct.name}
                                </span>
                                <span className="text-[9px] text-[#c29b38] font-mono">
                                  ₹{recProduct.price}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                onAddToCart(recProduct, 1);
                              }}
                              className="p-1 rounded-full bg-[#fdfbf7] hover:bg-[#3d271d] border border-gray-100 hover:border-[#3d271d] text-[#3d271d] hover:text-white transition cursor-pointer flex items-center justify-center"
                              title="Add recommendation to cart"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <span className="text-5xl block">🧁</span>
              <p className="font-serif text-[#3d271d] font-bold text-base">Your cart is currently empty</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our signature fusion cakes, fresh pastries and sourdough artisan breads to place your order!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#3d271d] hover:bg-[#593c2f] text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Start Exploring Menu
              </button>
            </div>
          )}

          {/* Checkout Ordering Details Form */}
          {cart.length > 0 && (
            <form onSubmit={handleWhatsAppOrderSubmit} className="space-y-4 border-t border-[#ebdcb9]/40 pt-6">
              <span className="text-xs uppercase tracking-wider font-bold text-gray-400 font-mono block">
                Order Delivery & Contact Details
              </span>

              {/* Delivery Type selector toggle */}
              <div className="grid grid-cols-2 gap-3 bg-white p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    deliveryType === 'delivery'
                      ? "bg-[#3d271d] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  Delivery (+₹60)
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    deliveryType === 'pickup'
                      ? "bg-[#3d271d] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Store className="w-4 h-4" />
                  Self-Pickup (Free)
                </button>
              </div>

              {/* Form Input Fields */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-100">
                
                {/* Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1" htmlFor="cart-name-input">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    id="cart-name-input"
                    required
                    placeholder="e.g. Rohan Sen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c29b38] focus:border-[#c29b38] bg-gray-50/35"
                  />
                </div>

                {/* Contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1" htmlFor="cart-phone-input">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="cart-phone-input"
                      required
                      placeholder="e.g. +91 98451 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c29b38] focus:border-[#c29b38] bg-gray-50/35"
                    />
                  </div>
                  
                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1" htmlFor="cart-whatsapp-input">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="cart-whatsapp-input"
                        placeholder="Copy phone if same"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full pl-3 pr-16 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c29b38] focus:border-[#c29b38] bg-gray-50/35"
                      />
                      <button
                        type="button"
                        onClick={() => setWhatsapp(phone)}
                        className="absolute right-1 top-1.5 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-[9px] font-bold text-gray-500 cursor-pointer"
                      >
                        Same
                      </button>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1" htmlFor="cart-email-input">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="cart-email-input"
                    required
                    placeholder="e.g. rohan.sen@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c29b38] focus:border-[#c29b38] bg-gray-50/35"
                  />
                </div>

                {/* Delivery Address (only if delivery is toggled) */}
                {deliveryType === 'delivery' && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1" htmlFor="cart-address-input">
                      Ranchi Delivery Address *
                    </label>
                    <textarea
                      id="cart-address-input"
                      required
                      rows={2.5}
                      placeholder="Flat/House No., Street Name, Landmark (e.g. Near Harmu Hospital, Ashok Nagar, Lalpur, Ranchi)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c29b38] focus:border-[#c29b38] bg-gray-50/35"
                    />
                  </div>
                )}

                {/* Order notes */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1" htmlFor="cart-notes-input">
                    Order Notes / Birthday Greeting Tag
                  </label>
                  <input
                    type="text"
                    id="cart-notes-input"
                    placeholder="e.g. Write Happy Anniversary card tag"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c29b38] focus:border-[#c29b38] bg-gray-50/35"
                  />
                </div>

              </div>

              {/* Payment Preference Selector */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-gray-100">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  Payment Preference *
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 transition border cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className="text-lg">📱</span>
                    <span className="text-[11px]">Pay via UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`py-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 transition border cursor-pointer ${
                      paymentMethod === 'COD'
                        ? "bg-amber-50 text-amber-900 border-amber-500 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <span className="text-lg">💵</span>
                    <span className="text-[11px]">Cash on Delivery (COD)</span>
                  </button>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                id="cart-submit-btn"
                disabled={paymentProcessing}
                className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-lg transition duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5"
              >
                <span className="flex items-center gap-2 text-sm sm:text-base font-extrabold">
                  <MessageSquare className="w-5 h-5 text-emerald-200" />
                  Order Now on WhatsApp (+91 99391 23878)
                </span>
                <span className="text-[10px] text-emerald-100 font-normal">
                  Sends address, cakes, customizations & total directly to our WhatsApp
                </span>
              </button>
            </form>
          )}

        </div>

        {/* Drawer Footer summary panel */}
        {cart.length > 0 && (
          <div className="bg-white p-4 sm:p-6 border-t border-gray-100 shadow-xl space-y-3">
            <div className="space-y-1.5 text-xs text-[#5c4a40]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono">₹{calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Gourmet Customization Surcharges:</span>
                <span className="font-mono">+₹{calculateCustomizationSurcharges()}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-gray-100">
                <span>Delivery Charge:</span>
                <span className="font-mono">₹{deliveryCharge}</span>
              </div>
              <div className="flex justify-between pt-1.5 text-sm sm:text-base font-black text-[#3d271d]">
                <span className="font-serif">Grand Total Amount:</span>
                <span className="font-mono text-lg text-[#c29b38]">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-center text-[10px] text-emerald-700 font-medium">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              Direct WhatsApp order dispatch to Oven Grains (+91 99391 23878)
            </div>
          </div>
        )}

      </div>

      {/* WHATSAPP ORDER CONFIRMATION MODAL WINDOW */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-emerald-200 text-[#3d271d] relative animate-scale-up">
            
            {/* Header */}
            <div className="bg-emerald-800 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="bg-emerald-500 text-white p-1.5 rounded-full font-black text-sm flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-100">WhatsApp Order Redirect</h3>
                  <span className="text-[10px] text-white/90 font-mono">Oven Grains Bakery (+91 99391 23878)</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCheckoutModal(false);
                  onClose();
                }}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-6 text-center">
              
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md border border-emerald-200">
                <Check className="w-9 h-9 font-black" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-xl text-emerald-900">
                  Order Transmitted to WhatsApp!
                </h4>
                <p className="text-xs text-[#5c4a40] max-w-xs mx-auto mt-2 leading-relaxed">
                  We have constructed your complete order summary (cakes, address & instructions) and opened WhatsApp chat with <strong>+91 99391 23878</strong>.
                </p>
              </div>

              {placedOrder && (
                <div className="bg-[#faf6ed] p-3.5 rounded-xl border border-[#ebdcb9]/60 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#846338] block font-bold">
                    Order Reference ID
                  </span>
                  <span className="font-mono text-base font-black text-[#3d271d] block mt-0.5">
                    {placedOrder.id}
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-1">
                    Total Amount: <strong>₹{placedOrder.totalAmount}</strong> ({placedOrder.paymentMethod})
                  </span>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    if (lastWhatsAppUrl) {
                      window.open(lastWhatsAppUrl, "_blank");
                    } else {
                      window.open("https://wa.me/919939123878", "_blank");
                    }
                  }}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  Open WhatsApp Chat Again (+91 99391 23878)
                </button>

                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>WhatsApp Hotline: +91 99391 23878</span>
              <span>Sahjanand Chowk, Ranchi</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
