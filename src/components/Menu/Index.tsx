import { Component } from "react";
import { Menu as AMenu } from "antd";
import { Link } from "react-router-dom";
import IconFont from "../IconFont";
import MenuItem from "../../menu/MenuItem";

interface MenuProps {
  menu: Array<MenuItem>;
}

class Menu extends Component<MenuProps> {
  state = {
    openKeys: [],
    selectedKeys: [],
  };

  // 处理 pathname
  getOpenKeys = (keys: string) => {
    let newStr = "",
      newArr = [],
      arr = keys.split("/").map((i) => "/" + i);
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i];
      newArr.push(newStr);
    }
    return newArr;
  };

  // setSelectedKeys([pathname]);
  // setOpenKeys(getOpenKeys(pathname));

  // 点击面包屑导航时 侧边栏同步响应
  // componentDidUpdate(prevProps: any, prevState: any) {
  //   //let pathname = useLocation().pathname;
  //   if (prevProps.location.pathname !== pathname) {
  //     this.setState({
  //       selectedKeys: [pathname],
  //       openKeys: this.getOpenKeys(pathname),
  //     });
  //   }
  // }

  // 只展开一个 SubMenu
  onOpenChange = (openKeys: string[]) => {
    let keys = [] as string[];
    if (openKeys.length === 0 || openKeys.length === 1) {
      keys = openKeys;
    } else {
      // 最新展开的 SubMenu
      const lastKey = openKeys[openKeys.length - 1];

      // 这里与定义的路由规则有关
      if (lastKey.includes(openKeys[0])) {
        keys = openKeys;
      } else {
        keys = [lastKey];
      }
    }

    this.setState({
      openKeys: keys,
    });
  };

  renderMenu = (item: any) => {
    console.log("render menu");
    if (item.children && item.children.length > 0) {
      return (
        <AMenu.SubMenu
          key={item.to}
          title={
            <>
              {item.icon && <IconFont type={item.icon} />}
              <span>{item.title}</span>
            </>
          }
        >
          {item.children.map((x: any) => {
            return this.renderMenu(x);
          })}
        </AMenu.SubMenu>
      );
    } else {
      return (
        <AMenu.Item key={item.to}>
          {item.icon && <IconFont type={item.icon} />}
          <Link style={{ marginLeft: 10 }} to={item.to}>
            {item.title}
          </Link>
        </AMenu.Item>
      );
    }
  };

  render() {
    return (
      <AMenu
        mode="inline"
        theme="dark"
        openKeys={this.state.openKeys}
        selectedKeys={this.state.selectedKeys}
        onClick={({ key }) => {
          this.setState({
            selectedKeys: [key],
          });
        }}
        onOpenChange={this.onOpenChange}
      >
        {this.props.menu &&
          this.props.menu.map((item: any) => {
            return this.renderMenu(item);
          })}
      </AMenu>
    );
  }
}

// function propsAreEqual(nextProps: MenuProps, prevProps: MenuProps) {
//   if (nextProps.menu.join() === prevProps.menu.join()) {
//     return true;
//   }
//   return false;
// }

export default Menu;
