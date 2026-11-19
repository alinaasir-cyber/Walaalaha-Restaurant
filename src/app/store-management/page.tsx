import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default function StoreManagementIndex() {
  const config = getSubpageConfig("store-management");
  return <ModuleView config={config} />;
}
