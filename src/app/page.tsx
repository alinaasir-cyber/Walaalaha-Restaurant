"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChefHat,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  PartyPopper,
  Star,
  Users,
  CheckCircle2,
  UtensilsCrossed,
  Coffee,
  Globe,
  ChevronRight,
  Heart,
} from "lucide-react";

export default function HomePage() {
  const [selectedBranchCity, setSelectedBranchCity] = useState<"Mogadishu" | "Hargeisa" | "Garowe">("Mogadishu");

  // Signature Dishes Inspired by Somali Cuisine and Modern Presentation
  const signatureDishes = [
    {
      id: "SIG-1",
      name: "Bariis Iskukaris & Hilib Ari",
      nameEnglish: "Signature Spiced Rice with Slow-Roasted Goat",
      category: "Main Course",
      price: "$8.50",
      description:
        "Fragrant Somali basmati rice simmered in rich spices (xawaash, cardamom, cloves), served with tender fall-off-the-bone slow-roasted goat meat, caramelized onions, and a fresh banana.",
      image: "🍛",
      popular: true,
      tag: "Chef's Recommendation",
    },
    {
      id: "SIG-2",
      name: "Baasto Salbuko & Kalluun Doolshood",
      nameEnglish: "Traditional Pasta with Fresh Somali Ocean Catch",
      category: "Seafood & Pasta",
      price: "$7.00",
      description:
        "Authentic Somali-Italian heritage pasta tossed in a rich garlic-tomato sauce, paired with freshly caught ocean kingfish pan-seared with coriander and cumin.",
      image: "🍝",
      popular: true,
      tag: "Best Seller",
    },
    {
      id: "SIG-3",
      name: "Suqaar Digaag & Chapati / Canjeero",
      nameEnglish: "Tender Diced Chicken Suqaar with Golden Flatbread",
      category: "Breakfast & Dinner",
      price: "$5.50",
      description:
        "Tender diced chicken breast stir-fried with bell peppers, red onions, garlic, and light Somali spices, served with fresh homemade layered chapati.",
      image: "🥘",
      popular: false,
      tag: "Daily Favorite",
    },
    {
      id: "SIG-4",
      name: "Shaah Cadays & Xawaash Gaar ah",
      nameEnglish: "Spiced Somali Royal Milk Tea",
      category: "Artisanal Beverages",
      price: "$1.50",
      description:
        "Slow-brewed black tea infused with cardamom, ginger, cinnamon, and cloves, blended with creamy milk for an authentic aromatic taste.",
      image: "☕",
      popular: true,
      tag: "Signature Blend",
    },
    {
      id: "SIG-5",
      name: "Lotus & Caramel Tres Leches",
      nameEnglish: "Sponge Cake Soaked in Rich Milk & Lotus Cream",
      category: "Artisan Pastry",
      price: "$4.00",
      description:
        "Light sponge cake soaked in three decadent milks, topped with whipped chantilly cream and a generous drizzle of warm Lotus Biscoff caramel.",
      image: "🍰",
      popular: true,
      tag: "Dessert Special",
    },
    {
      id: "SIG-6",
      name: "Qaxwo Somali & Xalwo Macaan",
      nameEnglish: "Traditional Spiced Coffee with Somali Halwa",
      category: "Heritage Experience",
      price: "$3.00",
      description:
        "Wood-roasted coffee beans brewed with ginger and cardamom, accompanied by freshly made golden Somali halwa with cashew nuts.",
      image: "🫖",
      popular: false,
      tag: "Heritage",
    },
  ];

  // Branches Across Cities
  const branches = {
    Mogadishu: [
      {
        name: "Taleex Flagship",
        area: "Wadada Wadnaha, Hodan",
        type: "Full Dine-in, VIP Banquets, Drive-thru",
        hours: "6:00 AM – 11:30 PM",
        phone: "+252 61 5000001",
        badge: "Flagship",
      },
      {
        name: "KM4 Maka Al-Mukarama",
        area: "KM4 Junction, Hodan/Waberi",
        type: "Executive Dining & Outdoor Terrace",
        hours: "6:30 AM – 11:00 PM",
        phone: "+252 61 5000002",
        badge: "Business Hub",
      },
      {
        name: "Banaadir Mall",
        area: "KM5, Banaadir Road",
        type: "Family Restaurant & Express Ordering",
        hours: "7:00 AM – 11:00 PM",
        phone: "+252 61 5000003",
        badge: "Shopping Hub",
      },
      {
        name: "Xamar Weyne Waterfront",
        area: "Historic District, Old Port",
        type: "Fresh Coastal Seafood & Sunset View",
        hours: "11:00 AM – 11:30 PM",
        phone: "+252 61 5000004",
        badge: "Ocean View",
      },
    ],
    Hargeisa: [
      {
        name: "Jigjiga Yar Premier",
        area: "Wadada Madaxtooyada, Jigjiga Yar",
        type: "Full Dining, Garden Terrace & Wedding Hall",
        hours: "6:30 AM – 11:00 PM",
        phone: "+252 63 4000001",
        badge: "Main Branch",
      },
      {
        name: "Wadaadiid Mall",
        area: "Hargeisa City Center",
        type: "Café, Quick Bites & Meeting Rooms",
        hours: "7:00 AM – 10:30 PM",
        phone: "+252 63 4000002",
        badge: "Café & Bakery",
      },
    ],
    Garowe: [
      {
        name: "Tamam Park Garden",
        area: "Wadada Garowe-Bosaso, Central",
        type: "Outdoor Family Park, Dine-in & VIP Suites",
        hours: "6:30 AM – 11:00 PM",
        phone: "+252 90 7000001",
        badge: "Garden Resort",
      },
    ],
  };

  // Event & Wedding Halls
  const halls = [
    {
      name: "Hoolka Al-Baraka (Grand Ballroom)",
      capacity: "500 - 800 Qof",
      purpose: "Aroosyada Waawayn, Xafladaha Qalin-jabinta, iyo Shirarka Heerka Qaran",
      features: ["VIP Stage & Stage Lighting", "Sound System & Live Broadcast", "Dedicated Catering Staff", "Private Bridal Suite"],
      price: "$1,200 / Xaflad",
      badge: "Most Popular",
    },
    {
      name: "Hoolka Al-Najax (Executive Conference)",
      capacity: "150 - 300 Qof",
      purpose: "Shirarka Shirkadaha, Tababarada Hay'adaha, iyo Kulannada Ganacsiga",
      features: ["High-speed Wi-Fi & Projectors", "Executive Seating & Sound", "Coffee Break & Lunch Buffet", "Podium & Microphones"],
      price: "$600 / Maalin",
      badge: "Corporate",
    },
    {
      name: "VIP Banquet Lounge",
      capacity: "40 - 80 Qof",
      purpose: "Qado-sharafeedka Gaarka ah, Dhalashada, iyo Shirarka Golaha Sare",
      features: ["Private Waiter Service", "Tailored Custom Menu", "Luxury Tableware", "Privacy & Security"],
      price: "$350 / Kulankii",
      badge: "VIP Exclusive",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* 1. Top Announcement Header */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kusoo Dhawoow Makhaayadda Walaalaha</span>
            </span>
            <span className="hidden md:inline text-slate-600">&bull;</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Furan Maalin Kasta: 6:00 AM – 11:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+252615000000"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-rose-400" />
              <span>Dalabka Tooska ah: +252 61 5000000</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/login"
              className="flex items-center gap-1 text-slate-400 hover:text-rose-400 font-bold transition-colors"
            >
              <Users className="w-3 h-3" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Public Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 group-hover:scale-105 transition-transform">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-slate-900 tracking-tight">Walaalaha</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                  Restaurant
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
                Authentic Somali Cuisine & Modern Hospitality
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-700">
            <a href="#about" className="hover:text-rose-500 transition-colors">
              Sheekadeena (About)
            </a>
            <a href="#menu" className="hover:text-rose-500 transition-colors">
              Cuntooyinka (Menu)
            </a>
            <a href="#pickup" className="hover:text-rose-500 transition-colors">
              Gaarsiinta (Delivery)
            </a>
            <a href="#branches" className="hover:text-rose-500 transition-colors">
              Laamaha (Locations)
            </a>
            <a href="#halls" className="hover:text-rose-500 transition-colors">
              Hoolalka & Aroosyada (Halls)
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all"
            >
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Galitaanka Shaqaalaha</span>
            </Link>

            <Link
              href="/order"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md shadow-rose-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Dalbo Cuntada (Order Now)</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Premium Modern Style) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/40 via-white to-slate-50 py-20 lg:py-28">
        {/* Subtle Background Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/70 border border-rose-200 text-rose-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dhadhanka Asalka Ah Ee Cuntada Soomaaliyeed</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
                Somalia’s Premier <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">
                  Culinary & Event
                </span>{" "}
                Experience.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-medium leading-relaxed">
                Laga bilaabo Bariiska carfaya ee Xawaashka iyo Hilibka Ariga jilicsan, ilaa Baasto Salbukada xeebta iyo Qaxwada casriga ah.
                Walaalaha Restaurant waxay kuu haysaa cunto tayo sare leh, hoolal qaali ah oo loogu talagalay aroosyada iyo shirarka, iyo gaarsiin degdeg ah.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/order"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-2xl shadow-xl shadow-rose-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Dalbo Hadda (Pickup & Delivery)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#halls"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-sm transition-all"
                >
                  <PartyPopper className="w-4 h-4 text-purple-600" />
                  <span>Kireyso Hool (Book a Hall)</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-black text-slate-900">4.9 ★</div>
                  <div className="text-xs text-slate-500 font-medium">15,000+ Macmiil</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">30 Daqiiqo</div>
                  <div className="text-xs text-slate-500 font-medium">Celceliska Gaarsiinta</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">100% Halal</div>
                  <div className="text-xs text-slate-500 font-medium">Cunto Cusub & Nadiif ah</div>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-2xl">
                  Bisha Cuntadeeda
                </div>

                <div className="h-56 bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl flex flex-col items-center justify-center text-7xl select-none mb-6 relative">
                  <span>🍛</span>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-slate-700 border border-slate-100 flex items-center gap-1.5 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>#1 Customer Favorite</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">Bariis Iskukaris & Hilib Ari</h3>
                      <p className="text-xs text-rose-500 font-bold">Traditional Fragrant Rice with Roasted Goat</p>
                    </div>
                    <span className="text-xl font-black text-slate-900">$8.50</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Waxaa lagu kariyay xawaashka carfaya ee Soomaaliga, basasha la shiilay, sabiib, iyo moos cusub.
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-600 font-semibold">
                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Xawaash Asal ah</span>
                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Moos Biyo La'aan</span>
                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Maraq Kulul</span>
                  </div>

                  <Link
                    href="/order"
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/25 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ku Dalbo 1-Click (Order Now)</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
              Dhadhan Aad Ka Helayso
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Cuntooyinka Ugu Caansan Ee Walaalaha
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              Wax kasta waxaa lagu diyaariyaa maaddooyin cusub oo maxalli ah iyo khibrad cunto karineed oo dhab ah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 hover:shadow-xl hover:border-rose-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-rose-50 group-hover:bg-rose-500 group-hover:text-white transition-colors flex items-center justify-center text-3xl shadow-sm">
                      {dish.image}
                    </div>
                    <span className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-[10px] font-black uppercase">
                      {dish.tag}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {dish.name}
                    </h3>
                    <span className="text-base font-black text-slate-900">{dish.price}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold mb-2">{dish.nameEnglish}</p>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">{dish.category}</span>
                  <Link
                    href="/order"
                    className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600"
                  >
                    <span>Dalbo Hadda</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-lg transition-all"
            >
              <span>Fiiri Menu-ga Oo Dhan & Dalbo (View Full Menu)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "Skip the Line" Fast Pickup & Delivery Promo (Inspired by Beydan) */}
      <section id="pickup" className="py-16 bg-gradient-to-r from-rose-500 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                <Truck className="w-4 h-4" />
                <span>Gaarsiin Degdeg Ah & Pickup</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Ha Sugin Safafka. Dalbo Online, Bixi EVC Plus, <br className="hidden sm:inline" />
                Oo Cuntadaada Isla Markiiba Qaado!
              </h2>
              <p className="text-sm text-rose-100 max-w-2xl font-medium leading-relaxed">
                App-ka Walaalaha wuxuu kuu sahlayaa inaad cuntada ka dalbato xafiiskaaga ama gurigaaga.
                Dooro inaad qaadato adigoon saf gelin (Pickup) ama in gaari laguugu keeno 30 daqiiqo gudahood (Delivery).
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/order"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-rose-600 hover:bg-rose-50 font-black text-sm rounded-2xl shadow-xl transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Fur Customer App-ka Hadda</span>
              </Link>
              <div className="text-center text-xs text-rose-100 font-semibold">
                Lacag-bixin ammaan ah oo EVC Plus, Zaad & Sahal ah
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Branches / Locations Section */}
      <section id="branches" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                Meel Kasta Waan Kugu Dhow Nahay
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                Laamaha Makhaayadda Walaalaha
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Ka hel adeeg heer sare ah magaalooyinka ugu waaweyn Soomaaliya.
              </p>
            </div>

            {/* City Selector Tabs */}
            <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-sm">
              {(["Mogadishu", "Hargeisa", "Garowe"] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedBranchCity(city)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedBranchCity === city
                      ? "bg-rose-500 text-white shadow-sm shadow-rose-500/25"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches[selectedBranchCity].map((branch) => (
              <div
                key={branch.name}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold">
                      {branch.badge}
                    </span>
                    <MapPin className="w-4 h-4 text-rose-500" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{branch.name}</h3>
                  <p className="text-xs text-rose-500 font-medium mt-0.5">{branch.area}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">{branch.type}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{branch.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{branch.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Event & Wedding Halls Showcase */}
      <section id="halls" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Munaasabadaha & Shirarka
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Hoolalka Casriga Ah Ee Walaalaha
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              Hoolal loogu talagalay Aroosyada, Shirarka Ganacsiga, Dabaaldegyada, iyo Qado-sharafeedka VIP-da.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {halls.map((hall) => (
              <div
                key={hall.name}
                className="bg-slate-50/70 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black rounded-lg">
                      {hall.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{hall.capacity}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">{hall.name}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">{hall.purpose}</p>

                  <div className="mt-5 space-y-2">
                    {hall.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Qiimaha Bilowga</span>
                    <div className="text-base font-black text-slate-900">{hall.price}</div>
                  </div>

                  <Link
                    href="/order"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Kireyso Hadda
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Public Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                  <ChefHat className="w-6 h-6" />
                </div>
                <span className="text-xl font-black text-white tracking-tight">Walaalaha Restaurant</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
                Makhaayadda Walaalaha waa hoyga cuntada asalka ah ee Soomaaliyeed, qaxwada casriga ah, iyo hoolalka munaasabadaha heerka caalami.
              </p>
              <div className="text-xs text-slate-500 font-semibold">
                &copy; {new Date().getFullYear()} Walaalaha Restaurant Ltd. All rights reserved.
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Degdeg U Fur</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#about" className="hover:text-white transition-colors">Sheekadeena</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Cuntooyinka</a></li>
                <li><a href="#branches" className="hover:text-white transition-colors">Laamaha</a></li>
                <li><a href="#halls" className="hover:text-white transition-colors">Hoolalka Aroosyada</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Adeegyada</h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><Link href="/order" className="hover:text-white transition-colors">Dalabka Online-ka</Link></li>
                <li><Link href="/order" className="hover:text-white transition-colors">Gaarsiinta (Delivery)</Link></li>
                <li><Link href="/order" className="hover:text-white transition-colors">Kireysiga Hoolka</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Barta Shaqaalaha</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Nala Soo Xiriir</h4>
              <ul className="space-y-2 text-xs font-medium text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-rose-400" />
                  <span>+252 61 5000000</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Taleex, Wadnaha, Muqdisho</span>
                </li>
                <li className="pt-2">
                  <Link
                    href="/login"
                    className="inline-block px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-rose-500 rounded-lg text-white font-bold text-[11px] transition-all"
                  >
                    🔐 Staff & POS Login &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
