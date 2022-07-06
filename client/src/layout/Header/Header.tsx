import "./Header.scss";

import { useEffect, useRef } from "react";

import { IconDropdown } from "../../resources/icons/IconDropdown/IconDropdown";
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

  // State to handle if Dropdown menu is open
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  // Checking user data from store to see if custom avatar is set
  // If not, set state to undefined
  const [userImage, setUserImage] = useState<string | undefined>(
    user.image === null || user.image === undefined
      ? undefined
      : `${process.env.SERVER_URL}/resources/avatar_image/${user.image}`
  );

  useEffect(() => {
    // if User is updated, set user image to new/current image link
    setUserImage(
      `${process.env.SERVER_URL}/resources/avatar_image/${user.image}`
    );
  }, [user]);

  useEffect(() => {
    if (open) {
      window.addEventListener("mousedown", handleDropdownClick);
    } else if (!open) {
      window.removeEventListener("mousedown", handleDropdownClick);
    }
  }, [open]);

  const handleDropdownClick = () => {
    setOpen(false);
  };

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
        <img src={userImage || defaultAvatar} alt="Avatar" />
        <h4>{user.username || "placeholder"}</h4>
        <div
          data-testid="dropdownToggle"
          className={`dropdownArror ${open && "invertedArrow"}`}
          onClick={() => !open && setOpen(true)}
        >
          <IconDropdown />
        </div>
        <UserDropdown openStatus={open} logoutFunction={handleClick} />
      </div>
    </header>
  );
};
