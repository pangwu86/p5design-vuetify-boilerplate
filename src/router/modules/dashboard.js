import Layout from "@/layout";

const dashboardRouter = [
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "Profile", icon: "user" }
      }
    ]
  },
  {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  }
];

export default dashboardRouter;
