import "./Header.scss";

import { IconDropdown } from "../../components/Icons/IconDropdown/IconDropdown";
import { RootState } from "../../app/store";
import { ThemeSwitch } from "../../components/ThemeSwitch/ThemeSwitch";
import { UserDropdown } from "../../components/UserDropdown/UserDropdown";
import defaultAvatar from "../../resources/images/default-image.jpg";
import { notification } from "../../features/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutUserMutation } from "../../services/user";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

export const Header = () => {
  // Getting user data from redux store
  const user = useSelector((state: RootState) => state.user.userData);

  // Custom Hook Call to handle Theme change
  const { currentTheme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

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

  // Function that handles theme change
  // Inverts selected option,
  const handleThemeChange = () => {
    console.log("Clicked");
    if (currentTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <header>
      <ThemeSwitch theme={currentTheme} clickFunction={handleThemeChange} />
      <div className="userContainer">
        <img
          src={defaultAvatar || `/resources/avatar_image/${user.image}`}
          alt="Avatar"
        />
        <h4>{user.username || "placeholder"}</h4>
        <div
          className={`dropdownArror ${open && "invertedArrow"}`}
          onClick={() => setOpen(!open)}
        >
          <IconDropdown />
        </div>
        <UserDropdown openStatus={open} logoutFunction={handleClick} />
      </div>
    </header>
  );
};
