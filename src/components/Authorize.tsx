import oidc from "oidc-client";
import config from "../config";
import { useContext } from "react";
import { UserContext, mgr } from "../UserContext";

function Authorize({ children }: { children: JSX.Element }) {
  const userContext = useContext(UserContext);
  mgr.getUser().then((user) => {
    if (!user) {
      const mgr = new oidc.UserManager(config.ids4);
      mgr.signinRedirect();
    } else {
      userContext.signin(
        user.profile.sub,
        user.profile.name ? user.profile.name : "",
        user.access_token,
        user.expires_at,
        user.profile.role.split(" ")
      );
    }
  });

  return children;
}
export default Authorize;
