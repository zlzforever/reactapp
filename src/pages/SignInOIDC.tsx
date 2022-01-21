// import img404 from "../assets/images/404.jpg";
import { useEffect } from "react";
import { mgr } from "../UserContext";
import { useNavigate } from "react-router-dom";

const SignInOIDC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    mgr.signinRedirectCallback().then((res) => {
      navigate(`/`);
    });
  }, [navigate]);

  //   const userInfoKey = `oidc.user:${config.ids4.authority}:${config.ids4.client_id}`;
  //   const userInfoJson = localStorage.getItem(userInfoKey);
  //   debugger;
  //   if (userInfoJson) {
  //     const user = JSON.parse(userInfoJson) as any;
  //     let timestamp = new Date().getTime() / 1000;
  //     if (!user.expiresTimestamp || timestamp > user.expiresTimestamp) {
  //       console.log("用户登录过期");
  //       localStorage.removeItem(userInfoKey);
  //       const mgr = new oidc.UserManager(config.ids4);
  //       mgr.signinRedirect();
  //     } else {
  //       userContext.updateUser(
  //         user.userId,
  //         user.userName,
  //         user.accessToken,
  //         user.expiresIn,
  //         user.roles
  //       );
  //     }
  //   } else {
  //     mgr.signinRedirect();
  //   }
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>登录中...</div>
  );
};

export default SignInOIDC;
