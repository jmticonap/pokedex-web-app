import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
    </HashRouter >
    
  )
}

export default App
