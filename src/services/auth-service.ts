import { ForgotPasswordPayload, LoginPayload, RegisterPayload, UserPayload } from "../interfaces";
import ServicePath from "../constants/servicePath";
import { MakeWebRequest } from "./request-service";

export function login(loginPayload: LoginPayload) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.userServicePath +
    ServicePath.url.login;
  return MakeWebRequest({ method: "POST", endpoint, payload: loginPayload });
}

export function register(registerPayload: RegisterPayload) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.userServicePath +
    ServicePath.url.register;
  return MakeWebRequest({ method: "POST", endpoint, payload: registerPayload });
}

export function forgotPassword(forgotPasswordPayload: ForgotPasswordPayload) {
  const endpoint =
    ServicePath.url.base +
    ServicePath.url.userServicePath +
    ServicePath.url.forgotPassword;
  return MakeWebRequest({
    method: "POST",
    endpoint,
    payload: forgotPasswordPayload,
  });
}

export function updateAccount(updateAccountPayload: UserPayload, token: string) {
  const endpoint = ServicePath.url.base + ServicePath.url.userServicePath;
  return MakeWebRequest({
    method: "PUT",
    endpoint,
    token,
    payload: updateAccountPayload,
  });
}

export function deleteAccount(userId: string, token: string) {
  const endpoint =
    ServicePath.url.base + ServicePath.url.userServicePath + `/${userId}`;
  return MakeWebRequest({ method: "POST", endpoint, token });
}
