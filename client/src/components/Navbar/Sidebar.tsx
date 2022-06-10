import "./Sidebar.scss";

import { useEffect, useState } from "react";

import { Button } from "../Button/Button";
import Logo from "../../resources/icons/Logo.svg";
import { SidebarList } from "../SidebarList/SidebarList";
import { toggleModal } from "../../features/modal/ModalSlice";
import { useAppDispatch } from "../../app/hooks";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [collapseButton, setCollapseButton] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // This is used only on load to remove animations
  // There was a 'bug' where on load, collapse animation would always play
  // this had no effect on mobile or larger screens, but tablet size screens
  // would always play collaps animation on load
  // TODO: Might be able to resolve this with css,
  useEffect(() => {
    setTimeout(() => {
      // Finds all elements with this class and removes it after 0.2s
      const node = document.querySelectorAll(".preload-transitions");
      node.forEach((item) => item.classList.remove("preload-transitions"));
      setFirstLoad(false);
    }, 200);
    if (window.innerWidth <= 1024) {
      setCollapsed(true);
      setCollapseButton(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1024) {
        setCollapsed(true);
        setCollapseButton(true);
      } else {
        setCollapsed(false);
        setCollapseButton(false);
      }
    });
  }, []);

  return (
    <nav
      className={`${firstLoad ? "preload-transitions " : ""}${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className="sidebarLogo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="buttonContainer preload-transitions">
        <Button
          type="button"
          text="+"
          class="primaryBtn preload-transitions"
          action={() =>
            dispatch(toggleModal({ isOpen: true, editable: false }))
          }
        />
        <span className="preload-transitions">Add Expense</span>
      </div>

      <div className="sidebarPages preload-transitions">Pages</div>
      <SidebarList />
      {collapseButton && (
        <button
          className="collapseButton"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
      )}
    </nav>
  );
};
