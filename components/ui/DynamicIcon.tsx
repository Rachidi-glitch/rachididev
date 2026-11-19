import {
  IconApi,
  IconApps,
  IconBolt,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandPython,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandWordpress,
  IconBuildingStore,
  IconCode,
  IconDatabase,
  IconGauge,
  IconLayoutGrid,
  IconPlugConnected,
  IconServer,
  IconShoppingCart,
  IconTool,
  type IconProps,
} from "@tabler/icons-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<IconProps>> = {
  IconBrandWordpress,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandPython,
  IconBrandPhp,
  IconBrandNodejs,
  IconDatabase,
  IconBolt,
  IconApi,
  IconBrandGithub,
  IconBrandDocker,
  IconLayoutGrid,
  IconCode,
  IconServer,
  IconApps,
  IconShoppingCart,
  IconBuildingStore,
  IconPlugConnected,
  IconTool,
  IconGauge,
};

export function DynamicIcon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const IconComponent = iconMap[name] ?? IconCode;
  return <IconComponent size={size} className={className} />;
}
