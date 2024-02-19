import { Fragment } from "react";

import MainHeader from "./main-header";
import UserHeader from "./user-header";

function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <UserHeader/>
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
