import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="expense"><Link to="expense">Expense</Link></Menu.Item>
      <Menu.Item key="category"><Link to="category">Category</Link></Menu.Item>
    </Menu>
  );
};

export default LeftMenu;