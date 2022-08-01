
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
import { useLocation, useNavigate } from 'react-router-dom'

function App() {

  const checkIgnoreCondition = window.location.pathname === '/init-system' ||
    window.location.pathname === '/login'
  const ignoreCondition = checkIgnoreCondition ||
    window.location.pathname.match(/\/posts\/edit\/\d+/) ||
    window.location.pathname.match(/\/pages\/edit\/\d+/) ||
    window.location.pathname === '/posts/edit' ||
    window.location.pathname === '/pages/edit' || false

  const [ignoreConditionState, setIgnoreConditionState] = useState(ignoreCondition)
  const [checkIgnoreConditionState, setCheckIgnoreConditionState] = useState(checkIgnoreCondition)
  const AppNavigate = useNavigate()

  useEffect(() => { // 随时监听路由变化
    setIgnoreConditionState(ignoreCondition)
    setCheckIgnoreConditionState(checkIgnoreCondition)
  }, [useLocation()])

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
  const checkToken = async () => {
    await apiClient.get('/master/check_logged').catch((err) => {
      message.error(err.message)
      // console.log(err)
      if (checkIgnoreConditionState) return
      AppNavigate('/login')
    })
  }
  useMount(() => {
    setThemeType(mediaQuery.matches ? 'dark' : 'light')
    checkToken()
  })


  useEffect(() => {
    setSidebar(location.pathname !== "/init" && location.pathname !== "/register")
    checkToken()
  }, [location.pathname])
  mediaQuery.addEventListener('change', handleChange)


  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <div className={sidebarStyle.hasSidebar}>
        <SidebarBtn />
        {
          !ignoreConditionState && <>
            <Sidebar />
          </>
        }
        <AppRouter />
      </div>
    </GeistProvider>
  )
}

export default App
