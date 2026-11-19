import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default async function ServicesSubpage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = `services/${slug.join("/")}`;
  const config = getSubpageConfig(slugPath);

  return <ModuleView config={config} />;
}
