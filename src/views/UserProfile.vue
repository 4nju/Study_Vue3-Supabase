<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

const router = useRouter();
const isLogin = ref(false);

const name = ref("사용자 이름");
const address = ref("사용자 주소");
const text = ref("자기소개");

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

    // 유저 정보 가져오기
    const { data, error } = await supabase
      .from("user_table")
      .select()
      .eq("id", user.id);
    if (data) {
      name.value = data[0].name;
      address.value = data[0].address;
      text.value = data[0].text;
    }
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
    <div class="top-info-box">
      <img src="/vite.svg" alt="profile" />
      <div class="right-info">
        <span class="name">{{ name }}</span>
        <address class="address">{{ address }}</address>
      </div>
    </div>
    <div class="text-info">
      <h4>자기소개</h4>
      <p>{{ text }}</p>
    </div>
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

.form-container {
  margin-top: 20px;
}

.top-info-box {
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }

  .right-info {
    width: 100%;
    line-height: 1.4;

    .name {
      font-size: 16px;
      font-weight: 600;
    }

    .address {
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      color: #777;
    }
  }
}

.text-info {
  margin-bottom: 25px;

  h4 {
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #333;
    line-height: 20px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 12px 1rem;
  }
}
</style>
