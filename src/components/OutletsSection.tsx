import React, { useState } from "react";
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle2, Store } from "lucide-react";

import harmuFrontImg from "../assets/images/harmu_outlet_front_1786423522014.jpg";
import harmuInteriorImg from "../assets/images/harmu_outlet_interior_1786423536991.jpg";
import manatuFrontImg from "../assets/images/manatu_outlet_front_1786423551718.jpg";
import manatuInteriorImg from "../assets/images/manatu_outlet_interior_1786423570015.jpg";

export interface OutletInfo {
  id: string;
  name: string;
  tagline?: string;
  address: string;
  landmark: string;
  mapUrl: string;
  embedMapUrl: string;
  photos: { url: string; title: string }[];
  primaryPhone: string;
  displayPhones: string[];
  hours: string;
}

export const OUTLETS_DATA: OutletInfo[] = [
  {
    id: "harmu",
    name: "Mahalaxmi Plaza Outlet (Harmu)",
    tagline: "Sahjanand Chowk Flagship",
    address: "Shop No. G-6 & 7, Mahalaxmi Plaza, Sahjanand Chowk, Harmu Road, Ranchi, Jharkhand 834002",
    landmark: "Sahjanand Chowk, Harmu",
    mapUrl: "https://maps.google.com/?q=Oven+Grains+Bakery+Maa+Laxmi+Plaza+Harmu+Road+Ranchi",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.3789419137156!2d85.30397577583765!3d23.361026003233856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35003666b6c00001%3A0xe5ebef7041ca70ab!2sMaa%20Laxmi%20Plaza%2C%20Sahjanand%20Chowk%2C%20Harmu%20Rd%2C%20Ranchi%2C%20Jharkhand%20834002!5e0!3m2!1sen!2sin!4v1688000000000!5m2!1sen!2sin",
    photos: [
      { url: harmuFrontImg, title: "Harmu Storefront Night View" },
      { url: harmuInteriorImg, title: "Cake Display & Interior" }
    ],
    primaryPhone: "9939123878",
    displayPhones: ["8825355475", "9939145534"],
    hours: "9:00 AM - 10:30 PM (Daily Open)"
  },
  {
    id: "manatu",
    name: "Ring Road Outlet (Manatu)",
    tagline: "Opp. Hotel La Vista",
    address: "Opp. Hotel La Vista, Manatu Chowk, Ring Road, Ranchi, Jharkhand 834006",
    landmark: "Opp. Hotel La Vista, Manatu Chowk",
    mapUrl: "https://maps.google.com/?q=Hotel+La+Vista+Manatu+Chowk+Ring+Road+Ranchi",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.123456789!2d85.334567!3d23.412345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDI0JNDQuNCJOIDg1wrAyMCcwNC40IkU!5e0!3m2!1sen!2sin!4v1688000000000!5m2!1sen!2sin",
    photos: [
      { url: manatuFrontImg, title: "Manatu Storefront & Wall Sign" },
      { url: manatuInteriorImg, title: "Pastry Counter & Cake Display" }
    ],
    primaryPhone: "9939123878",
    displayPhones: ["8825355475", "9939145534"],
    hours: "9:30 AM - 10:00 PM (Daily Open)"
  }
];

export default function OutletsSection() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<{ [key: string]: number }>({
    harmu: 0,
    manatu: 0
  });

  return (
    <section id="outlets" className="py-16 md:py-24 bg-[#FAF7F2] relative border-y border-[#ebdcb9]/40">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3d271d] text-[#ebdcb9] text-xs font-mono font-bold tracking-widest uppercase mb-3 shadow-sm">
            <Store className="w-3.5 h-3.5 text-[#d4af37]" />
            OUR BAKERY OUTLETS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3d271d] tracking-tight">
            Visit Our Bakery Outlets Across Ranchi
          </h2>
          <p className="text-[#5c4a40] text-sm mt-3 leading-relaxed">
            Step into Oven Grains for hot fresh coffee, delicate french pastries, or order your bespoke celebration cake in person at any of our two prime Ranchi locations.
          </p>
        </div>

        {/* Two Separate Outlet Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {OUTLETS_DATA.map((outlet) => {
            const currentImgIdx = activePhotoIndex[outlet.id] || 0;
            const currentPhoto = outlet.photos[currentImgIdx];

            return (
              <div
                key={outlet.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#ebdcb9]/60 shadow-xl flex flex-col justify-between transition-all hover:shadow-2xl"
              >
                {/* Image Gallery Header */}
                <div className="relative aspect-[16/10] bg-[#120a07] overflow-hidden group">
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Outlet Tagline Badge */}
                  <div className="absolute top-4 left-4 bg-[#3d271d]/90 backdrop-blur-md text-[#ffd700] text-xs font-bold font-mono px-3 py-1 rounded-full border border-[#ffd700]/30 shadow-md">
                    📍 {outlet.tagline}
                  </div>

                  {/* Photo Switcher Thumbnails */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-white text-xs font-medium backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-lg">
                      {currentPhoto.title}
                    </span>
                    <div className="flex gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-xl">
                      {outlet.photos.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIndex({ ...activePhotoIndex, [outlet.id]: idx })}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            currentImgIdx === idx ? "bg-[#ffd700] w-6" : "bg-white/60 hover:bg-white"
                          }`}
                          title={p.title}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outlet Details Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#3d271d] flex items-center gap-2">
                      {outlet.name}
                    </h3>

                    {/* Full Address */}
                    <div className="flex items-start gap-3 text-sm text-[#5c4a40] leading-relaxed bg-[#fdfbf7] p-3.5 rounded-2xl border border-[#ebdcb9]/40">
                      <MapPin className="w-5 h-5 text-[#c29b38] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[#3d271d]">Address & Landmark:</strong>
                        <span>{outlet.address}</span>
                      </div>
                    </div>

                    {/* Operational Hours */}
                    <div className="flex items-center gap-3 text-xs text-[#5c4a40] bg-[#fdfbf7] p-3.5 rounded-2xl border border-[#ebdcb9]/40">
                      <Clock className="w-4 h-4 text-[#c29b38] shrink-0" />
                      <div>
                        <strong className="block text-[#3d271d]">Timings:</strong>
                        <span>{outlet.hours}</span>
                      </div>
                    </div>

                    {/* Contact Numbers Display Block */}
                    <div className="bg-[#FAF6ED] p-4 rounded-2xl border border-[#ebdcb9] space-y-2">
                      <span className="text-[11px] font-mono uppercase font-bold text-[#9d7e5d] block tracking-wider">
                        Bakery Contact Numbers
                      </span>
                      
                      {/* Primary Order Number */}
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="flex items-center gap-1.5 font-bold text-[#3d271d]">
                          <Phone className="w-3.5 h-3.5 text-[#c29b38]" />
                          +91 99391 23878
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Order / WhatsApp
                        </span>
                      </div>

                      {/* Display Numbers */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#ebdcb9]/50 text-xs text-gray-600">
                        <div className="flex items-center gap-1 font-mono">
                          <span className="text-gray-400">Alt 1:</span>
                          <strong>+91 88253 55475</strong>
                        </div>
                        <div className="flex items-center gap-1 font-mono">
                          <span className="text-gray-400">Alt 2:</span>
                          <strong>+91 99391 45534</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Primary WhatsApp Order CTA */}
                    <a
                      href={`https://wa.me/919939123878?text=Hello%20Oven%20Grains%20${encodeURIComponent(outlet.name)}%2C%20I'd%20like%20to%20order%20a%20cake!`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Order on WhatsApp</span>
                    </a>

                    {/* Directions Link */}
                    <a
                      href={outlet.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 px-4 bg-[#3d271d] hover:bg-[#593c2f] text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <Navigation className="w-4 h-4 text-[#ffd700]" />
                      <span>Get Directions</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
