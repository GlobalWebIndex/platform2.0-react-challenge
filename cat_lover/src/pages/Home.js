import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1 className=''>Welcome to Cat App</h1>
      <img src='cat2.jpg' alt='cat' />
      <Link to='cats'>
        <button>Load Cats</button>
      </Link>
    </div>
  )
}

export default Home
