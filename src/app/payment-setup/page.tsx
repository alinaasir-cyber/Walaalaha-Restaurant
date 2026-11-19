import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default function PaymentSetupPage() {
  const config = getSubpageConfig("payment-setup");
  return <ModuleView config={config} />;
}
