import "./sidebarList.scss";

import { NavLink } from "react-router-dom";

export const SidebarList = () => {
  return (
    <ul className="preload-transitions">
      <li className="preload-transitions">
        <NavLink to="/">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Dashboard</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/history">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">History</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/stocks">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Stocks</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/weekly">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Weekly</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/monthly">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Monthly</span>
        </NavLink>
      </li>
    </ul>
  );
};
