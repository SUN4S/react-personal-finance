import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLogoutUserMutation } from "../../services/user";
import { useNavigate } from "react-router";

export const LogoutButton = () => {
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
    <div>
      <i className="fa-solid fa-power-off" onClick={handleClick}></i>
    </div>
  );
};
