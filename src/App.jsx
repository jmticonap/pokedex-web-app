import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Pokedex } from './components/Pokedex'
import ProtectedRoutes from './components/ProtectedRoutes'
import PokemonProfile from './components/PokemonProfile'

function App() {

  return (
    <HashRouter>
      <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={ <ProtectedRoutes /> } >
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:name' element={<PokemonProfile />} />
        </Route>
      </Routes>
    </div>
    </HashRouter >

  )
}

export default App
