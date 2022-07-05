import "./UserDropdown.scss";

import { Link } from "react-router-dom";

// Creates a dropdown list for user setting/logout
// used in page header
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
        <li data-testid="settingsLink">
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
