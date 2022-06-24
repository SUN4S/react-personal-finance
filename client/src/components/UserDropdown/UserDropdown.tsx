import "./UserDropdown.scss";

import { Link } from "react-router-dom";

export const UserDropdown = (props: {
  openStatus: boolean;
  logoutFunction: Function;
}) => {
  return (
    <div
      id="dropdown"
      data-testid="dropdown"
      className={`${!props.openStatus && "collapsedDropdown"}`}
    >
      <ul>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button
            data-testid="logoutButton"
            onClick={() => props.logoutFunction()}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
