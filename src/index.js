// import "./wdyr"
import React from 'react'
import ReactDOM from 'react-dom'
import localforage from "localforage"
import { BrowserRouter as Router } from "react-router-dom"
import App from './components/App'

// Initialize the localstorage.
localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  storeName: "catlover",
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)