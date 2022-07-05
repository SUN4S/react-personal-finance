import "./SidebarList.scss";

import { IconDashboard } from "../../resources/icons/IconDashboard/IconDashboard";
import { IconHistory } from "../../resources/icons/IconHistory/IconHistory";
import { IconMonthly } from "../../resources/icons/IconMonthly/IconMonthly";
import { IconStock } from "../../resources/icons/IconStock/IconStock";
import { IconWeekly } from "../../resources/icons/IconWeekly/IconWeekly";
import { NavLink } from "react-router-dom";

// Generates tablet/pc navigation list
export const SidebarList = () => {
  return (
    <ul className="preload-transitions" data-testid="sidebarList">
      <li className="preload-transitions">
        <NavLink to="/">
          <div className="iconContainer">
            <IconDashboard />
          </div>
          <span className="preload-transitions">Dashboard</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/history">
          <div className="iconContainer">
            <IconHistory />
          </div>
          <span className="preload-transitions">History</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/stocks">
          <div className="iconContainer">
            <IconStock />
          </div>
          <span className="preload-transitions">Stocks</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/weekly">
          <div className="iconContainer">
            <IconWeekly />
          </div>
          <span className="preload-transitions">Weekly</span>
        </NavLink>
      </li>
      <li className="preload-transitions">
        <NavLink to="/monthly">
          <div className="iconContainer">
            <IconMonthly />
          </div>
          <span className="preload-transitions">Monthly</span>
        </NavLink>
      </li>
    </ul>
  );
};
