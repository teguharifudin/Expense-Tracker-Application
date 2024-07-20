import React from "react";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import { Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RightMenu = ({ mode }) => {
    const { logOutUser } = useContext(AuthContext);
    return (
        <Menu mode={mode}>
            <Menu.SubMenu
                title={
                <>
                    <Avatar icon={<UserOutlined />} />
                    <span className="username">John Doe</span>
                </>
                }
            >
                <Menu.Item key="profile">
                    <Link to="profile">
                    <UserOutlined /> Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <Link onClick={logOutUser}>
                    <LogoutOutlined /> Logout
                    </Link>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default RightMenu;