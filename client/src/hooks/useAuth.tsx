import { useEffect, useState } from "react";

import { useIsLoggedInQuery } from "../services/user";

export const useAuth = () => {
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
