<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";

let route = useRoute();
let currentPath = route.path;
let title = ref("");

watch(route, (newPath) => {
  currentPath = newPath.path;

  if (currentPath === "/") {
    title.value = "로그인";
  } else if (currentPath === "/signup") {
    title.value = "회원가입";
  } else if (currentPath === "/job-post") {
    title.value = "구인등록";
  } else if (currentPath === "/job-list") {
    title.value = "구인목록";
  } else if (currentPath.startsWith("/job-detail")) {
    title.value = "상세보기";
  } else if (currentPath === "/user-profile") {
    title.value = "프로필";
  }
});
</script>

<template>
  <nav>
    <h1>{{ title }}</h1>
    <router-link
      v-if="
        currentPath === '/' ||
        currentPath === '/signup' ||
        currentPath === '/job-post'
      "
      to="/job-list"
      class="btn-close"
    >
      <Icon icon="material-symbols:close-rounded" width="24" height="24" />
    </router-link>
    <router-link
      v-if="
        currentPath.startsWith('/job-detail') || currentPath === '/user-profile'
      "
      to="/job-list"
      class="btn-close"
    >
      <Icon icon="material-symbols:arrow-back" width="24" height="24" />
    </router-link>
    <div v-if="currentPath === '/job-list'" class="right-icons">
      <router-link to="/user-profile">
        <Icon
          icon="material-symbols:supervised-user-circle-outline"
          width="24"
          height="24"
        />
      </router-link>
      <router-link to="/job-post">
        <Icon icon="material-symbols:ink-pen-outline" width="24" height="24" />
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  position: relative;
  border-bottom: 1px solid #ccc;
  width: 100%;
  height: 44px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-dark);

  h1 {
    font-size: 16px;
  }

  a {
    display: flex;
  }

  .btn-close {
    position: absolute;
    left: 15px;
    text-decoration: none;
  }

  .right-icons {
    position: absolute;
    right: 15px;
    display: flex;
    gap: 10px;
  }
}
</style>
