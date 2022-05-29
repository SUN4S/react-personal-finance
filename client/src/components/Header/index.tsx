import "./header.scss";

import defaultAvatar from "../../resources/images/default-image.jpg";

export const Header = () => {
  return (
    <header>
      <h4>John123</h4>
      <img src={defaultAvatar} alt="Avatar" />
      <div>
        <i className="fa-solid fa-power-off"></i>
      </div>
    </header>
  );
};
