import "./Header.scss";

import { LogoutButton } from "../../components/LogoutButton/LogoutButton";
import { RootState } from "../../app/store";
import { ThemeSwitch } from "../../components/ThemeSwitch/ThemeSwitch";
import defaultAvatar from "../../resources/images/default-image.jpg";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutUserMutation } from "../../services/user";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const Header = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  // Redux toolkit api request to logout user
  const [logout] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  // function to be able to use redirects
  const navigate = useNavigate();

  // Function to handle user Logout
  const handleClick = () => {
    // Call funtion to logout user, takes 'null', for no reason
    // Redux toolkit api POST request take atleast 1 parameter
    logout(null);
    // Redux toolkit dispatch function to render notification
    dispatch(
      notification({
        title: "Logout",
        type: "success",
        message: "Successfully Logged Out",
      })
    );
    // Use navigate funtion to redirect user to login screen
    navigate("/login");
  };

  return (
    <header>
      <ThemeSwitch />
      <h4>{user.username || "placeholder"}</h4>
      <img
        src={defaultAvatar || `/resources/avatar_image/${user.image}`}
        alt="Avatar"
      />
      <LogoutButton onClick={handleClick} />
    </header>
  );
};
