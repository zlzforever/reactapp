// import img404 from "../assets/images/404.jpg";
import { useEffect } from "react";
import { mgr } from "../UserContext";
import { useNavigate } from "react-router-dom";

const SignOutOIDC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    mgr.signoutRedirectCallback().then((res) => {
      navigate(`/`);
    });
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>退出中...</div>
  );
};

export default SignOutOIDC;
