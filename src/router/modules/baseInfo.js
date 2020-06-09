import Layout from "@/layout";

const baseInfoRouter = {
  path: "/baseinfo",
  component: Layout,
  children: [
    {
      path: "accounts",
      component: () => import("@/views/baseInfo/accounts"),
      name: "Accounts",
      meta: { title: "用户库", icon: "user", actions: ["user_query"] }
    },
    {
      path: "roles",
      component: () => import("@/views/baseInfo/roles"),
      name: "Roles",
      meta: { title: "角色库", icon: "user", actions: ["role_query"] }
    },
    {
      path: "companies",
      component: () => import("@/views/baseInfo/companies"),
      name: "Companies",
      meta: { title: "公司库", icon: "user", actions: ["company_query"] }
    },
    {
      path: "contractors",
      component: () => import("@/views/baseInfo/contractors"),
      name: "Contractors",
      meta: { title: "参建单位库", icon: "user", actions: ["contractor_query"] }
    },
    {
      path: "projnodes",
      component: () => import("@/views/baseInfo/projnodes"),
      name: "Projnodes",
      meta: { title: "项目节点库", icon: "user", actions: ["projnode_query"] }
    }
  ]
};

export default baseInfoRouter;
