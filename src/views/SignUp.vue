<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const tel = ref("");
const text = ref("");

const handleSignup = () => {
  console.log(email.value, password.value, tel.value, text.value);
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSignup">
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
      <div class="form-group">
        <label for="tel">Phone</label>
        <input
          id="tel"
          v-model="tel"
          type="tel"
          placeholder="전화번호 입력"
          required
        />
      </div>
      <div class="form-group">
        <label for="text">자기소개</label>
        <textarea id="text" v-model="text" />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/form.scss";
</style>
