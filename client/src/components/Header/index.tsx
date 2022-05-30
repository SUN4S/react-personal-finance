import "./header.scss";

import defaultAvatar from "../../resources/images/default-image.jpg";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutUserMutation } from "../../services/user";
import { useNavigate } from "react-router";

export const Header = () => {
  const [logout] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    logout(null);
    dispatch(
      notification({
        title: "Logout",
        type: "success",
        message: "Successfully Logged Out",
      })
    );
    navigate("/login");
  };

  return (
    <header>
      <h4>John123</h4>
      <img src={defaultAvatar} alt="Avatar" />
      <div>
        <i className="fa-solid fa-power-off" onClick={handleClick}></i>
      </div>
    </header>
  );
};
