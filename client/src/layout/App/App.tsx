import "./App.scss";
import "react-notifications-component/dist/theme.css";

import { useEffect, useState } from "react";

import { Header } from "../Header/Header";
import { MobileNav } from "../MobileNav/MobileNav";
import Modal from "react-modal";
import { ModalComponent } from "../Modal/Modal";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";

Modal.setAppElement("#root");

// Container to display header/navigation
// App is used to display Non-changing layout
export const App = () => {
  // Get current witdh of display
  // Used to change between tablet/pc and mobile navigation
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Add an event listener to window to check if it gets resized
    window.addEventListener("resize", () => {
      // If window gets resized set state to new size
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
