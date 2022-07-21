
import { CssBaseline, GeistProvider } from '@geist-ui/core'
import { AppRouter } from './router/router'
import Sidebar, { SidebarBtn } from './components/widgets/Sidebar'
import sidebarStyle from './components/widgets/Sidebar/index.module.css'
import { initSystem } from './hooks/use-system'
import { useEffect, useState } from 'react'
import { useMount } from 'react-use'
import { apiClient } from './utils/request'
import { A_MINUTE_MS } from './constant/time.constant'
import { message } from 'react-message-popup'
function App() {
  // initSystem()
  const [themeType, setThemeType] = useState('light')
  const [sidebar, setSidebar] = useState(true)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = (e: any) => {
    // console.log(e.matches)
    if (e.matches) {
      setThemeType('dark')
    } else {
      setThemeType('light')
    }
  }
  useMount(() => {
    setThemeType(mediaQuery.matches ? 'dark' : 'light')
    apiClient.get('/master/check_logged').catch((err) => {
      message.error(err.message)
      console.log(err)
      if (window.location.pathname === '/init-system' || window.location.pathname === '/login') return
      window.location.href = '/login'
    })
  })
  setInterval(() => {
    apiClient.get('/master/check_logged').then(res => {
      message.success("111")
    }).catch((err) => {
      message.error(err.message)
      console.log(err)
      if (window.location.pathname === '/init-system' || window.location.pathname === '/login') return
      window.location.href = '/login'
    })
  }, A_MINUTE_MS)
  useEffect(() => {
    setSidebar(location.pathname !== "/init" && location.pathname !== "/register")
  }, [location.pathname])
  mediaQuery.addEventListener('change', handleChange)

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <div className={sidebarStyle.hasSidebar}>
        {
          location.pathname !== "/init-system" && <>
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
