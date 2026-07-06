import { HomeKernelService } from "./home-kernel.service";
import { HomeLayoutService } from "./home-layout.service";
import { HomeWidgetRegistryService } from "./home-widget-registry.service";

export function createHomeKernelContext() {
  const widgetRegistry = new HomeWidgetRegistryService();
  const layoutService = new HomeLayoutService();
  const kernel = new HomeKernelService(widgetRegistry, layoutService);

  return {
    widgetRegistry,
    layoutService,
    kernel,
  };
}

export type HomeKernelContext = ReturnType<typeof createHomeKernelContext>;

export const homeKernelContext = createHomeKernelContext();
