import "./DeleteContainer.scss";

import { Button } from "../../components/Button/Button";
import { notification } from "../../features/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useDeleteUserMutation } from "../../services/user";
import { useNavigate } from "react-router";

export const DeleteContainer = () => {
  // Redux Toolkit api request
  const [deleteUser] = useDeleteUserMutation();

  // Redux reducer dispatch
  const dispatch = useAppDispatch();

  // react router redirect function
  const navigate = useNavigate();

  const handleClick = async () => {
    if (confirm("Are you sure you want to Delete your Account")) {
      // Calling Redux Toolkit api to delete user
      const response: any = await deleteUser(null);
      if (response.data) {
        // If response goes throught
        // Redirect user to login page
        navigate("/login");
        // Dispatch Redux Toolkit function to generate notification
        dispatch(
          notification({
            title: "Delete User",
            message: response.data.msg,
            type: "success",
          })
        );
      } else if (response.error) {
        // If response fails
        // Dispatch Redux Toolkit function to generate notification
        dispatch(
          notification({
            title: "Delete User",
            message: "Something Went Wrong",
            type: "danger",
          })
        );
      }
    }
  };

  return (
    <div id="deleteContainer">
      <h3>Delete Account</h3>
      <Button
        type="button"
        text="Delete Account"
        class="dangerBtn"
        testId="deleteUser"
        action={handleClick}
      />
    </div>
  );
};
