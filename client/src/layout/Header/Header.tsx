import "./Header.scss";

import { RootState } from "../../app/store";
import { ThemeSwitch } from "../../components/ThemeSwitch/ThemeSwitch";
import defaultAvatar from "../../resources/images/default-image.jpg";
import { useSelector } from "react-redux";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";

export const Header = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  return (
    <header>
      <ThemeSwitch />
      <h4>{user.username || "placeholder"}</h4>
      <img
        src={defaultAvatar || `/resources/avatar_image/${user.image}`}
        alt="Avatar"
      />
      <LogoutButton />
    </header>
  );
};
