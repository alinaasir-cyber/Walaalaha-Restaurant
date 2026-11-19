import React from "react";
import ModuleView from "@/components/ModuleView";
import { getSubpageConfig } from "@/data/modulesData";

export default async function FixedAssetsSubpage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = `fixed-assets/${slug.join("/")}`;
  const config = getSubpageConfig(slugPath);

  return <ModuleView config={config} />;
}
