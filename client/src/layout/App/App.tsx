import "./App.scss";
import "react-notifications-component/dist/theme.css";

import { useEffect, useState } from "react";

import { Header } from "../Header/Header";
import { MobileNav } from "../MobileNav/MobileNav";
import Modal from "react-modal";
import { ModalComponent } from "../Modal/Modal";
import { Outlet } from "react-router-dom";
import { RootState } from "../../app/store";
import { Sidebar } from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

export const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);
  return (
    <>
      <div className="App">
        {/* Check if screen is mobile-size, if it is, render mobileNav component */}
        {windowWidth > 576 ? <Sidebar /> : <MobileNav />}
        <main className="contentContainer">
          <Header />
          <ModalComponent />
          <Outlet />
        </main>
      </div>
    </>
  );
};
