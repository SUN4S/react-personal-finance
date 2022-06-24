import "./MobileNavList.scss";

import { IconDashboard } from "../../resources/icons/IconDashboard/IconDashboard";
import { IconHistory } from "../../resources/icons/IconHistory/IconHistory";
import { IconStock } from "../../resources/icons/IconStock/IconStock";
import { IconWeekly } from "../../resources/icons/IconWeekly/IconWeekly";
import { NavLink } from "react-router-dom";

export const MobileNavList = (props: { onClick: Function }) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className="mobileNav">
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
          <button onClick={handleClick}>+</button>
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
