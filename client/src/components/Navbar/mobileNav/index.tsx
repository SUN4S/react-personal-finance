import "./mobileNav.scss";

import { NavLink } from "react-router-dom";
import { toggleModal } from "../../../features/modal/ModalSlice";
import { useAppDispatch } from "../../../app/hooks";

export const MobileNav = () => {
  // Redux Toolkit finction to dispatch events
  const dispatch = useAppDispatch();

  return (
    <div className="mobileNav">
      <ul>
        <li>
          <NavLink to="/">
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
        <li className="buttonContainer">
          <button
            onClick={() =>
              dispatch(toggleModal({ isOpen: true, editable: false }))
            }
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </li>
        <li>
          <NavLink to="/stocks">
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/monthly">
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
