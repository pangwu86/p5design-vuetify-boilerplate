import Layout from "@/layout";

const errorRouter = {
  path: "/error",
  component: Layout,
  children: [
    {
      path: "log",
      component: () => import("@/views/error-log/index"),
      name: "ErrorLog",
      meta: { title: "Error Log", icon: "bug" }
    }
  ]
};

export default errorRouter;
