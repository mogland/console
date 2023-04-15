import { app } from "@states/app";
import useSWR from "swr";

export function useValidateUser() {
  const { error } = useSWR("/user/check");
  if (error) {
    return {
      status: false,
      code: error.response.status,
    }
  }
  app.authenticated = true;
  app.showSidebar = true;
  return {
    status: true,
    code: 200,
  }
}