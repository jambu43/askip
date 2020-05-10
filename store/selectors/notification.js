import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

let _getNotifications = (state) => state.notification.notifications;

export const getUnReadNotifications = createSelector([_getNotifications], (notifications) => {
  let notificationCollection = Object.values(notifications);
  return orderBy(
    notificationCollection.filter((item) => !parseInt(item.read)),
    "created_at",
    "desc"
  );
});
