import Gate from '@components/gate';
import Home from '@views/home';
import Login from '@views/login';
import Register from '@views/register';
import Profile from '@views/profile';
import PasswordReset from '@views/password/reset';

export default [
	{
    	path: "/login",
    	element: <Gate view={<Login />} restricted={0} />
  	},
  	{
    	path: "/register",
    	element: <Gate view={<Register />} restricted={0} />
  	},
  	{
    	path: "/password-reset",
    	element: <Gate view={<PasswordReset />} restricted={0} />
  	},
	{
    	path: "/",
    	element: <Gate view={<Home />} restricted={1} />
  	},
  	{
    	path: "/profile",
    	element:<Gate view={<Profile />} restricted={1} />
  	}
];