import React from "react";
import { Layout } from "antd";
import MenuItem from "../../menu/MenuItem";
import Menu from "../Menu/Index";

interface SiderProps {
  collapsed: boolean;
  menu: Array<MenuItem>;
}

const Sider: React.FC<SiderProps> = (props) => {
  return (
    <Layout.Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo" />
      <Menu menu={props.menu}></Menu>
    </Layout.Sider>
  );
};

export default Sider;
