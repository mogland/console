import { app } from "@states/app";
import { jump } from "@utils/path";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { useInitialData } from "./useInitalData";
import { useValidateUser } from "./useValidateUser";

export function useAppCheck() {
  const navigate = useNavigate();
  const appSnapshot = useSnapshot(app);

  const path = useMemo(() => {
    if (!appSnapshot.authenticated) {
      app.authenticated = false;
      return jump("/login");
    } else if (window.location.pathname === jump("/")) {
      return jump("/dashboard");
    } else {
      return "";
    }
  }, [appSnapshot.authenticated]);

  useInitialData();
  useValidateUser();

  useEffect(() => {
    if (path.length) {
      navigate(path);
    }
  }, [path, navigate]);
}
