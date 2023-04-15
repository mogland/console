import { jump } from "@utils/path";
import { useNavigate } from "react-router-dom";
import { useInitialData } from "./useInitalData";
import { useValidateUser } from "./useValidateUser";

export function useAppCheck() {
  const navigate = useNavigate();
  useInitialData();
  const validateUser = useValidateUser();
  if (!validateUser.status) {
    if (validateUser.code === 401) {
      navigate(jump("/login"));
    } else {
      navigate(jump("/status"));
    }
  } else {
    navigate(jump("/dashboard"));
  }
}