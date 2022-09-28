import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import Breeds from './pages/Breeds'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/breeds' element={<Breeds />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  )
}

export default App
