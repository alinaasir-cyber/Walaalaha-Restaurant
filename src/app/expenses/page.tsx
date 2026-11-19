import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default function ExpensesIndex() {
  const config = getSubpageConfig("expenses");
  return <ModuleView config={config} />;
}
