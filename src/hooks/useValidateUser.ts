import { app } from "@states/app";
import { jump } from "@utils/path";
import { apiClient } from "@utils/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useValidateUser() {
  const navigate = useNavigate();
  useEffect(() => {
    apiClient("/user/check")
      .then(() => {
        app.authenticated = true;
        app.showSidebar = true;
        if (window.location.pathname === jump("/")) {
          navigate(jump("/dashboard"));
        }
      })
      .catch(() => {
        navigate(jump("/login"));
        app.authenticated = false;
        app.showSidebar = false;
        toast.error("请先登录");
      });
  }, []);
}
