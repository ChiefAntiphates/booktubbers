import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from './routes/home.jsx'
import ErrorPage from './routes/error-page.jsx';
import './css/index.css'
import Vote from './routes/vote-root.jsx';
import Category from './routes/vote.jsx';
import Cookies from 'js-cookie';
import GlobalContext, { initialState } from "./context/global-context.js"
import GlobalReducer from "./context/global-reducer.js"
import Verify from './routes/verify.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Library from './routes/library.jsx';
import Stats from './routes/stats.jsx';


const router = createHashRouter([
  {
    element: <><Navbar/><Outlet/><Footer/></>, 
    children: [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "vote",
      element: <Vote />,
      errorElement: <ErrorPage />
    },
    {
      path: "/vote/:categoryId",
      element: <Category />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/verify",
      element: <Verify />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/library",
      element: <Library />,
      errorElement: <ErrorPage />
    },
    {
      path: "/secret",
      element: <Stats />,
      errorElement: <ErrorPage />
    }
  ]
}
]);

function App() {
  const [state, dispatch] = useReducer(GlobalReducer, initialState)
  return(
    <React.StrictMode>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router}/>
      </GlobalContext.Provider>
    </React.StrictMode>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)