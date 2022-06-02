import "./App.scss";
import "react-notifications-component/dist/theme.css";

import { Header } from "../Header/Header";
import { MobileNav } from "../MobileNav/MobileNav";
import Modal from "react-modal";
import { ModalComponent } from "../Modal/Modal";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Navbar/Navbar";

Modal.setAppElement("#root");

export const App = () => {
  return (
    <>
      <div className="App">
        {/* Check if screen is mobile-size, if it is, render mobileNav component */}
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
