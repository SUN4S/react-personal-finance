import "./app.scss";
import "react-notifications-component/dist/theme.css";

import { Header } from "../Header";
import { MobileNav } from "../Navbar/mobileNav";
import Modal from "react-modal";
import { ModalComponent } from "../Modal";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Navbar";

Modal.setAppElement("#root");

export const App = () => {
  return (
    <>
      <div className="App">
        {window.innerWidth > 576 ? <Sidebar /> : <MobileNav />}
        <div className="contentContainer">
          <Header />
          <ModalComponent />
          <Outlet />
        </div>
      </div>
    </>
  );
};