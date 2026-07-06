import { DEFAULT_HOME_WIDGETS } from "./home.defaults";
import { normalizeWidgetDefinition } from "./home.validation";
import type { HomeWidgetDefinition } from "./home.types";

export class HomeWidgetRegistryService {
  private readonly storage = new Map<string, HomeWidgetDefinition>();

  constructor(initial: readonly HomeWidgetDefinition[] = DEFAULT_HOME_WIDGETS) {
    for (const widget of initial) {
      const normalized = normalizeWidgetDefinition(widget);
      this.storage.set(normalized.id, normalized);
    }
  }

  list() {
    return Array.from(this.storage.values()).sort((left, right) => {
      const leftPriority = left.priority ?? Number.MAX_SAFE_INTEGER;
      const rightPriority = right.priority ?? Number.MAX_SAFE_INTEGER;
      return leftPriority - rightPriority || left.id.localeCompare(right.id);
    });
  }

  findById(widgetId: string) {
    return this.storage.get(widgetId) ?? null;
  }

  registerMany(widgets: readonly HomeWidgetDefinition[]) {
    for (const widget of widgets) {
      const normalized = normalizeWidgetDefinition(widget);
      if (!normalized.id || !normalized.title) {
        continue;
      }
      this.storage.set(normalized.id, normalized);
    }

    return this.list();
  }
}
