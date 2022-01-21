import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className="footer" style={{ textAlign: "center" }}>
      Admin &copy; 2021 Created By 林和草
    </Footer>
  );
};
export default AppFooter;
