import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, Link, useParams } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1560955053i/44421460.jpg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='spin'>BOOKS!</h1>
      <h1><Link to='/vote'>VOTE</Link></h1>
      <div>
        <Outlet />
      </div>
      <p><Link to={`contacts/1`}>contacts1</Link></p>
      <p><Link to={`contacts/2`}>contacts 2</Link></p>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home
