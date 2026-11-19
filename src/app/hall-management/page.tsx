import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default function HallManagementIndex() {
  const config = getSubpageConfig("hall-management");
  return <ModuleView config={config} />;
}
