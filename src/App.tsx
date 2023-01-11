import { Sidebar } from "./components/widgets/Sidebar";
import { AppRouter } from "./router/router";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="inner">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
