import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Pokedex } from './components/Pokedex'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/pokedex' element={<Pokedex />} />

        </Routes>
      </div>
    </HashRouter >

  )

  // return (
  //   <HashRouter>
  //     <div className="App">
  //     <Routes>
  //       <Route path='/' element={<Login />} />
  //       <Route element={ <ProtectedRoutes /> } >
  //         <Route path='/pokedex' element={<Pokedex />} />
  //       </Route>
  //     </Routes>
  //   </div>
  //   </HashRouter >

  // )
}

export default App
