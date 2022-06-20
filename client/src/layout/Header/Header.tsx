import "./Header.scss";

import { useEffect, useRef, useState } from "react";

import { IconDropdown } from "../../components/Icons/IconDropdown/IconDropdown";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { ThemeSwitch } from "../../components/ThemeSwitch/ThemeSwitch";
import defaultAvatar from "../../resources/images/default-image.jpg";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutUserMutation } from "../../services/user";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const Header = () => {
  // Getting user data from redux store
  const user = useSelector((state: RootState) => state.user.userData);

  const [open, setOpen] = useState(false);
  const node = useRef<HTMLDivElement>(null);
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

  // Inverts dropdown status value
  const handleDropdownClick = () => {
    setOpen(!open);
  };

  // Handling click outside of container
  const clickOutside = (e: MouseEvent) => {
    if (node.current && node.current.contains(e.target as HTMLElement)) {
      return;
    } else {
      document.removeEventListener("mousedown", clickOutside);
      setOpen(false);
    }
  };

  // Look for change in dropdown status
  useEffect(() => {
    // Initializes an event listener to handle outside click
    document.addEventListener("mousedown", clickOutside);
  }, [open]);

  return (
    <header>
      <ThemeSwitch />
      <div className="userContainer">
        <img
          src={defaultAvatar || `/resources/avatar_image/${user.image}`}
          alt="Avatar"
        />
        <h4>{user.username || "placeholder"}</h4>
        <div className="dropdownArror" onClick={handleDropdownClick}>
          <IconDropdown />
        </div>
        <div className="dropdown" ref={node}>
          {open && (
            <ul>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li onClick={handleClick}>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
