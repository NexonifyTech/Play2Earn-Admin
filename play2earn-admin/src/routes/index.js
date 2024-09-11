import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loader from "../pages/Admin/Loader/Loader";
import GuestGuard from "..//guards/GuestGuard";
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
    //   children: [
    //     {
    //       path: "/",
    //       element: (
    //         <GuestGuard>
    //           <TrainsOnWheels />
    //         </GuestGuard>
    //       ),
    //     },
       
    //   ],
    },
    {
      path: "/admin",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
    //   children: [
    //     {
    //       path: "train",
    //       element: (
    //         <AuthGuard>
    //           <Train />
    //         </AuthGuard>
    //       ),
    //     },
    //          ],
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

const Login = Loadable(lazy(() => import("../pages/Admin/LoginForms/Login")));
const DashboardLayout = Loadable(
  lazy(() => import("../pages/Admin/Dashboard/DashboardLayout"))
);

// const NotFound = Loadable(lazy(() => import("../pages/404/Page404")));
