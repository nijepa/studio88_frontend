import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "/clients",
        name: "Clients",
        component: () =>
          import(/* webpackChunkName: "client" */ "../views/Clients.vue"),
      },
      {
        path: "/client",
        name: "Client",
        component: () =>
          import(/* webpackChunkName: "client" */ "../views/Client.vue"),
      },
      {
        path: "/clientactivity",
        name: "ClientActivity",
        component: () =>
          import(
            /* webpackChunkName: "client" */ "../views/ClientActivity.vue"
          ),
      },
      {
        path: "/expenses",
        name: "Expenses",
        component: () =>
          import(/* webpackChunkName: "expense" */ "../views/Expenses.vue"),
      },
      {
        path: "/expense",
        name: "Expense",
        component: () =>
          import(/* webpackChunkName: "expense" */ "../views/Expense.vue"),
      },
      {
        path: "/payments",
        name: "Payments",
        component: () =>
          import(/* webpackChunkName: "payment" */ "../views/Payments.vue"),
      },
      {
        path: "/payment",
        name: "Payment",
        component: () =>
          import(/* webpackChunkName: "payment" */ "../views/Payment.vue"),
      },
      {
        path: "/attendances",
        name: "Attendances",
        component: () =>
          import(
            /* webpackChunkName: "attendance" */ "../views/Attendances.vue"
          ),
      },
      {
        path: "/attendance",
        name: "Attendance",
        component: () =>
          import(
            /* webpackChunkName: "attendance" */ "../views/Attendance.vue"
          ),
      },
      {
        path: "/schedules",
        name: "Schedules",
        component: () =>
          import(/* webpackChunkName: "schedule" */ "../views/Schedules.vue"),
      },
      {
        path: "/schedule",
        name: "Schedule",
        component: () =>
          import(/* webpackChunkName: "schedule" */ "../views/Schedule.vue"),
      },
      {
        path: "/summaries",
        name: "Summaries",
        component: () =>
          import(/* webpackChunkName: "summaries" */ "../views/Summaries.vue"),
      },
      {
        path: "/general",
        name: "General",
        component: () =>
          import(/* webpackChunkName: "general" */ "../views/General.vue"),
      },
      {
        path: "/signup",
        name: "SignUp",
        component: () =>
          import(/* webpackChunkName: "general" */ "../views/SignUp.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
