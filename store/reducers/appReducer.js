const initialState = {
  showNotificationModal: false,
  showFavoriteModal: false,
  showSearchModal: false,
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "TOGGLE_NOTIFICATION_MODAL":
      return {
        showNotificationModal: payload
      };
      break;
    case "TOGGLE_FAVORITE_MODAL":
      return {
        showFavoriteModal: payload
      };
      break;
    case "TOGGLE_SEARCH_MODAL":
      return {
        showSearchModal: payload
      };
      break;
  }
  return state;
};
