import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default function FeedbacksPage() {
  const config = getSubpageConfig("feedbacks");
  return <ModuleView config={config} />;
}
