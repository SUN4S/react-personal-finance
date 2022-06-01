import "./sidebarList.scss";

import { NavLink } from "react-router-dom";

export const SidebarList = () => {
  return (
    <ul className="preload-transitions">
      <li className="preload-transitions">
        <NavLink to="/" className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Dashboard</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/history" className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">History</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/stocks" className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Stocks</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/weekly" className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Weekly</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/monthly" className="preload-transitions">
          <i className="fa-solid fa-table-columns"></i>
          <span className="preload-transitions">Monthly</span>
        </NavLink>
      </li>
    </ul>
  );
};
