import axios from "axios";

let instance = axios.create({
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }
});

instance.interceptors.request.use(request => {
  return request;
});
export default instance;
