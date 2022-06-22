import "./UserDropdown.scss";

import { Link } from "react-router-dom";

export const UserDropdown = (props: {
  openStatus: boolean;
  logoutFunction: Function;
}) => {
  return (
    <div className={`dropdown ${!props.openStatus && "collapsedDropdown"}`}>
      <ul>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li onClick={() => props.logoutFunction()}>Logout</li>
      </ul>
    </div>
  );
};
