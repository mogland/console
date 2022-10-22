import Router from "./routes"
import ThemeProvider from "./theme"

function App() {

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}

export default App
