import {
  SET_NOTIFICATIONS,
  TOGGLE_NOTIFICATIONS_LOADING,
  MARK_NOTIFICATION_AS_READ,
} from "../types/notification";

let initialState = {
  notifications: {},
  notifications_loading: false,
};

export const notificationReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NOTIFICATIONS:
      let setNotifications = {};
      let oldNotifications = payload.clearFirst ? {} : state.notifications;
      payload.notifications.map((item) => {
        setNotifications[item.id] = item;
      });
      return {
        ...state,
        notifications: {
          ...oldNotifications,
          ...setNotifications,
        },
      };
    case TOGGLE_NOTIFICATIONS_LOADING:
      return {
        ...state,
        notifications_loading: payload.isLoading,
      };
    case MARK_NOTIFICATION_AS_READ: {
      let setNotifications = {};

      Object.values(state.notifications).map((item) => {
        if (payload.notification_id == item.id) {
          setNotifications[item.id] = {
            ...item,
            read: true,
          };
        }

        setNotifications[item.id] = item;
      });

      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...setNotifications,
        },
      };
    }
    default:
      return state;
  }
};
