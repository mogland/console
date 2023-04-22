import clsx from "clsx";
import { Sidebar } from "./components/widgets/Sidebar";
import { AppRouter } from "./router/router";
import { useSnapshot } from "valtio";
import { app } from "./states/app";
import useSWR from "swr";
import { InternelServerErrorPage } from "@pages/InternelServerErrorPage";
import { useAppCheck } from "@hooks/useAppCheck";

function App() {
  const appSnapshot = useSnapshot(app);

  const { error: gatewayError } = useSWR("/ping");

  if (gatewayError) {
    return (
      <InternelServerErrorPage
        title={"Mog Gateway 错误"}
        description={
          "控制台似乎无法连接到 Mog 网关层，请检查 Mog 网关层的运行状态。"
        }
      />
    );
  }

  useAppCheck();
  
  return (
    <>
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
