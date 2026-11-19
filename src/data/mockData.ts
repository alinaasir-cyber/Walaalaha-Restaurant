export interface MenuItem {
  id: string;
  name: string;
  nameSomali: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
}

export interface TableItem {
  id: string;
  number: string;
  section: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
}

export const initialMenuItems: MenuItem[] = [
  {
    id: "item-1",
    name: "Somali Rice with Camel Meat",
    nameSomali: "Bariis & Hilib Geel",
    category: "Main Dishes",
    price: 8.5,
    image: "🍛",
    available: true,
  },
  {
    id: "item-2",
    name: "Spaghetti with Goat Meat",
    nameSomali: "Baasto & Hilib Ari",
    category: "Main Dishes",
    price: 7.0,
    image: "🍝",
    available: true,
  },
  {
    id: "item-3",
    name: "Chicken Steak with Fries",
    nameSomali: "Digaag & Baradho",
    category: "Main Dishes",
    price: 6.5,
    image: "🍗",
    available: true,
  },
  {
    id: "item-4",
    name: "Traditional Anjero (3 pcs) & Liver",
    nameSomali: "Canjeero & Beer",
    category: "Breakfast",
    price: 4.5,
    image: "🥞",
    available: true,
  },
  {
    id: "item-5",
    name: "Suqaar with Chapati",
    nameSomali: "Suqaar & Sabaayad",
    category: "Breakfast",
    price: 5.0,
    image: "🥘",
    available: true,
  },
  {
    id: "item-6",
    name: "Fresh Mango Juice",
    nameSomali: "Casiir Cambe Dabiici",
    category: "Drinks",
    price: 2.0,
    image: "🥭",
    available: true,
  },
  {
    id: "item-7",
    name: "Watermelon Juice",
    nameSomali: "Casiir Qare",
    category: "Drinks",
    price: 1.5,
    image: "🍉",
    available: true,
  },
  {
    id: "item-8",
    name: "Somali Spiced Spiced Tea",
    nameSomali: "Shaah Caleen & Hayl",
    category: "Hot Drinks",
    price: 1.0,
    image: "☕",
    available: true,
  },
  {
    id: "item-9",
    name: "Sambusa Beef (3 pcs)",
    nameSomali: "Sambuusi Hilib (3 xabbo)",
    category: "Snacks",
    price: 1.5,
    image: "🥟",
    available: true,
  },
  {
    id: "item-10",
    name: "Fish Fillet with White Rice",
    nameSomali: "Kalluun & Bariis Cad",
    category: "Main Dishes",
    price: 9.0,
    image: "🐟",
    available: true,
  },
];

export const initialTables: TableItem[] = [
  { id: "tbl-1", number: "Table 01", section: "Main Hall", capacity: 4, status: "available" },
  { id: "tbl-2", number: "Table 02", section: "Main Hall", capacity: 4, status: "occupied" },
  { id: "tbl-3", number: "Table 03", section: "Family Room", capacity: 6, status: "available" },
  { id: "tbl-4", number: "Table 04", section: "Terrace", capacity: 2, status: "reserved" },
  { id: "tbl-5", number: "VIP Table", section: "VIP Lounge", capacity: 8, status: "available" },
];

export const initialWaiters = [
  { id: "w-1", name: "Ahmed Nur", code: "W-101" },
  { id: "w-2", name: "Hassan Ali", code: "W-102" },
  { id: "w-3", name: "Fartun Mohamed", code: "W-103" },
];
