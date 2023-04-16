import { jump } from "@utils/path";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInitialData } from "./useInitalData";
import { useValidateUser } from "./useValidateUser";

export function useAppCheck() {
  const navigate = useNavigate();
  useInitialData();
  let path = ""
  const validateUser = useValidateUser();
  if (!validateUser.status) {
    if (validateUser.code === 401) {
      path = jump("/login")
    } else {
      path = jump("/status")
    }
  } else {
    path = jump("/dashboard")
  }
  useEffect(() => {
    navigate(path);
  }, [path, navigate]);
}