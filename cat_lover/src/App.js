import { Navigate, Route, Routes } from 'react-router-dom'
import Cats from './pages/Cats'
import Favorite from './pages/Favorite'
import Breeds from './pages/Breeds'
import Home from './pages/Home'
import { CatContextProvider } from './context/CatContext'

function App() {
  return (
    <CatContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cats' element={<Cats />} />
        <Route path='/breeds' element={<Breeds />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </CatContextProvider>
  )
}

export default App
