import { app } from "@states/app";
import { apiClient } from "@utils/request";
import { useEffect } from "react";
import { toast } from "sonner";

export function useValidateUser() {
  useEffect(() => {
    apiClient("/user/check")
      .then(() => {
        app.authenticated = true;
        app.showSidebar = true;
      })
      .catch(() => {
        toast.error("请先登录");
        app.authenticated = false;
        app.showSidebar = false;
      });
  }, []);
}
