import "./sidebarList.scss";

import { NavLink } from "react-router-dom";

export const SidebarList = () => {
  return (
    <ul className="preload-transitions">
      <NavLink to="/">
        <li className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Dashboard</span>
        </li>
      </NavLink>
      <NavLink to="/history">
        <li className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">History</span>
        </li>
      </NavLink>
      <NavLink to="/stocks">
        <li className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Stocks</span>
        </li>
      </NavLink>
      <NavLink to="/weekly">
        <li className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Weekly</span>
        </li>
      </NavLink>
      <NavLink to="/monthly">
        <li className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Monthly</span>
        </li>
      </NavLink>
    </ul>
  );
};
