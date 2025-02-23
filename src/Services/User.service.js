import http from "../http-common";

const get = () => {
  return http.get("/users");
}

const UserService = {
  get
}

export default UserService;