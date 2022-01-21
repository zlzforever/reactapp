import MenuItem from "./MenuItem";

const config = [
  {
    to: "maps",
    title: "地图资源",
    icon: "icon-tuceng",
    roles: [],
    children: [
      { to: "onemap", title: "地图", icon: "icon-ditu" },
      { to: "test", title: "测试", icon: "icon-ditu" },
    ],
  },
  { to: "index", title: "index", icon: "icon-ditu" },
  { to: "404", title: "404", icon: "icon-ditu" },
  { to: "500", title: "500", icon: "icon-ditu" },
  {
    to: "501",
    title: "501",
    icon: "icon-ditu",
    roles: [""],
  },
];

const filter = (roles: string[], items: Array<any>) => {
  console.log("roles: " + JSON.stringify(roles));
  const array: any[] = [];
  items.forEach((x) => {
    const item = {
      to: x.to,
      title: x.title,
      icon: x.icon,
      children: x.children,
    };
    if (
      !x.roles ||
      x.roles.length === 0 ||
      x.roles.some((y: string) => roles.indexOf(y) >= 0)
    ) {
      if (x.children && x.children.length > 0) {
        item.children = filter(roles, x.children);
      }
      array.push(item);
    }
  });
  return array;
};

export const filterByRoles = (roles: string[]): MenuItem[] => {
  return filter(roles, config);
};
