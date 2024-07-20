import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);

  return (
    <nav>
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <h3 className="brand-font">ETA</h3>
          </div>
          <div className="navbar-menu">

            {isLoggedIn ? (
                <>
                <div className="leftMenu">
                  <LeftMenu mode={"horizontal"} />
                </div>
                <Button className="menuButton" type="text" onClick={showDrawer}>
                  <MenuOutlined />
                </Button>
                <div className="rightMenu">
                  <RightMenu mode={"horizontal"} />
                </div>

                <Drawer
                  title={"Navigation"}
                  placement="right"
                  closable={true}
                  onClose={showDrawer}
                  visible={visible}
                  style={{ zIndex: 99999 }}
                >
                  <LeftMenu mode={"inline"} />
                  <RightMenu mode={"inline"} />
                </Drawer>
                </>
            ) :(
                <>
                </>
            )}

            
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
