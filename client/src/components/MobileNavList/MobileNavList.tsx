import { NavLink } from "react-router-dom";
import "./MobileNavList.scss";

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
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/history">
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
        <li className="buttonContainer">
          <button onClick={handleClick}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </li>
        <li>
          <NavLink to="/stocks">
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
        <li>
          <NavLink to="/monthly">
            <i className="fa-solid fa-table-columns"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
