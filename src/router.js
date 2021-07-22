import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import store from "@/store";
import EventCreate from "./views/EventCreate.vue";
import EventList from "./views/EventList.vue";
import EventShow from "./views/EventShow.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true,
    },
    {
      path: "/event/create",
      name: "event-create",
      component: EventCreate,
    },
    {
      path: "/event/:id",
      name: "event-show",
      component: EventShow,
      props: true,
      beforeEnter: (routeTo, routeFrom, next) => {
        store
          .dispatch("event/fetchEvent", routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event;
            next();
          })
          .catch((error) => {
            error.response && error.response.status === 404
              ? next({ name: "not-found", params: { resource: "event" } })
              : next({ name: "network-issue" });
          });
      },
    },
    {
      path: "/404",
      name: "not-found",
      props: true,
      component: () => import("./views/NotFound.vue"),
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: () => import("./views/NetworkIssue.vue"),
    },
    {
      path: "*",
      redirect: { name: "not-found", params: { resource: "page" } },
    },
  ],
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
