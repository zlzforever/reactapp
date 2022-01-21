import oidc from "oidc-client";

const config = {
  api: "http://localhost:8022/api",
  iconFont: "//at.alicdn.com/t/font_2393971_vmcwlq3vurg.js",
  ids4: {
    authority: "http://sts-yourdomain.com",
    client_id: "guoyoulinchang-web",
    redirect_uri: "http://yourdomain.com/signin-oidc",
    response_type: "id_token token",
    scope: "openid profile role your-api",
    post_logout_redirect_uri: "http://yourdomain.com/signout-callback-oidc",
    accessTokenExpiringNotificationTime: 10,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new oidc.WebStorageStateStore({ store: window.localStorage }),
    monitorSession: false,
    checkSessionInterval: 36000000,
  },
};

export default config;
