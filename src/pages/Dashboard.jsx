import React from "react";
import withRouter from "../components/withRouter.js";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Overview from "../components/Overview";
import './dashboard.css';
import {AuthorizedUserCont, withAuthentication} from "../components/Session";
import AccessDenied from "./AccessDenied.jsx";
import { auth } from "../Firebase.js";


const Dashboard = () => {

  return (
    <AuthorizedUserCont.Consumer>
      { authUser => authUser ? (
        <>
      <Topbar />
      <div className="sidemenu-container">
        <Sidebar />
        <Overview authUser={authUser}/>
      </div>
      </>
      ) : (<AccessDenied />)
}
    </AuthorizedUserCont.Consumer>
  );
};

export default withRouter(withAuthentication(Dashboard));