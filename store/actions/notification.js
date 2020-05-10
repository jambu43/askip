import axios from "../../config/axios";
import { apiUrl } from "../../helpers";

export const fetchNotifications = (page = 1) => {
  return (dispatch) => {
    axios
      .get(apiUrl("profile/notifications"))
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
};

export const markNotificationAsRead = (notification_id) => {
  return (dispatch) => {
    axios
      .post(apiUrl(`mark_notification_as_read/${notification_id}`))
      .then(({ data }) => {
        //TODO
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
};
