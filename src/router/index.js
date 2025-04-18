import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import JobPost from "../views/JobPost.vue";
import JobList from "../views/JobList.vue";
import JobDetail from "../views/JobDetail.vue";
import UserProfile from "../views/UserProfile.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/job-post", component: JobPost },
  { path: "/job-list", component: JobList },
  { path: "/job-detail", component: JobDetail },
  { path: "/user-profile", component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
