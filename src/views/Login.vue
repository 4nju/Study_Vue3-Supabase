<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

const router = useRouter();
const isLoading = ref(false);

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  isLoading.value = true;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert(error.message);
  } else {
    console.log("로그인 성공");
    isLoading.value = false;
    router.push("/job-list");
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="text"
          placeholder="이메일 입력"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="비밀번호 입력"
          required
        />
      </div>
      <button type="submit">로그인</button>
      <router-link to="/signup">회원가입</router-link>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/form.scss";
</style>
