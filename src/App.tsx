import clsx from "clsx";
import { Sidebar } from "./components/widgets/Sidebar";
import { AppRouter } from "./router/router";
import { useSnapshot } from "valtio";
import { app } from "./states/app";
import { Toaster } from "sonner";
import useSWR from "swr";
import { InternelServerErrorPage } from "@pages/InternelServerErrorPage";
import { useAppCheck } from "@hooks/useAppCheck";
// import { useAppCheck } from "@hooks/useAppCheck";

function App() {
  const appSnapshot = useSnapshot(app);

  const { error: gatewayError } = useSWR("/ping")
  if (gatewayError) return <InternelServerErrorPage />

  useAppCheck();
  
  return (
    <>
      <Toaster />
      <div className={clsx("app")}>
        {appSnapshot.showSidebar && <Sidebar />}
        <div className="inner">
          <AppRouter />
        </div>
      </div>
    </>
  );
}

export default App;
