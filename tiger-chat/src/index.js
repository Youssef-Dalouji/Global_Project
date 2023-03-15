import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app/App';
import {QueryClientProvider,QueryClient} from 'react-query'
import ChatOnline from './components/ChatOnline'
import ConnexionRoom from './components/ConnexionRoom'
import CreateRoom from './components/CreateRoom'
import RoomList from './components/RoomList'
import Registre from './components/Registre'
import Authentification from './components/Authentification'
import ErrorPage from './components/ErrorPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient=new QueryClient()
const router=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        index:true,
        element:<Authentification />
      },
      {
        path:"SignIn",
        element:<Authentification />
      },
      {
        path:'SignUp',
        element:<Registre />
      },
      {
        path:'RoomList',
        element:<RoomList />
      },
      {
        path:'CreateRoom',
        element:<CreateRoom />
      },
      {
        path:'ConnectionRoom',
        element:<ConnexionRoom />
      },
      {
        path:'RoomChat',
        element:<ChatOnline />
      }
    ],
    errorElement:<ErrorPage />
  }
])
root.render(
<React.StrictMode>
  <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </QueryClientProvider>
</React.StrictMode>
);
