<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

const router = useRouter();
const isLogin = ref(false);

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("로그아웃 실패");
  } else {
    alert("로그아웃 성공");
    router.push("/");
  }
};

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    console.log("로그인 상태");
    isLogin.value = true;
  } else {
    console.log("로그아웃 상태");
    isLogin.value = false;
    alert("로그인 후 이용해주세요.");
    router.push("/");
  }
});
</script>

<template>
  <div v-if="isLogin" class="container">
    <div class="form-container">
      <button class="logout" @click="handleLogout">로그아웃</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/form.scss";

button {
  background: transparent;
  color: var(--main-color);
  font-size: 16px;
  margin-top: 40px;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
}
</style>
