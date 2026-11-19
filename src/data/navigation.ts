export interface SubNavItem {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  icon: string;
  href?: string;
  items?: SubNavItem[];
}

export const navigationData: NavSection[] = [
  {
    title: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
  },
  {
    title: "POS Management",
    icon: "UtensilsCrossed",
    items: [
      { title: "POS Dashboard", href: "/pos" },
      { title: "Menu Management", href: "/pos/menu" },
      { title: "Menu Categories", href: "/pos/categories" },
      { title: "Menu Locations", href: "/pos/locations" },
      { title: "Customers", href: "/pos/customers" },
      { title: "Waiters", href: "/pos/waiters" },
      { title: "Bulk Payments", href: "/pos/bulk-payments" },
      { title: "Transfer Record", href: "/pos/transfer-record" },
      { title: "Sessions", href: "/pos/sessions" },
      { title: "Cashier Orders", href: "/pos/orders" },
      { title: "Kitchen Orders", href: "/pos/kitchen-orders" },
      { title: "Tables", href: "/pos/tables" },
      { title: "Reports", href: "/pos/reports" },
    ],
  },
  {
    title: "Services POS",
    icon: "ConciergeBell",
    items: [
      { title: "Services Setup", href: "/services/setup" },
      { title: "POS Sale", href: "/services/sales" },
      { title: "Transaction History", href: "/services/transactions" },
      { title: "Service Report", href: "/services/report" },
    ],
  },
  {
    title: "Inventory Management",
    icon: "Boxes",
    items: [
      { title: "Vendors", href: "/inventory/vendors" },
      { title: "Categories", href: "/inventory/categories" },
      { title: "Products & Services", href: "/inventory/products" },
      { title: "Purchases", href: "/inventory/purchases" },
      { title: "Bulk Vendor", href: "/inventory/bulk-vendor" },
      { title: "Stock Adjustments", href: "/inventory/adjustments" },
      { title: "Purchase Report", href: "/inventory/purchase-report" },
      { title: "A/P Aging", href: "/inventory/ap-aging" },
      { title: "Payment Plans", href: "/inventory/payment-plans" },
    ],
  },
  {
    title: "Hall Management",
    icon: "PartyPopper",
    items: [
      { title: "Dashboard", href: "/hall-management" },
      { title: "Customers", href: "/hall-management/customers" },
      { title: "Halls", href: "/hall-management/halls" },
      { title: "Event Types & Sales", href: "/hall-management/event-types" },
      { title: "Event Schedule", href: "/hall-management/events" },
      { title: "Payments", href: "/hall-management/payments" },
      { title: "Event Waiters", href: "/hall-management/event-waiters" },
      { title: "Event Profitability", href: "/hall-management/profitability" },
      { title: "Event Plan", href: "/hall-management/event-plan" },
      { title: "Reports", href: "/hall-management/reports" },
    ],
  },
  {
    title: "Store Management",
    icon: "Store",
    items: [
      { title: "Dashboard", href: "/store-management" },
      { title: "Kitchens", href: "/store-management/kitchens" },
      { title: "Usage", href: "/store-management/usage" },
      { title: "Transfers", href: "/store-management/transfers" },
      { title: "Kitchen Report", href: "/store-management/kitchen-report" },
      { title: "Transfer Report", href: "/store-management/transfer-report" },
      { title: "Stock Movement by Category", href: "/store-management/movement" },
      { title: "Kitchen Stock", href: "/store-management/products" },
      { title: "Usage Report", href: "/store-management/usage-report" },
    ],
  },
  {
    title: "Accounting",
    icon: "Calculator",
    items: [
      { title: "Chart of Accounts", href: "/accounting/chart" },
      { title: "Opening Balances", href: "/accounting/opening-balances" },
      { title: "Journal Entries", href: "/accounting/journal-entries" },
      { title: "Budget Management", href: "/accounting/budget-management" },
      { title: "Financial Statements", href: "/accounting/financial-statements" },
      { title: "Financial Statements Details", href: "/accounting/financial-statements-details" },
      { title: "Account Statement", href: "/accounting/account-statement" },
      { title: "Negative Accounts", href: "/accounting/negative-accounts" },
      { title: "Cash Reconciliation", href: "/accounting/cash-reconciliation" },
      { title: "Recurring Transactions", href: "/accounting/recurring-transactions" },
      { title: "Year-End Closure", href: "/accounting/year-end-closure" },
    ],
  },
  {
    title: "Budget Management",
    icon: "PiggyBank",
    items: [
      { title: "Waiter Budget", href: "/accounting/waiter-budget" },
      { title: "Purchase Budget", href: "/accounting/purchase-budget" },
      { title: "Income Budget", href: "/accounting/income-budget" },
      { title: "Vendor Payment Budget", href: "/accounting/vendor-budget" },
    ],
  },
  {
    title: "Fixed Assets",
    icon: "Building2",
    items: [
      { title: "Asset Setup", href: "/fixed-assets/asset-setup" },
      { title: "Asset Register", href: "/fixed-assets/asset-register" },
      { title: "Depreciation", href: "/fixed-assets/depreciation" },
      { title: "Asset Movement", href: "/fixed-assets/asset-movement" },
      { title: "Maintenance", href: "/fixed-assets/maintenance" },
      { title: "Disposal", href: "/fixed-assets/disposal" },
      { title: "Impairment", href: "/fixed-assets/impairment" },
      { title: "Reports", href: "/fixed-assets/reports" },
    ],
  },
  {
    title: "Expenses Management",
    icon: "Receipt",
    items: [
      { title: "Dashboard", href: "/expenses/dashboard" },
      { title: "Expenses", href: "/expenses" },
      { title: "Expense Categories", href: "/expenses/categories" },
      { title: "Reports", href: "/expenses/reports" },
    ],
  },
  {
    title: "Financial Reports",
    icon: "FileSpreadsheet",
    items: [
      { title: "Daily Snapshot", href: "/accounting/financial-reports" },
      { title: "Vendor Statement", href: "/accounting/vendor-statement" },
      { title: "Customers Statement", href: "/accounting/customer-statement" },
      { title: "Product Profitability", href: "/accounting/product-profitability" },
    ],
  },
  {
    title: "HR Management",
    icon: "Users",
    items: [
      { title: "HR Overview", href: "/hr" },
      { title: "Departments", href: "/hr/departments" },
      { title: "Positions", href: "/hr/positions" },
      { title: "Employees", href: "/hr/employees" },
      { title: "Contracts", href: "/hr/contracts" },
      { title: "Shifts", href: "/hr/shifts" },
      { title: "Attendance", href: "/hr/attendance" },
      { title: "Leave Management", href: "/hr/leaves" },
      { title: "Leave Balances", href: "/hr/leave-balances" },
      { title: "Payroll", href: "/hr/payroll" },
      { title: "Salary Advance", href: "/hr/salaryadvance" },
      { title: "Overtime", href: "/hr/overtime" },
      { title: "Deductions", href: "/hr/deductions" },
      { title: "Allowances", href: "/hr/allowances" },
      { title: "Payroll Report", href: "/hr/payroll-report" },
      { title: "Employee Report", href: "/hr/employee-report" },
      { title: "Left Employees Report", href: "/hr/left-employees-report" },
    ],
  },
  {
    title: "Payment & Feedback",
    icon: "CreditCard",
    items: [
      { title: "Feedbacks", href: "/feedbacks" },
      { title: "Payment Setup", href: "/payment-setup" },
    ],
  },
  {
    title: "Administration",
    icon: "ShieldAlert",
    items: [
      { title: "Users", href: "/admin/users" },
      { title: "Roles", href: "/admin/roles" },
      { title: "Branches", href: "/admin/branches" },
    ],
  },
];
