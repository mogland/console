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
    console.log("dark mode", isDark)
  }, [isDark, appSnapshot])

  useEffect(() => {
    apiClient("/user/check").then(() => {
      (window.location.pathname == '/' ||
        window.location.pathname == '/login')
        && navigate("/dashboard")
      app.showSidebar = true;
    }).catch(() => {
      navigate("/login")
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    apiClient("/category").then((res) => {
      server.categories = res.data
    })
  }, [])

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
