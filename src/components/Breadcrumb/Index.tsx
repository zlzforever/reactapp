import React from "react";
import { Breadcrumb as ABreadcrumb } from "antd";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  data: Array<Object>;
}
const Breadcrumb: React.FC<BreadcrumbProps> = (props) => (
  <ABreadcrumb style={{ margin: "16px 0" }}>
    <ABreadcrumb.Item>
      <Link to="/index">首页</Link>
    </ABreadcrumb.Item>
    {props.data &&
      props.data.map((res: any) => {
        if (typeof res === "object") {
          return (
            <ABreadcrumb.Item key={res.path}>
              <Link to={res.path}>{res.title}</Link>
            </ABreadcrumb.Item>
          );
        } else {
          return <ABreadcrumb.Item key={res}>{res}</ABreadcrumb.Item>;
        }
      })}
  </ABreadcrumb>
);

function propsAreEqual(nextProps: BreadcrumbProps, prevProps: BreadcrumbProps) {
  if (nextProps.data.join() === prevProps.data.join()) {
    return true;
  }
  return false;
}

export default React.memo(Breadcrumb, propsAreEqual);
