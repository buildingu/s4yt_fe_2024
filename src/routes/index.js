import Home from '@views/home';
import Login from '@views/login';
import Register from '@views/register';
import Profile from '@views/profile';
import PasswordReset from '@views/password/reset';

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
  	},
  	{
    	path: "/profile",
    	element: <Profile />,
  	},
  	{
    	path: "/password-reset",
    	element: <PasswordReset />,
  	}
];