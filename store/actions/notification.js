import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import { SET_NOTIFICATIONS, TOGGLE_NOTIFICATIONS_LOADING } from "../types/notification";
import { setUserData } from "./auth";

const setNotifications = (notifications) => {
  return {
    type: SET_NOTIFICATIONS,
    payload: {
      notifications,
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

export const fetchNotifications = (page = 1) => {
  return (dispatch) => {
    dispatch(toggleNotificationsLoading(true));
    axios
      .get(apiUrl("profile/notifications"))
      .then(({ data }) => {
        dispatch(setNotifications(data.data));
        dispatch(toggleNotificationsLoading(false));
      })
      .catch(({ response }) => {
        console.log("fetchNotifications", response);
        dispatch(toggleNotificationsLoading(false));
      });
  };
};

export const markNotificationAsRead = (notification_id) => {
  return (dispatch) => {
    axios
      .post(apiUrl(`profile/mark_notification_as_read/${notification_id}`))
      .then(({ data }) => {
        dispatch(setUserData(data));
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
};
