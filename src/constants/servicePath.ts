import Environments  from "./environments";

export default {
  url: {
    base: Environments.isProduction
      ? Environments.productionUrl
      : Environments.stagingUrl,
    userServicePath: "api/users",
    postServicePath: "api/posts",
    commentServicePath: "api/comments",
    login: "login",
    register: "register",
    forgotPassword: "forgot-password",
  },
};
