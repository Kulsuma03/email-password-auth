import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/layout/Main';
import LogInBootstrap from './components/LogInBootstrap';
import RegisterReactBootstrap from './components/RegisterReactBootstrap';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path: '/register',
        element: <RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path: '/login',
        element: <LogInBootstrap></LogInBootstrap>
      }
    ]
  }
])

function App() {
  return (
    <div className="">
       <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
