import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default async function HallSubpage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = `hall-management/${slug.join("/")}`;
  const config = getSubpageConfig(slugPath);

  return <ModuleView config={config} />;
}
