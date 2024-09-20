import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loader from "../pages/Admin/Loader/Loader";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";


const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  return useRoutes([
    {
      path: "/",
       children: [
         {
           path: "/",
           element: (
             <GuestGuard>
               <Play2Earn/>
             </GuestGuard>
           ),
         },
         {
          path: "/login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
     
       ],
    },
    {
      path: "/admin",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "notification",
          element: (
            <AuthGuard>
              <Notification />
            </AuthGuard>
          ),
        },
        {
          path: "settings",
          element: (
            <AuthGuard>
              <Settings />
            </AuthGuard>
          ),
        },
             ],
    },
    {
      path: "*",
    //   children: [
    //     { path: "404", element: <NotFound /> },
    //     { path: "*", element: <Navigate to="/404" replace /> },
    //   ],
    },
  ]);
}

const Play2Earn = Loadable(
  lazy(() => import("../pages/Website/Play2Earn/Play2Earn"))
);


const Login = Loadable(lazy(() => import("../pages/Admin/LoginForms/Login")));
const DashboardLayout = Loadable(
  lazy(() => import("../pages/Admin/Dashboard/DashboardLayout"))
);

const Notification = Loadable(
  lazy(() => import("../pages/Admin/Notification/Notification"))
);

const Settings = Loadable(
  lazy(() => import("../pages/Admin/Settings/Settings"))
);
// const NotFound = Loadable(lazy(() => import("../pages/404/Page404")));
