import { useInitialData } from "./useInitalData";
import { useValidateUser } from "./useValidateUser";

export function useAppCheck() {
  useInitialData();
  useValidateUser();
}
