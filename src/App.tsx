import clsx from "clsx";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/widgets/Sidebar";
import { AppRouter } from "./router/router";
import { apiClient } from "./utils/request";
import { Loading } from "./components/universal/Loading";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { app, server } from "./states/app";
import { useMedia } from "react-use";
import { Twindow } from "./components/universal/Twindow";

function App() {
  const appSnapshot = useSnapshot(app)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const isDark = useMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (isDark && !appSnapshot.editorDarkCSSLoaded) {
      import('@toast-ui/editor/dist/theme/toastui-editor-dark.css').then(() => {
        app.editorDarkCSSLoaded = true;
      })
    }
  }, [isDark, appSnapshot])

  useEffect(() => {
    apiClient("/ping").then(() => {
    }).catch(() => {
      if (window.location.pathname != '/status') {
        Twindow({
          title: "通信错误 - 跳转服务状态页",
          text: "无法与后端通信，请检查服务状态"
        })
        navigate("/status")
      }
    })
      .then(() => {
        apiClient("/user/check").then(() => {
          (window.location.pathname == '/' ||
            window.location.pathname == '/login' ||
            window.location.pathname == '/register' ||
            window.location.pathname == '/status')
            && navigate("/dashboard")
          app.authenticated = true;
        }).catch(() => {
          (window.location.pathname != '/' &&
            window.location.pathname != '/login' &&
            window.location.pathname != '/register' &&
            window.location.pathname != '/status')
            && navigate("/login")
        })
        apiClient("/category").then((res) => {
          server.categories = res.data
        })
        apiClient("/category?type=Tag")
          .then(res => {
            server.tags = res.data
          })
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
  }, [appSnapshot.authenticated])

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("app", "loading", !loading && "loaded")}>
        {
          appSnapshot.showSidebar && <Sidebar />
        }
        <div className="inner">
          <AppRouter />
        </div>
      </div>
    </>
  );
}

export default App;
