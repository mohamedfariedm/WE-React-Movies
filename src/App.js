import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter, json } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Movies from './components/Movies/Movies';
import TvSerios from './components/TvSerios/TvSerios';
import WishList from './components/WishList/WishList';
import Details from './components/Details/Details';
import { Toaster } from 'react-hot-toast';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';

function App() {
  if(localStorage.getItem("moviesArray")==null){
    localStorage.setItem("moviesArray",JSON.stringify([]))
  }
let routers=createHashRouter([{
  path:"",element:<LayOut/>,children:[
    {index:true,element:<Home/>},
    {path:"login",element:<Login/>},
    {path:"Register",element:<Register/>},
    {path:"forgotPassword",element:<ForgetPassword/>},
    {path:"movies/:pageNum",element:<ProtectedRoute><Movies/></ProtectedRoute>},
    {path:"/:sort/details/:id",element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:"tvs/:pageNum",element:<ProtectedRoute><TvSerios/></ProtectedRoute>},
    {path:"WishList",element:<ProtectedRoute><WishList/></ProtectedRoute>},
  ]
}])
  return <>
<RouterProvider router={routers}>
<Toaster/>
</RouterProvider>

  </>
}

export default App;
