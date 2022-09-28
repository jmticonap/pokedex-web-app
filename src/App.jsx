import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Pokedex } from './components/Pokedex'
import ProtectedRoutes from './components/ProtectedRoutes'
import PokemonProfile from './components/PokemonProfile'
import PokemonProfile2 from './components/PokemonProfile2'

function App() {

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:name' element={<PokemonProfile />} />
          <Route path='/pokedex2' element={<PokemonProfile2 />} />

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
