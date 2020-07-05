import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import {
  SET_NOTIFICATIONS,
  TOGGLE_NOTIFICATIONS_LOADING,
  MARK_NOTIFICATION_AS_READ,
} from "../types/notification";
import { setUserData } from "./auth";
import { reject } from "lodash";

export const setNotifications = (notifications, clearFirst = false) => {
  return {
    type: SET_NOTIFICATIONS,
    payload: {
      notifications,
      clearFirst,
    },
  };
};

const toggleNotificationsLoading = (isLoading) => {
  return {
    type: TOGGLE_NOTIFICATIONS_LOADING,
    payload: {
      isLoading,
    },
  };
};

const _markNotificationAsRead = (notification_id) => {
  return {
    type: MARK_NOTIFICATION_AS_READ,
    payload: {
      notification_id,
    },
  };
};

export const fetchNotifications = (page = 1) => {
  return (dispatch) => {
    dispatch(toggleNotificationsLoading(true));
    axios
      .get(apiUrl(`profile/notifications?page=${page}`))
      .then(({ data }) => {
        dispatch(setNotifications(data.data));
        dispatch(toggleNotificationsLoading(false));
      })
      .catch(({ response }) => {
        dispatch(toggleNotificationsLoading(false));
      });
  };
};

export const markNotificationAsRead = (notification_id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`profile/mark_notification_as_read/${notification_id}`))
        .then(({ data }) => {
          dispatch(setUserData(data));
          dispatch(_markNotificationAsRead(notification_id));
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          reject();
        });
    });
  };
};
