import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import BreedsPage from './views/Breeds/BreedsPage'
import CatsPage from './views/Cats/CatsPage'
import FavoritesPage from './views/Favorites/FavoritesPage'

function App() {
  return (
    <Router>
      {/* Header Functional Component */}
      <Header />

      <Switch>
        {/* Cats page */}
        <Route exact path='/cats'>
          <CatsPage />
        </Route>

        {/* Breeds page */}
        <Route path='/breeds'>
          <BreedsPage />
        </Route>

        {/* Favorites page */}
        <Route path='/favorites'>
          <FavoritesPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
