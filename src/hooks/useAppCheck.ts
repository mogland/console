import { app } from "@states/app";
import { useInitialData } from "./useInitalData";
import { useValidateUser } from "./useValidateUser";
import useSWR from "swr";

export function useAppCheck() {
  const { error: gatewayError } = useSWR("/ping");
  app.gatewayError = !!gatewayError;

  useInitialData();
  useValidateUser();
}
