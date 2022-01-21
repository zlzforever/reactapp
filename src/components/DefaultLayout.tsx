import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";

import "antd/dist/antd.css";
import "./DefaultLayout.css";

import Header from "./Header/Index";
import Sider from "./Sider/Index";
import Footer from "./Footer/Index";
import routes from "../router/routes";
import React from "react";
import Breadcrumb from "./Breadcrumb/Index";
import MenuItem from "../menu/MenuItem";

const { Content } = Layout;

interface LayoutProps {
  menu: MenuItem[];
}

class DefaultLayout extends React.Component<LayoutProps> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderRoute = (route: any) => {
    console.log("render menu");
    if (route.children && route.children.length > 0) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((x: any) => {
            return this.renderRoute(x);
          })}
        </Route>
      );
    } else {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        ></Route>
      );
    }
  };

  render() {
    return (
      <Layout
        style={{
          height: "100%",
        }}
      >
        <Sider collapsed={this.state.collapsed} menu={this.props.menu}></Sider>
        <Layout className="site-layout">
          <Header onToggle={this.toggle}></Header>
          <Content style={{ padding: "0 20px" }}>
            <Breadcrumb data={["xxx"]}></Breadcrumb>
            <div className="site-layout-content">
              <Routes>
                {routes.map((route: any) => {
                  return this.renderRoute(route);
                })}
              </Routes>
            </div>
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    );
  }
}

// const stateToProp = (state) => ({
//   menuToggle: state.menuToggle,
// });

// const dispatchToProp = (dispatch) => ({
//   menuClick() {
//     dispatch(menuToggleAction());
//   },
// });

export default DefaultLayout;
