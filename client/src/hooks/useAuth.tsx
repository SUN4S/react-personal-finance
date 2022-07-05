import { useIsLoggedInQuery } from "../services/user";

// Function to check if user is logged in or not
export const useAuth = () => {
  // call rtk query to get user status
  const { isSuccess } = useIsLoggedInQuery({});

  const getStatus = () => {
    if (isSuccess) {
      return true;
    } else {
      return false;
    }
  };

  return { getStatus };
};
