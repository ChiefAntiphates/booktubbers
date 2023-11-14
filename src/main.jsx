import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from './home.jsx'
import Contact from './contacts.jsx';
import ErrorPage from './error-page.jsx';
import './index.css'
import Vote from './vote.jsx';
import Category from './category.jsx';
import Cookies from 'js-cookie';
import GlobalContext, { initialState } from "./context/global-context.js"
import GlobalReducer from "./context/global-reducer.js"
import Verify from './verify.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';


const router = createBrowserRouter([
  {
    element: <><Header/><Outlet/><Footer/></>, 
    children: [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "contacts/:contactId",
          element: <Contact />,
        },
      ]
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