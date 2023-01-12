import clsx from "clsx";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/widgets/Sidebar";
import { AppRouter } from "./router/router";
import { apiClient } from "./utils/request";
import { Loading } from "./components/universal/Loading";

function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient("/user/check").catch(() => {
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <Loading loading={loading} />
      <div className={clsx("app", "loading", !loading && "loaded")}>
        <Sidebar />
        <div className="inner">
          <AppRouter />
        </div>
      </div>
    </>
  );
}

export default App;
