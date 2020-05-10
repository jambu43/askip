import { SET_NOTIFICATIONS, TOGGLE_NOTIFICATIONS_LOADING } from "../types/notification";

let initialState = {
  notifications: {},
  notifications_loading: false,
};

export const notificationReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NOTIFICATIONS:
      let setNotifications = {};
      payload.notifications.map((item) => {
        setNotifications[item.id] = item;
      });
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...setNotifications,
        },
      };
    case TOGGLE_NOTIFICATIONS_LOADING:
      return {
        ...state,
        notifications_loading: payload.isLoading,
      };
    default:
      return state;
  }
};
