import { taxiAdminNotificationRouteDescriptors } from './taxiAdminNotifications.constants';

export const taxiAdminNotificationRoutesMountedNow = false as const;

export function getTaxiAdminNotificationRouteDescriptors() {
  return taxiAdminNotificationRouteDescriptors;
}
