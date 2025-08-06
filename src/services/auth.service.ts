import { IForgotPassword, ILogin, IRegister, IUser } from "../interfaces";
import ServicePath from "../constants/servicePath";
import { MakeWebRequest } from "./request.service";

const baseUrl = `${ServicePath.url.base}${ServicePath.url.userServicePath}`;

export function login(ILogin: ILogin) {
  const url = `${baseUrl}/${ServicePath.url.login}`;
  return MakeWebRequest({ method: "POST", url, payload: ILogin });
}

export function register(IRegister: IRegister) {
  const url = `${baseUrl}/${ServicePath.url.register}`;
  return MakeWebRequest({ method: "POST", url, payload: IRegister });
}

export function forgotPassword(IForgotPassword: IForgotPassword) {
  const url = `${baseUrl}/${ServicePath.url.forgotPassword}`;
  return MakeWebRequest({
    method: "POST",
    url,
    payload: IForgotPassword,
  });
}

export function updateAccount(updateAccountPayload: IUser, token: string) {
  const url = `${baseUrl}`;
  return MakeWebRequest({
    method: "PUT",
    url,
    token,
    payload: updateAccountPayload,
  });
}

export function deleteAccount(userId: string, token: string) {
  const url = `${baseUrl}/${userId}`;
  return MakeWebRequest({ method: "POST", url, token });
}
