import "./MobileNavList.scss";

import { IconDashboard } from "../../resources/icons/IconDashboard/IconDashboard";
import { IconHistory } from "../../resources/icons/IconHistory/IconHistory";
import { IconStock } from "../../resources/icons/IconStock/IconStock";
import { IconWeekly } from "../../resources/icons/IconWeekly/IconWeekly";
import { NavLink } from "react-router-dom";

export const MobileNavList = (props: { clickFunction: Function }) => {
  return (
    <div className="mobileNav" data-testid="mobileNavList">
      <ul>
        <li>
          <NavLink to="/">
            <div className="logoContainer">
              <IconDashboard />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            <div className="logoContainer">
              <IconHistory />
            </div>
          </NavLink>
        </li>
        <li className="buttonContainer">
          <button
            aria-label="Mobile Navigation Button"
            data-testid="mobileNavListButton"
            onClick={() => props.clickFunction()}
          >
            +
          </button>
        </li>
        <li>
          <NavLink to="/stocks">
            <div className="logoContainer">
              <IconStock />
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/weekly">
            <div className="logoContainer">
              <IconWeekly />
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
