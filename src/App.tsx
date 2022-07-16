
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { AppRouter } from './router/router'
import Sidebar, { SidebarBtn } from './components/widgets/Sidebar'
import sidebarStyle from './components/widgets/Sidebar/index.module.css'
import { initSystem } from './hooks/use-system'
import { useEffect, useState } from 'react'
import { useMount } from 'react-use'
function App() {
  // initSystem()
  const [themeType, setThemeType] = useState('light')
  const [sidebar, setSidebar] = useState(true)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = (e: any) => {
    console.log(e.matches)
    if (e.matches) {
      setThemeType('dark')
    } else {
      setThemeType('light')
    }
  }
  useMount(() => {
    setThemeType(mediaQuery.matches ? 'dark' : 'light')
  })
  useEffect(() => {
    setSidebar(location.pathname !== "/init" && location.pathname !== "/register")
  }, [location.pathname])
  mediaQuery.addEventListener('change', handleChange)

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <div className={sidebarStyle.hasSidebar}>
        {
          location.pathname !== "/init" && <>
            <SidebarBtn />
            <Sidebar />
          </>
        }
        <AppRouter />
      </div>
    </GeistProvider>
  )
}

export default App
