import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import { Pokedex } from './components/Pokedex'
import ProtectedRoutes from './components/ProtectedRoutes'
import PokemonProfile from './components/PokemonProfile'
import PokemonProfile2 from './components/PokemonProfile2'
import { Search } from './components/Search'

function App() {

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/search' element={<Search />} />

          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:name' element={<PokemonProfile />} />
          <Route path='/pokedex2/:name' element={<PokemonProfile2 />} />

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
