import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding NeonDB for Walaalaha Restaurant...");

  // 1. Create Default Branch
  const branch = await prisma.branch.upsert({
    where: { code: "MAIN-01" },
    update: {},
    create: {
      code: "MAIN-01",
      name: "Walaalaha Main Branch",
      phone: "+252 61 500 0000",
      address: "Maka Al Mukarama Road, Mogadishu",
    },
  });
  console.log("Created Branch:", branch.name);

  // 2. Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const adminHash = await bcrypt.hash("AdminPassword123!", salt);
  const cashierHash = await bcrypt.hash("CashierPass123!", salt);
  const waiterHash = await bcrypt.hash("WaiterPass123!", salt);
  const accountantHash = await bcrypt.hash("AccountantPass123!", salt);

  // 3. Create Users with RBAC
  const admin = await prisma.user.upsert({
    where: { email: "admin@walaalaha.so" },
    update: { passwordHash: adminHash },
    create: {
      email: "admin@walaalaha.so",
      name: "Super Admin",
      phone: "+252 61 511 1111",
      passwordHash: adminHash,
      role: "SUPER_ADMIN",
      branchId: branch.id,
    },
  });

  const cashier = await prisma.user.upsert({
    where: { email: "cashier@walaalaha.so" },
    update: { passwordHash: cashierHash },
    create: {
      email: "cashier@walaalaha.so",
      name: "Farah Mohamed (Cashier)",
      phone: "+252 61 522 2222",
      passwordHash: cashierHash,
      role: "CASHIER",
      branchId: branch.id,
    },
  });

  const waiter = await prisma.user.upsert({
    where: { email: "waiter@walaalaha.so" },
    update: { passwordHash: waiterHash },
    create: {
      email: "waiter@walaalaha.so",
      name: "Ahmed Nur (Waiter)",
      phone: "+252 61 533 3333",
      passwordHash: waiterHash,
      role: "WAITER",
      branchId: branch.id,
    },
  });

  const accountant = await prisma.user.upsert({
    where: { email: "accountant@walaalaha.so" },
    update: { passwordHash: accountantHash },
    create: {
      email: "accountant@walaalaha.so",
      name: "Khadar Ali (Accountant)",
      phone: "+252 61 544 4444",
      passwordHash: accountantHash,
      role: "ACCOUNTANT",
      branchId: branch.id,
    },
  });

  console.log("Created Users:", [admin.email, cashier.email, waiter.email, accountant.email]);

  // 4. Create Menu Categories
  const catMain = await prisma.category.upsert({
    where: { code: "CAT-MAIN" },
    update: {},
    create: { code: "CAT-MAIN", name: "Main Dishes", nameSomali: "Cuntooyinka Waaweyn" },
  });

  const catBrk = await prisma.category.upsert({
    where: { code: "CAT-BRK" },
    update: {},
    create: { code: "CAT-BRK", name: "Breakfast", nameSomali: "Quraac" },
  });

  const catDrk = await prisma.category.upsert({
    where: { code: "CAT-DRK" },
    update: {},
    create: { code: "CAT-DRK", name: "Fresh Drinks", nameSomali: "Casiirada Dabiiciga ah" },
  });

  const catHot = await prisma.category.upsert({
    where: { code: "CAT-HOT" },
    update: {},
    create: { code: "CAT-HOT", name: "Hot Drinks", nameSomali: "Cabitaanka Kulul" },
  });

  // 5. Create Menu Items
  const menuItems = [
    { code: "M-01", name: "Somali Rice with Camel Meat", nameSomali: "Bariis & Hilib Geel", price: 8.50, categoryId: catMain.id, image: "🍛" },
    { code: "M-02", name: "Spaghetti with Goat Meat", nameSomali: "Baasto & Hilib Ari", price: 7.00, categoryId: catMain.id, image: "🍝" },
    { code: "M-03", name: "Chicken Steak with Fries", nameSomali: "Digaag & Baradho", price: 6.50, categoryId: catMain.id, image: "🍗" },
    { code: "M-04", name: "Anjero (3 pcs) & Liver", nameSomali: "Canjeero & Beer", price: 4.50, categoryId: catBrk.id, image: "🥞" },
    { code: "M-05", name: "Suqaar with Chapati", nameSomali: "Suqaar & Sabaayad", price: 5.00, categoryId: catBrk.id, image: "🥘" },
    { code: "M-06", name: "Fresh Mango Juice", nameSomali: "Casiir Cambe Dabiici", price: 2.00, categoryId: catDrk.id, image: "🥭" },
    { code: "M-07", name: "Somali Spiced Tea", nameSomali: "Shaah Caleen & Hayl", price: 1.00, categoryId: catHot.id, image: "☕" },
    { code: "M-08", name: "Sambusa Beef (3 pcs)", nameSomali: "Sambuusi Hilib (3 xabbo)", price: 1.50, categoryId: catMain.id, image: "🥟" },
  ];

  for (const m of menuItems) {
    await prisma.menuItem.upsert({
      where: { code: m.code },
      update: { price: m.price },
      create: m,
    });
  }
  console.log("Seeded Menu Items successfully.");

  // 6. Create Tables
  const tables = [
    { number: "Table 01", section: "Main Hall", capacity: 4 },
    { number: "Table 02", section: "Main Hall", capacity: 4 },
    { number: "Table 03", section: "Family Area", capacity: 6 },
    { number: "Table 04", section: "Terrace", capacity: 2 },
    { number: "VIP Room 1", section: "VIP Lounge", capacity: 8 },
  ];

  for (const t of tables) {
    await prisma.restaurantTable.upsert({
      where: { number: t.number },
      update: {},
      create: t,
    });
  }
  console.log("Seeded Tables successfully.");

  // 7. Create Chart of Accounts
  const accounts = [
    { code: "1010", name: "Cash on Hand - Till", type: "ASSET" },
    { code: "1020", name: "Premier Bank Account", type: "ASSET" },
    { code: "1030", name: "EVC Plus Merchant Wallet", type: "ASSET" },
    { code: "2010", name: "Accounts Payable - Vendors", type: "LIABILITY" },
    { code: "4010", name: "Food & Beverage Sales", type: "REVENUE" },
    { code: "5010", name: "Food Cost of Goods Sold", type: "EXPENSE" },
  ];

  for (const a of accounts) {
    await prisma.account.upsert({
      where: { code: a.code },
      update: {},
      create: a,
    });
  }
  console.log("Seeded Chart of Accounts successfully.");

  // 8. Create Initial Audit Log entry
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      userEmail: admin.email,
      userRole: "SUPER_ADMIN",
      action: "DATABASE_INITIALIZED",
      entityType: "SYSTEM",
      details: JSON.stringify({ message: "NeonDB successfully initialized with seed data" }),
    },
  });

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
