import React from "react";
import oidc from "oidc-client";
import config from "./config";

export interface IUserContext {
  id: string;
  name: string;
  accessToken: string;
  expiresAt: number;
  roles: string[];
  signinCallback: Function | null;
  signin: (
    id: string,
    name: string,
    accessToken: string,
    expiresAt: number,
    roles: string[]
  ) => void;
}

export const User: IUserContext = {
  id: "",
  name: "",
  accessToken: "",
  expiresAt: 0,
  roles: [],
  signinCallback: () => {},
  signin: function (
    id: string,
    name: string,
    accessToken: string,
    expiresAt: any,
    roles: string[]
  ): void {
    this.id = id;
    this.name = name;
    this.expiresAt = expiresAt;
    this.roles = roles;
    this.accessToken = accessToken;
    if (this.signinCallback) {
      this.signinCallback();
    }
  },
};

export const UserContext = React.createContext<IUserContext>(User);

export const mgr = new oidc.UserManager(config.ids4);
