import React from "react";
import { Outlet } from "react-router-dom";

interface EmptyProps {
  name?: string;
}

const Empty: React.FC<EmptyProps> = (props) => {
  console.log("render empty");
  return <div>{props.name}</div>;
};
export default Empty;
