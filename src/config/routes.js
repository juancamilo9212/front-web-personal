
//LayOut
import LayOutAdmin from '../layouts/LayOutAdmin';
import LayOutBasic from '../layouts/LayOutBasic'

//AdminPage
import AdminHome from '../pages/admin';
import AdminSignIn from '../pages/admin/SignIn';
import AdminUsers from '../pages/admin/Users';
import AdminMenuWeb from '../pages/admin/MenuWeb';
import CoursesAdmin from '../pages/admin/Courses/Courses'

//Page
import Home from '../pages/web/Home'
import Contact from '../pages/web/Contact'
import Error404 from '../pages/Error404'
import Courses from '../pages/Courses';

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
                path:'/admin/menu',
                component:AdminMenuWeb,
                exact:true
            },
            {
                path:'/admin/courses',
                component:CoursesAdmin,
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
                path:"/courses",
                component:Courses,
                exact:true
            },
            {
                component:Error404
            }
        ]
    }
];

export default routes;