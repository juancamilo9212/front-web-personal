
//LayOut
import LayOutAdmin from '../layouts/LayOutAdmin';
import LayOutBasic from '../layouts/LayOutBasic'

//AdminPage
import AdminHome from '../pages/admin';
import AdminSignIn from '../pages/admin/SignIn';
import AdminUsers from '../pages/admin/Users';

//Page
import Home from '../pages/web/Home'
import Contact from '../pages/web/Contact'
import Error404 from '../pages/Error404'

const routes=[
    {
        path:'/admin',
        component:LayOutAdmin,
        exact:false,
        routes: [
            {
               path:'/admin',
               component: AdminHome,
               exact:true 
            },
            {
                path:'/admin/login',
                component:AdminSignIn,
                exact:true
            },{
                path:'/admin/users',
                component:AdminUsers,
                exact:true
            },
            {
                component:Error404
            }
        ]
        
    },
    {
        path:"/",
        component:LayOutBasic,
        exact:false,
        routes:[
            {
                path:"/",
                component:Home,
                exact:true
            },
            {
                path:"/contact",
                component:Contact,
                exact:true
            },
            {
                component:Error404
            }
        ]
    }
];

export default routes;