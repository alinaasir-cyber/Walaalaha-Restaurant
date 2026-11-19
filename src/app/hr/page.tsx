import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default function HRIndex() {
  const config = getSubpageConfig("hr");
  return <ModuleView config={config} />;
}
