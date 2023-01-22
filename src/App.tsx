import clsx from "clsx";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/widgets/Sidebar";
import { AppRouter } from "./router/router";
import { apiClient } from "./utils/request";
import { Loading } from "./components/universal/Loading";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { app, server } from "./states/app";
import { Twindow } from "./components/universal/Twindow";
import { jump } from "@utils/path";

function App() {
  const appSnapshot = useSnapshot(app);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient("/ping")
      .then(() => {})
      .catch(() => {
        if (window.location.pathname != jump("/status")) {
          Twindow({
            title: "通信错误 - 跳转服务状态页",
            text: "无法与后端通信，请检查服务状态",
          });
          navigate(jump(jump("/status")));
        }
      })
      .then(() => {
        apiClient("/user/check")
          .then(() => {
            (window.location.pathname == jump("/") ||
              window.location.pathname == jump("/login") ||
              window.location.pathname == jump("/register")) &&
              navigate(jump("/dashboard"));
            app.authenticated = true;
            app.showSidebar = true;
          })
          .catch(() => {
            window.location.pathname != jump("/login") &&
              window.location.pathname != jump("/register") &&
              window.location.pathname != jump("/status") &&
              navigate(jump("/login"));
          });
        apiClient("/category").then((res) => {
          server.categories = res.data;
        });
        apiClient("/category?type=Tag").then((res) => {
          server.tags = res.data;
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("app", "loading", !loading && "loaded")}>
        {appSnapshot.showSidebar && <Sidebar />}
        <div className="inner">
          <AppRouter />
        </div>
      </div>
    </>
  );
}

export default App;
