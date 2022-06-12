import "./App.scss";
import "react-notifications-component/dist/theme.css";

import { Header } from "../Header/Header";
import { MobileNav } from "../MobileNav/MobileNav";
import Modal from "react-modal";
import { ModalComponent } from "../Modal/Modal";
import { Outlet } from "react-router-dom";
import { RootState } from "../../app/store";
import { Sidebar } from "../Navbar/Sidebar";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

export const App = () => {
  const modalStatus = useSelector((state: RootState) => state.modal.isOpen);

  return (
    <>
      <div className="App">
        {/* Check if screen is mobile-size, if it is, render mobileNav component */}
        {window.innerWidth > 576 ? <Sidebar /> : <MobileNav />}
        <main className="contentContainer">
          <Header />
          <ModalComponent openStatus={modalStatus} />
          <Outlet />
        </main>
      </div>
    </>
  );
};
