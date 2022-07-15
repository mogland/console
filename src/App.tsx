
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { AppRouter } from './router/router'
import Sidebar, { SidebarBtn } from './components/widgets/Sidebar'
import sidebarStyle from './components/widgets/Sidebar/index.module.css'
import { initSystem } from './hooks/use-system'
function App() {
  initSystem()
  return (
    <GeistProvider>
      <CssBaseline />
      <div className={sidebarStyle.hasSidebar}>
        <SidebarBtn />
        <Sidebar />
        <AppRouter />
      </div>
    </GeistProvider>
  )
}

export default App
