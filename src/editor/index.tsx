import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from './components/Header'
import EditArea from './components/EditArea'
import Setting from './components/Setting'
import MaterialWrapper from './components/MaterialWrapper'
import Prview from './components/Prview'
import { useComponentsStore } from './stores/components'

export default function LowCodeEditor() {
  const { mode, setMode } = useComponentsStore((state: any) => state)
  return (
    <div className="h-[100vh] flex flex-col">
      <div className='h-[60px] flex items-center border-b-[2px] border-[#000000]'>
        <Header></Header>
      </div>
      {
        mode === 'preview' && (
          <Prview></Prview>
        )
      }
      {
        mode === 'edit' && (
          <Allotment>
            <Allotment.Pane preferredSize={240} maxSize={600} minSize={50}>
              <MaterialWrapper></MaterialWrapper>
            </Allotment.Pane>
            <Allotment.Pane>
              <EditArea></EditArea>
            </Allotment.Pane>
            <Allotment.Pane preferredSize={300} maxSize={650} minSize={50}>
              <Setting></Setting>
            </Allotment.Pane>
          </Allotment>
        )
      }
    </div>
  )
}
