import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import './index.css'

import SearchGames from './pages/SearchGames'
import SavedGames from './pages/SavedGames.jsx'
import LoginForm from './pages/login.jsx'
import SignupForm from './pages/signUp.jsx'
import HomePage from './pages/home.jsx'
{/*import FindPeopleForm from './pages/findPeople.jsx'*/}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage />
      }, {
        path: '/search',
        element: <SearchGames />
      }, {
        path: '/saved',
        element: <SavedGames />
      }, {
        path: '/LogIn',
        element: <LoginForm />
      }, {
        path: '/signUp',
        element: <SignupForm />
      }, {/*{
        path: '/findPeople',
        element: <FindPeopleForm />
      },*/}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
