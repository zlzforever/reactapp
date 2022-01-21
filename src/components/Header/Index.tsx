import React, { Component } from "react";
import { Menu, Dropdown, Layout, Avatar } from "antd";
import IconFont from "../IconFont";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

interface HeaderProps {
  onToggle?: Function;
  avatar?: string;
  onLogout?: Function;
}

class Header extends Component<HeaderProps> {
  state = {
    collapsed: false,
  };
  menu = (
    <Menu>
      <Menu.ItemGroup title="用户设置">
        <Menu.Divider />
        <Menu.Item>
          <IconFont type="edit" />
          个人设置
        </Menu.Item>
        <Menu.Item>
          <IconFont type="setting" />
          系统设置
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item>
        <span
          onClick={() => {
            if (this.props.onLogout) {
              this.props.onLogout();
            }
          }}
        >
          <IconFont type="logout" /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  );

  toggle = () => {
    if (this.props.onToggle) {
      this.props.onToggle();
    }
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(
          this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: this.toggle,
          }
        )}
        <Dropdown
          overlay={this.menu}
          overlayStyle={{ width: "10rem" }}
          placement="bottomLeft"
        >
          <div
            style={{
              cursor: "pointer",
              float: "right",
              height: 64,
              width: 64,
            }}
          >
            <Avatar
              icon="user"
              alt="avatar"
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </Dropdown>
      </Layout.Header>
    );
  }
}

export default React.memo(Header);
