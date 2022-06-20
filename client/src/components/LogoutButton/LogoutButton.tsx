import "./LogoutButton.scss";

import { IconLogout } from "../Icons/IconLogout/IconLogout";

export const LogoutButton = (props: { onClick: Function }) => {
  const handleClick = async () => {
    await props.onClick();
  };

  return (
    <div id="logoutContainer" onClick={handleClick}>
      <IconLogout />
    </div>
  );
};
