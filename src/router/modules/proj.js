import Layout from "@/layout";

const projRouter = {
  path: "/proj",
  component: Layout,
  children: [
    {
      path: "projects",
      component: () => import("@/views/proj/projects"),
      name: "Projects",
      meta: { title: "项目列表", icon: "user", actions: ["project_query", "project_child_query"] }
    },
    {
      path: "plans",
      component: () => import("@/views/proj/plans"),
      name: "Plans",
      meta: { title: "年计划", icon: "user", actions: ["planY_query", "planY_child_query"] }
    },
    {
      path: "schedules",
      component: () => import("@/views/proj/schedules"),
      name: "Schedules",
      meta: { title: "月进度", icon: "user", actions: ["sch_query", "sch_child_query"] }
    }
  ]
};

export default projRouter;
