export interface SubpageConfig {
  slug: string;
  title: string;
  titleSomali: string;
  category: string;
  description: string;
  kpis: { label: string; value: string; subtext: string; color: string }[];
  columns: { key: string; label: string; type?: "badge" | "currency" | "text" | "date" }[];
  rows: Record<string, any>[];
  formFields: { name: string; label: string; type: "text" | "number" | "select" | "date"; options?: string[] }[];
}

export const subpagesData: Record<string, SubpageConfig> = {
  // === POS MANAGEMENT ===
  "categories": {
    slug: "categories",
    title: "Menu Categories",
    titleSomali: "Qaybaha Cuntada & Cabitaanka",
    category: "POS Management",
    description: "Manage menu groupings such as Breakfast, Main Dishes, Drinks, and Snacks.",
    kpis: [
      { label: "Total Categories", value: "8", subtext: "All active", color: "blue" },
      { label: "Total Items Linked", value: "64 Items", subtext: "Across all branches", color: "emerald" },
      { label: "Top Selling Category", value: "Main Dishes", subtext: "62% of revenue", color: "amber" },
      { label: "Printer Route", value: "Kitchen 1 & Bar", subtext: "Configured", color: "purple" },
    ],
    columns: [
      { key: "code", label: "Category Code" },
      { key: "name", label: "Category Name" },
      { key: "somaliName", label: "Magaca Soomaaliga" },
      { key: "itemsCount", label: "Items Count" },
      { key: "printer", label: "Kitchen Station" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", code: "CAT-01", name: "Main Dishes", somaliName: "Cuntooyinka Waaweyn", itemsCount: "18 items", printer: "Main Kitchen", status: "Active" },
      { id: "2", code: "CAT-02", name: "Breakfast", somaliName: "Quraac", itemsCount: "12 items", printer: "Main Kitchen", status: "Active" },
      { id: "3", code: "CAT-03", name: "Drinks & Fresh Juices", somaliName: "Casiirada Dabiiciga ah", itemsCount: "15 items", printer: "Juice Bar", status: "Active" },
      { id: "4", code: "CAT-04", name: "Hot Drinks", somaliName: "Cabitaanka Kulul", itemsCount: "8 items", printer: "Tea Station", status: "Active" },
      { id: "5", code: "CAT-05", name: "Appetizers & Sambusa", somaliName: "Cunto Fudud & Sambuus", itemsCount: "6 items", printer: "Fryer Station", status: "Active" },
    ],
    formFields: [
      { name: "code", label: "Category Code", type: "text" },
      { name: "name", label: "Category Name", type: "text" },
      { name: "somaliName", label: "Somali Name", type: "text" },
      { name: "printer", label: "Printer Station", type: "select", options: ["Main Kitchen", "Juice Bar", "Tea Station"] },
    ],
  },

  "locations": {
    slug: "locations",
    title: "Menu Locations & Floors",
    titleSomali: "Qeybaha & Dabaqyada Maqaayadda",
    category: "POS Management",
    description: "Manage dining sections, floors, outdoor terraces, and VIP rooms.",
    kpis: [
      { label: "Active Sections", value: "4 Locations", subtext: "Main Hall, VIP, Terrace, Family", color: "blue" },
      { label: "Total Seating Capacity", value: "180 Seats", subtext: "Available for guests", color: "emerald" },
      { label: "Assigned Waiters", value: "12 Waiters", subtext: "Currently stationed", color: "purple" },
      { label: "Occupancy Rate", value: "68%", subtext: "Lunch peak time", color: "amber" },
    ],
    columns: [
      { key: "name", label: "Section Name" },
      { key: "floor", label: "Floor Level" },
      { key: "tables", label: "Total Tables" },
      { key: "capacity", label: "Seating Capacity" },
      { key: "supervisor", label: "Floor Supervisor" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", name: "Ground Floor - Main Dining", floor: "Ground Floor", tables: "16 Tables", capacity: "64 Seats", supervisor: "Ahmed Nur", status: "Active" },
      { id: "2", name: "1st Floor - Family Section", floor: "1st Floor", tables: "10 Tables", capacity: "50 Seats", supervisor: "Fartun Mohamed", status: "Active" },
      { id: "3", name: "VIP Lounge & Private Rooms", floor: "2nd Floor", tables: "4 Private Rooms", capacity: "32 Seats", supervisor: "Hassan Ali", status: "Active" },
      { id: "4", name: "Rooftop Garden & Terrace", floor: "Rooftop", tables: "8 Tables", capacity: "34 Seats", supervisor: "Mustaf Jama", status: "Active" },
    ],
    formFields: [
      { name: "name", label: "Section Name", type: "text" },
      { name: "floor", label: "Floor Level", type: "select", options: ["Ground Floor", "1st Floor", "2nd Floor", "Rooftop"] },
      { name: "tables", label: "Number of Tables", type: "number" },
      { name: "capacity", label: "Seating Capacity", type: "number" },
    ],
  },

  "customers": {
    slug: "customers",
    title: "Customers Directory",
    titleSomali: "Diiwaanka Macaamiisha",
    category: "POS Management",
    description: "Loyalty customers, corporate accounts, credit balances, and order history.",
    kpis: [
      { label: "Total Customers", value: "542", subtext: "+38 this month", color: "blue" },
      { label: "VIP / Corporate Accounts", value: "24", subtext: "Monthly invoiced", color: "purple" },
      { label: "Outstanding Receivables", value: "$1,850.00", subtext: "Within 30 days", color: "amber" },
      { label: "Loyalty Points Awarded", value: "14,200 pts", subtext: "Redeemable", color: "emerald" },
    ],
    columns: [
      { key: "code", label: "Customer ID" },
      { key: "name", label: "Customer / Company Name" },
      { key: "phone", label: "Phone Number" },
      { key: "type", label: "Account Type" },
      { key: "balance", label: "Balance", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", code: "CUST-001", name: "Dahabshiil Bank Group", phone: "+252 61 555 1234", type: "Corporate Credit", balance: "$450.00", status: "Active" },
      { id: "2", code: "CUST-002", name: "Dr. Ali Warsame", phone: "+252 61 789 4433", type: "VIP Regular", balance: "$0.00", status: "Active" },
      { id: "3", code: "CUST-003", name: "Hormuud Telecom Office", phone: "+252 61 222 9876", type: "Corporate Credit", balance: "$720.00", status: "Active" },
      { id: "4", code: "CUST-004", name: "Amina Abdullahi", phone: "+252 61 999 1122", type: "Individual Loyalty", balance: "$0.00", status: "Active" },
    ],
    formFields: [
      { name: "name", label: "Customer Name", type: "text" },
      { name: "phone", label: "Phone Number", type: "text" },
      { name: "type", label: "Account Type", type: "select", options: ["Individual Regular", "VIP Regular", "Corporate Credit", "Event Client"] },
    ],
  },

  "waiters": {
    slug: "waiters",
    title: "Waiters & Staff Assignments",
    titleSomali: "Maamulka Kabaryada & Qaybaha",
    category: "POS Management",
    description: "Manage waiter PINs, assigned floor tables, shift sales, and commission tracking.",
    kpis: [
      { label: "Waiters on Shift", value: "8 Waiters", subtext: "Currently logged in", color: "blue" },
      { label: "Total Shift Sales", value: "$945.00", subtext: "Generated by team", color: "emerald" },
      { label: "Top Server Today", value: "Ahmed Nur", subtext: "28 orders served", color: "purple" },
      { label: "Avg Service Time", value: "7.2 mins", subtext: "From KOT to table", color: "amber" },
    ],
    columns: [
      { key: "code", label: "Waiter PIN/Code" },
      { key: "name", label: "Staff Name" },
      { key: "section", label: "Assigned Section" },
      { key: "shift", label: "Current Shift" },
      { key: "todayOrders", label: "Orders Taken" },
      { key: "sales", label: "Total Sales", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", code: "W-101", name: "Ahmed Nur", section: "Main Hall (T1 - T8)", shift: "Morning / Lunch", todayOrders: "28", sales: "$310.50", status: "On Duty" },
      { id: "2", code: "W-102", name: "Hassan Ali", section: "VIP Lounge (VIP 1 - 4)", shift: "Morning / Lunch", todayOrders: "14", sales: "$340.00", status: "On Duty" },
      { id: "3", code: "W-103", name: "Fartun Mohamed", section: "Family Area (T9 - T14)", shift: "Morning / Lunch", todayOrders: "22", sales: "$214.50", status: "On Duty" },
    ],
    formFields: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "code", label: "POS Passcode / PIN", type: "text" },
      { name: "section", label: "Assigned Section", type: "select", options: ["Main Hall", "VIP Lounge", "Family Area", "Terrace"] },
    ],
  },

  "bulk-payments": {
    slug: "bulk-payments",
    title: "Bulk Payments Reconciliation",
    titleSomali: "Dib-u-heshiisiinta Lacagaha Badan",
    category: "POS Management",
    description: "Reconcile corporate invoices, bulk customer settle payments, and end-of-shift receipts.",
    kpis: [
      { label: "Batches Processed", value: "14 Batches", subtext: "This month", color: "blue" },
      { label: "Total Reconciled", value: "$8,420.00", subtext: "EVC, Zaad & Bank", color: "emerald" },
      { label: "Pending Verification", value: "$320.00", subtext: "2 transactions", color: "amber" },
      { label: "Discrepancy", value: "$0.00", subtext: "Perfect match", color: "purple" },
    ],
    columns: [
      { key: "batchNo", label: "Batch Ref" },
      { key: "payer", label: "Entity / Payer" },
      { key: "method", label: "Channel" },
      { key: "ordersCount", label: "Orders Included" },
      { key: "amount", label: "Total Settled", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", batchNo: "BP-901", payer: "Dahabshiil Bank Staff Lunch", method: "Direct Bank Transfer", ordersCount: "42 Orders", amount: "$520.00", status: "Settled" },
      { id: "2", batchNo: "BP-902", payer: "Hormuud Executive Dinner", method: "EVC Merchant API", ordersCount: "18 Orders", amount: "$380.00", status: "Settled" },
    ],
    formFields: [
      { name: "payer", label: "Payer / Organization", type: "text" },
      { name: "amount", label: "Amount ($)", type: "number" },
      { name: "method", label: "Payment Channel", type: "select", options: ["EVC Plus Merchant", "Zaad Service", "Premier Bank", "Cash Deposit"] },
    ],
  },

  "transfer-record": {
    slug: "transfer-record",
    title: "POS Transfer Records",
    titleSomali: "Wareejinta Dalabyada & Miisaska",
    category: "POS Management",
    description: "Audit trail of table-to-table transfers, waiter handovers, and item reassignment.",
    kpis: [
      { label: "Today's Transfers", value: "7 Records", subtext: "Audited", color: "blue" },
      { label: "Table Swaps", value: "4 Transfers", subtext: "Customer request", color: "purple" },
      { label: "Waiter Handovers", value: "3 Transfers", subtext: "Shift changes", color: "emerald" },
      { label: "Manager Approvals", value: "100%", subtext: "Authorized", color: "amber" },
    ],
    columns: [
      { key: "ref", label: "Record ID" },
      { key: "type", label: "Transfer Type" },
      { key: "from", label: "Transferred From" },
      { key: "to", label: "Transferred To" },
      { key: "amount", label: "Ticket Value", type: "currency" },
      { key: "time", label: "Timestamp" },
    ],
    rows: [
      { id: "1", ref: "TR-501", type: "Table Change", from: "Table 02 (Hall)", to: "VIP Room 1", amount: "$64.00", time: "1:45 PM" },
      { id: "2", ref: "TR-502", type: "Waiter Handover", from: "Ahmed Nur (W-101)", to: "Hassan Ali (W-102)", amount: "$42.50", time: "2:15 PM" },
    ],
    formFields: [
      { name: "type", label: "Transfer Type", type: "select", options: ["Table to Table", "Waiter Handover", "Split Bill", "Merge Tables"] },
      { name: "from", label: "Source Table / Waiter", type: "text" },
      { name: "to", label: "Destination Table / Waiter", type: "text" },
    ],
  },

  "sessions": {
    slug: "sessions",
    title: "Cashier POS Sessions",
    titleSomali: "Wareegyada & Xilliyada Shaqada Kashirka",
    category: "POS Management",
    description: "Opening cash float, real-time sales closing, discrepancy audits, and shift end-of-day reports.",
    kpis: [
      { label: "Active Sessions", value: "2 Cashiers", subtext: "Terminal 01 & Terminal 02", color: "blue" },
      { label: "Cash in Drawer", value: "$980.00", subtext: "Verified float + sales", color: "emerald" },
      { label: "EVC / Digital Total", value: "$1,450.00", subtext: "Received digitally", color: "purple" },
      { label: "Today's Total Orders", value: "142 Closed", subtext: "Across active sessions", color: "amber" },
    ],
    columns: [
      { key: "sessionNo", label: "Session ID" },
      { key: "cashier", label: "Cashier" },
      { key: "terminal", label: "Terminal" },
      { key: "openingCash", label: "Opening Float", type: "currency" },
      { key: "totalSales", label: "Sales Generated", type: "currency" },
      { key: "status", label: "Session Status", type: "badge" },
    ],
    rows: [
      { id: "1", sessionNo: "SES-2026-081", cashier: "Farah Mohamed", terminal: "Main POS #1", openingCash: "$100.00", totalSales: "$840.50", status: "Active" },
      { id: "2", sessionNo: "SES-2026-082", cashier: "Halima Abdi", terminal: "Takeaway Counter #2", openingCash: "$80.00", totalSales: "$580.00", status: "Active" },
    ],
    formFields: [
      { name: "cashier", label: "Cashier Name", type: "text" },
      { name: "terminal", label: "POS Terminal", type: "select", options: ["Main POS Terminal 1", "Express Takeaway 2"] },
      { name: "openingCash", label: "Opening Float ($)", type: "number" },
    ],
  },

  "orders": {
    slug: "orders",
    title: "Cashier Orders Master",
    titleSomali: "Dhammaan Dalabyada Kashirka",
    category: "POS Management",
    description: "Real-time list of all restaurant dine-in, takeaway, and delivery orders.",
    kpis: [
      { label: "Total Orders Today", value: "142", subtext: "$2,430.50 gross", color: "blue" },
      { label: "Completed & Paid", value: "128", subtext: "89% settled", color: "emerald" },
      { label: "Unpaid / Dining", value: "11", subtext: "Currently seated", color: "amber" },
      { label: "Cancelled / Void", value: "3", subtext: "Manager approved", color: "purple" },
    ],
    columns: [
      { key: "orderId", label: "Order #" },
      { key: "type", label: "Order Type" },
      { key: "table", label: "Table / Destination" },
      { key: "waiter", label: "Server" },
      { key: "itemsSummary", label: "Items" },
      { key: "amount", label: "Total Amount", type: "currency" },
      { key: "paymentStatus", label: "Payment", type: "badge" },
    ],
    rows: [
      { id: "1", orderId: "ORD-9104", type: "Dine-In", table: "Table 01", waiter: "Ahmed Nur", itemsSummary: "1x Bariis & Hilib, 1x Mango", amount: "$10.50", paymentStatus: "Paid" },
      { id: "2", orderId: "ORD-9105", type: "Dine-In", table: "VIP Room 1", waiter: "Hassan Ali", itemsSummary: "4x Baasto Saldaato, 2x Kalluun", amount: "$64.00", paymentStatus: "Unpaid" },
      { id: "3", orderId: "ORD-9106", type: "Takeaway", table: "Counter Pickup", waiter: "Halima A.", itemsSummary: "3x Suqaar Hilib, 6x Sabaayad", amount: "$24.00", paymentStatus: "Paid" },
    ],
    formFields: [
      { name: "type", label: "Order Type", type: "select", options: ["Dine-In", "Takeaway", "Delivery"] },
      { name: "table", label: "Table / Room", type: "text" },
      { name: "amount", label: "Total Bill ($)", type: "number" },
    ],
  },

  "kitchen-orders": {
    slug: "kitchen-orders",
    title: "Kitchen Orders (KDS Screen)",
    titleSomali: "Dalabyada Jikada (KDS)",
    category: "POS Management",
    description: "Live kitchen tickets, cooking time countdown, item modifiers, and dispatch stations.",
    kpis: [
      { label: "Active in Kitchen", value: "8 Tickets", subtext: "Currently cooking", color: "amber" },
      { label: "Ready for Pickup", value: "4 Tickets", subtext: "Awaiting server", color: "emerald" },
      { label: "Average Prep Time", value: "8.5 mins", subtext: "Target: 10 mins", color: "blue" },
      { label: "Completed Today", value: "134 Tickets", subtext: "High efficiency", color: "purple" },
    ],
    columns: [
      { key: "kotNo", label: "KOT Ticket" },
      { key: "table", label: "Table / Area" },
      { key: "items", label: "Ordered Items" },
      { key: "specialNotes", label: "Chef Notes" },
      { key: "elapsed", label: "Timer" },
      { key: "status", label: "Kitchen Status", type: "badge" },
    ],
    rows: [
      { id: "1", kotNo: "KOT-401", table: "Table 02", items: "1x Bariis & Hilib Geel, 1x Maraq", specialNotes: "No chili / Basbaas la'aan", elapsed: "4 mins ago", status: "Cooking" },
      { id: "2", kotNo: "KOT-402", table: "VIP Lounge", items: "2x Kalluun Dhadhamo, 2x Salad", specialNotes: "Crispy fish", elapsed: "12 mins ago", status: "Ready for Serving" },
    ],
    formFields: [
      { name: "table", label: "Table / Order", type: "text" },
      { name: "items", label: "Dishes & Quantity", type: "text" },
    ],
  },

  "tables": {
    slug: "tables",
    title: "Tables Management & Seating Plan",
    titleSomali: "Maamulka Miisaska & Fadhiga",
    category: "POS Management",
    description: "Floor plan configuration, table status (available/occupied/reserved), and seating capacity.",
    kpis: [
      { label: "Total Tables", value: "24 Tables", subtext: "In 4 floor zones", color: "blue" },
      { label: "Currently Occupied", value: "14 Tables", subtext: "58% occupancy", color: "amber" },
      { label: "Available Now", value: "8 Tables", subtext: "Ready for guests", color: "emerald" },
      { label: "Reserved for Tonight", value: "2 Tables", subtext: "Dinner bookings", color: "purple" },
    ],
    columns: [
      { key: "tableNumber", label: "Table #" },
      { key: "zone", label: "Zone / Floor" },
      { key: "seats", label: "Seats" },
      { key: "currentWaiter", label: "Assigned Waiter" },
      { key: "currentBill", label: "Running Bill", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", tableNumber: "Table 01", zone: "Main Hall", seats: "4 Seats", currentWaiter: "Ahmed Nur", currentBill: "$28.50", status: "Occupied" },
      { id: "2", tableNumber: "Table 02", zone: "Main Hall", seats: "4 Seats", currentWaiter: "Ahmed Nur", currentBill: "$0.00", status: "Available" },
      { id: "3", tableNumber: "VIP Room 1", zone: "VIP Suite", seats: "8 Seats", currentWaiter: "Hassan Ali", currentBill: "$130.00", status: "Occupied" },
    ],
    formFields: [
      { name: "tableNumber", label: "Table Name", type: "text" },
      { name: "zone", label: "Zone", type: "select", options: ["Main Dining Hall", "VIP Suite", "Terrace"] },
      { name: "seats", label: "Capacity", type: "number" },
    ],
  },

  "reports": {
    slug: "reports",
    title: "POS Performance & Sales Reports",
    titleSomali: "Warbixinnada Iibka POS-ka",
    category: "POS Management",
    description: "Detailed daily, hourly, waiter, and product sales analytics.",
    kpis: [
      { label: "Today's Gross Sales", value: "$2,430.50", subtext: "+12.4% vs last week", color: "emerald" },
      { label: "Total Orders Closed", value: "142 Orders", subtext: "Avg ticket: $17.11", color: "blue" },
      { label: "Discount / Comps", value: "$45.00", subtext: "Authorized discounts", color: "amber" },
      { label: "Net Tax Collected", value: "$121.50", subtext: "5% VAT included", color: "purple" },
    ],
    columns: [
      { key: "period", label: "Shift / Time" },
      { key: "orders", label: "Orders" },
      { key: "cashAmount", label: "Cash Sales", type: "currency" },
      { key: "digitalAmount", label: "Digital Sales (EVC)", type: "currency" },
      { key: "totalSales", label: "Total Revenue", type: "currency" },
    ],
    rows: [
      { id: "1", period: "Morning Shift (06:00 - 11:30)", orders: "48 Orders", cashAmount: "$180.00", digitalAmount: "$340.00", totalSales: "$585.00" },
      { id: "2", period: "Lunch Peak (11:30 - 15:30)", orders: "68 Orders", cashAmount: "$320.00", digitalAmount: "$780.50", totalSales: "$1,310.50" },
    ],
    formFields: [
      { name: "period", label: "Shift Period", type: "text" },
    ],
  },

  // === SERVICES POS ===
  "services-setup": {
    slug: "services/setup",
    title: "Services Setup",
    titleSomali: "Dejinta Adeegyada Gaarka ah",
    category: "Services POS",
    description: "Catering, VIP room rental, private dining setup, and sound system charges.",
    kpis: [
      { label: "Active Services", value: "8 Services", subtext: "Available for booking", color: "blue" },
      { label: "Service Revenue", value: "$3,450.00", subtext: "This month", color: "emerald" },
      { label: "Avg Service Rate", value: "$150/hr", subtext: "Standard VIP rate", color: "purple" },
      { label: "Bookings Pending", value: "4 Bookings", subtext: "Next 7 days", color: "amber" },
    ],
    columns: [
      { key: "code", label: "Service Code" },
      { key: "name", label: "Service Name" },
      { key: "unit", label: "Billing Unit" },
      { key: "rate", label: "Standard Rate", type: "currency" },
      { key: "taxable", label: "Taxable" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", code: "SRV-01", name: "VIP Private Room Booking", unit: "Per 3 Hours", rate: "$80.00", taxable: "Yes", status: "Active" },
      { id: "2", code: "SRV-02", name: "Outside Catering Buffet Service", unit: "Per Person", rate: "$15.00", taxable: "Yes", status: "Active" },
      { id: "3", code: "SRV-03", name: "Sound System & Mic Rental", unit: "Per Event", rate: "$120.00", taxable: "No", status: "Active" },
      { id: "4", code: "SRV-04", name: "Executive Chef Private Tasting", unit: "Per Session", rate: "$200.00", taxable: "Yes", status: "Active" },
    ],
    formFields: [
      { name: "code", label: "Service Code", type: "text" },
      { name: "name", label: "Service Name", type: "text" },
      { name: "unit", label: "Billing Unit", type: "text" },
      { name: "rate", label: "Rate ($)", type: "number" },
    ],
  },

  "services-sales": {
    slug: "services/sales",
    title: "POS Service Sales",
    titleSomali: "Iibinta Adeegyada",
    category: "Services POS",
    description: "Direct invoicing and billing for non-food restaurant services.",
    kpis: [
      { label: "Total Invoiced", value: "$1,850.00", subtext: "Today", color: "emerald" },
      { label: "Service Orders", value: "6 Orders", subtext: "VIP & Catering", color: "blue" },
      { label: "Collected Cash", value: "$600.00", subtext: "EVC / Bank $1,250", color: "purple" },
      { label: "Discounts", value: "$50.00", subtext: "Approved", color: "amber" },
    ],
    columns: [
      { key: "invoiceNo", label: "Invoice #" },
      { key: "client", label: "Client Name" },
      { key: "service", label: "Service Rendered" },
      { key: "hours", label: "Duration / Qty" },
      { key: "total", label: "Total Amount", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", invoiceNo: "SRV-INV-101", client: "Somali Trade Summit", service: "Outside Catering Buffet", hours: "60 Pax", total: "$900.00", status: "Paid" },
      { id: "2", invoiceNo: "SRV-INV-102", client: "Ministerial Meeting", service: "VIP Room 1 + Projector", hours: "4 Hours", total: "$160.00", status: "Paid" },
      { id: "3", invoiceNo: "SRV-INV-103", client: "Family Engagement Party", service: "Decorated Table Setup", hours: "1 Event", total: "$120.00", status: "Active" },
    ],
    formFields: [
      { name: "client", label: "Client Name", type: "text" },
      { name: "service", label: "Service", type: "text" },
      { name: "total", label: "Total Amount ($)", type: "number" },
    ],
  },

  // === INVENTORY MANAGEMENT ===
  "vendors": {
    slug: "inventory/vendors",
    title: "Vendors & Suppliers",
    titleSomali: "Alaab-Qeybiyeyaasha & Ganacsatada",
    category: "Inventory Management",
    description: "Meat suppliers, fresh produce wholesalers, dairy, spices, and packaging vendors.",
    kpis: [
      { label: "Total Vendors", value: "26 Vendors", subtext: "Verified partners", color: "blue" },
      { label: "Total Purchases (MTD)", value: "$12,480.00", subtext: "Ingredients & Meat", color: "emerald" },
      { label: "Outstanding Payables", value: "$3,150.00", subtext: "Payment due within 15 days", color: "amber" },
      { label: "Active Contracts", value: "18", subtext: "Locked pricing", color: "purple" },
    ],
    columns: [
      { key: "code", label: "Vendor ID" },
      { key: "name", label: "Vendor / Merchant Name" },
      { key: "category", label: "Supply Category" },
      { key: "contact", label: "Phone / Contact" },
      { key: "balance", label: "Payable Balance", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", code: "VND-01", name: "Bakaaro Fresh Camel Meat Co.", category: "Meat & Butchery", contact: "+252 61 511 2233", balance: "$1,200.00", status: "Active" },
      { id: "2", code: "VND-02", name: "Shabelle Fresh Farm Produce", category: "Vegetables & Fruits", contact: "+252 61 622 4455", balance: "$450.00", status: "Active" },
      { id: "3", code: "VND-03", name: "Mogadishu Spice & Basmati Rice", category: "Dry Goods & Grains", contact: "+252 61 733 9988", balance: "$850.00", status: "Active" },
      { id: "4", code: "VND-04", name: "Danab Beverage & Water Ltd.", category: "Bottled Drinks & Juices", contact: "+252 61 844 7711", balance: "$650.00", status: "Active" },
    ],
    formFields: [
      { name: "name", label: "Vendor Business Name", type: "text" },
      { name: "category", label: "Supply Category", type: "select", options: ["Meat & Butchery", "Vegetables & Fruits", "Dry Goods & Grains", "Dairy & Milk", "Packaging & Disposables"] },
      { name: "contact", label: "Phone Number", type: "text" },
    ],
  },

  "purchases": {
    slug: "inventory/purchases",
    title: "Purchase Orders & Receiving",
    titleSomali: "Dalabyada Soo Iibsiga Raashinka",
    category: "Inventory Management",
    description: "Purchase bills, receiving inspection, supplier prices, and warehouse GRNs.",
    kpis: [
      { label: "Today's Purchases", value: "$640.00", subtext: "Fresh meat & vegetables", color: "blue" },
      { label: "Month to Date", value: "$8,950.00", subtext: "Warehouse stock", color: "emerald" },
      { label: "Pending Receiving", value: "2 Orders", subtext: "Arriving this afternoon", color: "amber" },
      { label: "Quality Pass Rate", value: "99.2%", subtext: "Fresh standard met", color: "purple" },
    ],
    columns: [
      { key: "poNo", label: "PO #" },
      { key: "vendor", label: "Vendor" },
      { key: "itemsSummary", label: "Items Received" },
      { key: "amount", label: "Total Cost", type: "currency" },
      { key: "date", label: "Date" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", poNo: "PO-2026-104", vendor: "Bakaaro Fresh Camel Meat Co.", itemsSummary: "50kg Hilib Geel, 30kg Hilib Ari", amount: "$420.00", date: "2026-11-19", status: "Received" },
      { id: "2", poNo: "PO-2026-105", vendor: "Shabelle Fresh Farm Produce", itemsSummary: "100kg Cambe, 80kg Tamaandho, 50kg Basal", amount: "$220.00", date: "2026-11-19", status: "Received" },
      { id: "3", poNo: "PO-2026-106", vendor: "Mogadishu Spice & Basmati Rice", itemsSummary: "10 Bags Basmati Rice (25kg)", amount: "$350.00", date: "2026-11-18", status: "Settled" },
    ],
    formFields: [
      { name: "vendor", label: "Vendor", type: "text" },
      { name: "itemsSummary", label: "Items & Quantities", type: "text" },
      { name: "amount", label: "Total Amount ($)", type: "number" },
    ],
  },

  // === HALL MANAGEMENT ===
  "hall-management": {
    slug: "hall-management",
    title: "Hall & Events Dashboard",
    titleSomali: "Maamulka Hoolalka & Munaasabadaha",
    category: "Hall Management",
    description: "Manage wedding halls, conference banquet centers, meeting rooms, and event booking schedules.",
    kpis: [
      { label: "Active Event Halls", value: "3 Halls", subtext: "Banquet, VIP & Ballroom", color: "purple" },
      { label: "Upcoming Events (7 Days)", value: "6 Events", subtext: "4 Weddings, 2 Corporate", color: "emerald" },
      { label: "Hall Revenue (MTD)", value: "$18,400.00", subtext: "+22% vs last month", color: "blue" },
      { label: "Avg Event Margin", value: "48%", subtext: "High profitability", color: "amber" },
    ],
    columns: [
      { key: "bookingNo", label: "Booking ID" },
      { key: "hall", label: "Hall Name" },
      { key: "client", label: "Client / Couple" },
      { key: "eventType", label: "Event Type" },
      { key: "eventDate", label: "Date & Time" },
      { key: "price", label: "Contract Value", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", bookingNo: "EVT-801", hall: "Grand Diamond Ballroom", client: "Ahmed & Sahra Wedding", eventType: "Wedding Banquet", eventDate: "2026-11-20 (6:00 PM)", price: "$3,200.00", status: "Confirmed" },
      { id: "2", bookingNo: "EVT-802", hall: "Somalia Hall A", client: "UN-Habitat Annual Dinner", eventType: "Corporate Gala Dinner", eventDate: "2026-11-22 (1:00 PM)", price: "$1,800.00", status: "Confirmed" },
      { id: "3", bookingNo: "EVT-803", hall: "VIP Executive Boardroom", client: "Heritage Institute Forum", eventType: "Conference & Lunch", eventDate: "2026-11-24 (9:00 AM)", price: "$950.00", status: "Active" },
    ],
    formFields: [
      { name: "hall", label: "Select Hall", type: "select", options: ["Grand Diamond Ballroom", "Somalia Hall A", "VIP Executive Boardroom"] },
      { name: "client", label: "Client / Contact Person", type: "text" },
      { name: "eventType", label: "Event Type", type: "select", options: ["Wedding Banquet", "Corporate Dinner", "Conference", "Graduation", "Engagement"] },
      { name: "eventDate", label: "Event Date", type: "date" },
      { name: "price", label: "Contract Price ($)", type: "number" },
    ],
  },

  // === STORE & KITCHEN MANAGEMENT ===
  "store-management": {
    slug: "store-management",
    title: "Store & Kitchen Stock Management",
    titleSomali: "Maamulka Bakhaarka & Jikada",
    category: "Store Management",
    description: "Warehouse to kitchen transfers, daily meat/rice usage logging, and waste monitoring.",
    kpis: [
      { label: "Main Warehouse Value", value: "$24,500.00", subtext: "Grains, oils & frozen", color: "blue" },
      { label: "Kitchen Daily Transfers", value: "$780.00", subtext: "Moved to hot kitchen", color: "emerald" },
      { label: "Daily Consumption (Usage)", value: "$720.00", subtext: "Food cooked today", color: "amber" },
      { label: "Stock Discrepancy", value: "0.2%", subtext: "Within optimal tolerance", color: "purple" },
    ],
    columns: [
      { key: "transferId", label: "Transfer ID" },
      { key: "from", label: "Source" },
      { key: "to", label: "Kitchen Station" },
      { key: "items", label: "Ingredients Transferred" },
      { key: "dispatchedBy", label: "Store Keeper" },
      { key: "receivedBy", label: "Head Chef" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", transferId: "TRF-901", from: "Main Cold Storage", to: "Hot Kitchen Meat Section", items: "40kg Camel Meat, 25kg Goat Meat", dispatchedBy: "Ali Store", receivedBy: "Chef Jama", status: "Active" },
      { id: "2", transferId: "TRF-902", from: "Dry Warehouse", to: "Main Rice & Pasta Section", items: "2 Bags Basmati Rice (50kg), 15kg Spaghetti", dispatchedBy: "Ali Store", receivedBy: "Chef Jama", status: "Active" },
      { id: "3", transferId: "TRF-903", from: "Vegetable Chiller", to: "Juice & Salad Bar", items: "30kg Fresh Mango, 20kg Avocado, 15kg Lemons", dispatchedBy: "Ali Store", receivedBy: "Barista Farah", status: "Active" },
    ],
    formFields: [
      { name: "from", label: "From Store", type: "select", options: ["Main Cold Storage", "Dry Goods Warehouse", "Vegetable Chiller"] },
      { name: "to", label: "To Kitchen Station", type: "select", options: ["Hot Kitchen Meat Section", "Main Rice & Pasta Section", "Juice & Salad Bar", "Bakery Station"] },
      { name: "items", label: "Items & Quantity", type: "text" },
    ],
  },

  // === ACCOUNTING ===
  "chart": {
    slug: "accounting/chart",
    title: "Chart of Accounts (COA)",
    titleSomali: "Buugga Xisaabaadka Guud",
    category: "Accounting",
    description: "Double-entry general ledger structure: Assets, Liabilities, Equity, Revenue, and Expenses.",
    kpis: [
      { label: "Total Ledger Accounts", value: "48 Accounts", subtext: "Standard restaurant GAAP", color: "blue" },
      { label: "Current Assets", value: "$42,300.00", subtext: "Cash + Banks + Stock", color: "emerald" },
      { label: "Current Liabilities", value: "$6,150.00", subtext: "Supplier payables", color: "amber" },
      { label: "Net Owner Equity", value: "$36,150.00", subtext: "Retained earnings", color: "purple" },
    ],
    columns: [
      { key: "accountCode", label: "Account #" },
      { key: "accountName", label: "Account Name" },
      { key: "type", label: "Type" },
      { key: "currency", label: "Currency" },
      { key: "balance", label: "Current Balance", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", accountCode: "1010", accountName: "Cash on Hand - Main POS Till", type: "Current Asset", currency: "USD", balance: "$1,840.50", status: "Active" },
      { id: "2", accountCode: "1020", accountName: "Premier Bank Business Account", type: "Bank Account", currency: "USD", balance: "$18,500.00", status: "Active" },
      { id: "3", accountCode: "1030", accountName: "EVC Plus Merchant Wallet", type: "Digital Merchant", currency: "USD", balance: "$6,420.00", status: "Active" },
      { id: "4", accountCode: "2010", accountName: "Accounts Payable - Vendors", type: "Current Liability", currency: "USD", balance: "$3,150.00", status: "Active" },
      { id: "5", accountCode: "4010", accountName: "Restaurant Food Sales Revenue", type: "Revenue", currency: "USD", balance: "$48,900.00", status: "Active" },
      { id: "6", accountCode: "5010", accountName: "Cost of Goods Sold (Raw Ingredients)", type: "COGS / Expense", currency: "USD", balance: "$19,200.00", status: "Active" },
    ],
    formFields: [
      { name: "accountCode", label: "Account Number", type: "text" },
      { name: "accountName", label: "Account Name", type: "text" },
      { name: "type", label: "Account Classification", type: "select", options: ["Current Asset", "Bank Account", "Current Liability", "Revenue", "Direct Expense", "Operating Expense"] },
    ],
  },

  // === HR & PAYROLL ===
  "hr": {
    slug: "hr",
    title: "HR Overview & Staff Operations",
    titleSomali: "Maamulka Guud ee Shaqaalaha",
    category: "HR Management",
    description: "Employee directory, attendance, shifts, leave requests, and payroll summaries.",
    kpis: [
      { label: "Total Employees", value: "34 Staff", subtext: "Chefs, Waiters, Cashiers, Admin", color: "blue" },
      { label: "Present on Shift Today", value: "31 Staff", subtext: "3 on approved leave", color: "emerald" },
      { label: "Monthly Payroll Cost", value: "$9,850.00", subtext: "Salaries + allowances", color: "purple" },
      { label: "Open Advance Requests", value: "$420.00", subtext: "3 employees", color: "amber" },
    ],
    columns: [
      { key: "empId", label: "Staff ID" },
      { key: "name", label: "Full Name" },
      { key: "department", label: "Department" },
      { key: "position", label: "Position" },
      { key: "salary", label: "Monthly Salary", type: "currency" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", empId: "EMP-001", name: "Chef Jama Warsame", department: "Kitchen Operations", position: "Executive Head Chef", salary: "$750.00", status: "Active" },
      { id: "2", empId: "EMP-002", name: "Ahmed Nur", department: "Service & Dining", position: "Head Waiter", salary: "$350.00", status: "Active" },
      { id: "3", empId: "EMP-003", name: "Farah Mohamed", department: "Cashier & Billing", position: "Lead Cashier", salary: "$400.00", status: "Active" },
      { id: "4", empId: "EMP-004", name: "Hassan Ali", department: "Service & Dining", position: "Senior Waiter", salary: "$300.00", status: "Active" },
      { id: "5", empId: "EMP-005", name: "Fartun Mohamed", department: "Service & Dining", position: "Waitress", salary: "$300.00", status: "Active" },
    ],
    formFields: [
      { name: "name", label: "Employee Name", type: "text" },
      { name: "department", label: "Department", type: "select", options: ["Kitchen Operations", "Service & Dining", "Cashier & Billing", "Warehouse & Store", "Cleaning & Security"] },
      { name: "position", label: "Job Title", type: "text" },
      { name: "salary", label: "Salary ($)", type: "number" },
    ],
  },
};

// Smart fallback generator for any subpage requested by sidebar
export function getSubpageConfig(slugPath: string): SubpageConfig {
  const normalized = slugPath.toLowerCase().replace(/^\/+/g, "").replace(/\/+$/g, "");
  const lastPart = normalized.split("/").pop() || "";

  // Check direct matches
  if (subpagesData[normalized]) return subpagesData[normalized];
  if (subpagesData[lastPart]) return subpagesData[lastPart];

  // Capitalize title
  const formattedTitle = lastPart
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const parentFolder = normalized.split("/")[0] || "General";
  const formattedCategory = parentFolder
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug: normalized,
    title: formattedTitle || "Module Details",
    titleSomali: `Qaybta ${formattedTitle} ee Maqaayadda Walaalaha`,
    category: formattedCategory,
    description: `Full real-time operations, auditing, and management for ${formattedTitle}.`,
    kpis: [
      { label: `Total ${formattedTitle}`, value: "18 Records", subtext: "Up to date", color: "blue" },
      { label: "Active Status", value: "100%", subtext: "All operations active", color: "emerald" },
      { label: "Monthly Volume", value: "$4,250.00", subtext: "Processed this month", color: "purple" },
      { label: "Last Audited", value: "Today", subtext: "Verified by Manager", color: "amber" },
    ],
    columns: [
      { key: "code", label: "Reference Code" },
      { key: "name", label: "Title / Description" },
      { key: "assignedTo", label: "Assigned To / Category" },
      { key: "value", label: "Amount / Target", type: "currency" },
      { key: "date", label: "Recorded Date" },
      { key: "status", label: "Status", type: "badge" },
    ],
    rows: [
      { id: "1", code: `REF-${lastPart.toUpperCase().slice(0, 3)}-101`, name: `Standard ${formattedTitle} Entry #1`, assignedTo: "Walaalaha Main Branch", value: "$450.00", date: "2026-11-19", status: "Active" },
      { id: "2", code: `REF-${lastPart.toUpperCase().slice(0, 3)}-102`, name: `Standard ${formattedTitle} Entry #2`, assignedTo: "Walaalaha Express", value: "$820.00", date: "2026-11-18", status: "Active" },
      { id: "3", code: `REF-${lastPart.toUpperCase().slice(0, 3)}-103`, name: `Standard ${formattedTitle} Entry #3`, assignedTo: "Main Kitchen & Store", value: "$310.00", date: "2026-11-17", status: "Active" },
    ],
    formFields: [
      { name: "code", label: "Reference Code", type: "text" },
      { name: "name", label: "Title / Description", type: "text" },
      { name: "assignedTo", label: "Branch / Department", type: "text" },
      { name: "value", label: "Value ($)", type: "number" },
    ],
  };
}
