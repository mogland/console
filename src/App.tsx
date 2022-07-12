import { Scrollbar } from './components/universal/Scrollbar'
import Sidebar from './components/widgets/Sidebar'
import { AppRouter } from './router'
import { NxLayout } from './components/universal/Layout'

function App() {

  return (
    <>
      <div><Sidebar /></div>
      <NxLayout style={{left: 250}}>
        <Scrollbar>
          <AppRouter />
        </Scrollbar>
      </NxLayout>
    </>
  )
}

export default App
