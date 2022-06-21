import "./UserDropdown.scss";

import { Link } from "react-router-dom";

export const UserDropdown = (props: {
  openStatus: boolean;
  logoutFunction: Function;
}) => {
  const handleClick = () => {
    props.logoutFunction();
  };

  return (
    <div className={`dropdown ${!props.openStatus && "collapsedDropdown"}`}>
      <ul>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li onClick={handleClick}>Logout</li>
      </ul>
    </div>
  );
};
