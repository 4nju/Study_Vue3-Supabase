<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

const router = useRouter();
const isLoading = ref(false);

const email = ref("");
const password = ref("");
const tel = ref("");
const text = ref("");
const name = ref("");
const address = ref("");

const handleSignup = async () => {
  isLoading.value = true;
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert(error.message);
  } else {
    const { error } = await supabase.from("user_table").insert({
      tel: tel.value,
      text: text.value,
      name: name.value,
      address: address.value,
    });

    if (error) {
      alert("에러");
      console.log(error);
    } else {
      alert("회원가입 성공");
      isLoading.value = false;
      router.push("/");
    }
  }
};
</script>

<template>
  <div v-if="isLoading" class="loading_info">
    <p>회원가입 처리중...</p>
  </div>
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
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="이름 입력"
          required
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          id="address"
          v-model="address"
          type="text"
          placeholder="주소 입력"
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
