
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { AppRouter } from './router'
import Sidebar from './components/widgets/Sidebar'
import sidebarStyle from './components/widgets/Sidebar/index.module.css'
function App() {

  return (
    <GeistProvider>
      <CssBaseline />
      <div className={sidebarStyle.hasSidebar}>
        <Sidebar />
        <AppRouter />
      </div>
    </GeistProvider>
  )
}

export default App
