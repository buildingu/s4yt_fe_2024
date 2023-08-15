import Home from '@views/home';
import Login from '@views/login';
import Register from '@views/register';

export default [
	{
    	path: "/",
    	element: <Home />,
  	},
  	{
    	path: "/login",
    	element: <login />,
  	},
  	{
    	path: "/register",
    	element: <Register />,
  	}
];