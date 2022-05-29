import "./mobileNav.scss";

import { NavLink } from "react-router-dom";
import { toggleModal } from "../../../features/modal/ModalSlice";
import { useAppDispatch } from "../../../app/hooks";

export const MobileNav = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="mobileNav">
      <ul>
        <NavLink to="/">
          <li>
            <i className="fa-solid fa-table-columns"></i>
          </li>
        </NavLink>
        <NavLink to="/history">
          <li>
            <i className="fa-solid fa-table-columns"></i>
          </li>
        </NavLink>
        <li className="buttonContainer">
          <button
            onClick={() =>
              dispatch(toggleModal({ isOpen: true, editable: false }))
            }
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </li>
        <NavLink to="/stocks">
          <li>
            <i className="fa-solid fa-table-columns"></i>
          </li>
        </NavLink>
        <NavLink to="/monthly">
          <li>
            <i className="fa-solid fa-table-columns"></i>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};
