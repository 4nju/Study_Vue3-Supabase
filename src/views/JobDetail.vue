<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import supabase from "../supabase";
import { useAuth } from "../auth/auth";

const route = useRoute();
const router = useRouter();
const { user, isLogin, checkLoginStatus } = useAuth();
const id = route.params.id;
const post = ref(null);
const isApplied = ref(false);

const checkApply = async () => {
  const { data, error } = await supabase
    .from("job_apply_list")
    .select()
    .eq("applicant_id", user.value.id)
    .eq("post_id", id);

  if (error) {
    alert("오류가 발생했습니다.");
    return;
  }

  if (data.length > 0) {
    isApplied.value = true;
  }
};

const handleApply = async () => {
  const { data, error } = await supabase
    .from("user_table")
    .select()
    .eq("id", user.value.id)
    .single();

  if (error) {
    alert("오류가 발생했습니다.");
    return;
  }

  const { error: err } = await supabase.from("job_apply_list").insert({
    job_title: post.value.title,
    employer_id: post.value.author,
    applicant_id: user.value.id,
    applicant_name: data.name,
    applicant_tel: data.tel,
    post_id: post.value.id,
  });

  if (err) {
    alert("오류가 발생했습니다.");
    return;
  } else {
    alert("지원이 완료되었습니다.");
    router.push("/job-list");
  }
};

const handleDelete = async () => {
  const conf = confirm("정말 삭제하시겠습니까?");

  if (!conf) {
    return;
  }

  const { error } = await supabase.from("job_posts").delete().eq("id", id);

  if (error) {
    alert("글 삭제 실패");
  } else {
    alert("글 삭제 성공");
    router.push("/job-list");
  }
};

onMounted(async () => {
  await checkLoginStatus();

  if (user.value) {
    const { data, error } = await supabase
      .from("job_posts")
      .select()
      .eq("id", id)
      .single();

    post.value = data;

    if (error) {
      alert("글 가져오기 실패");
      return;
    }
  }

  checkApply();
});
</script>

<template>
  <section v-if="isLogin">
    <figure>
      <img src="https://placehold.co/640x360" alt="head image" />
    </figure>
    <!-- 상세정보 -->
    <div class="container" v-if="post">
      <h2>{{ post.title }}</h2>
      <p>
        {{ post.company_name }}
        <span>&middot;</span>
        {{ post.location }}
      </p>
      <p class="pay">
        {{ post.pay_rule }}: <b>{{ post.pay.toLocaleString() }}</b>
      </p>
      <textarea class="desc" rows="8" readonly>{{ post.desc }}</textarea>
    </div>
    <!-- 하단 고정 버튼 -->
    <div class="bottom-btn-group" v-if="post && post.author !== user.id">
      <a class="btn-tel" :href="`tel:${post.tel}`">전화문의</a>
      <button v-if="!isApplied" class="btn-apply" @click="handleApply()">
        지원하기
      </button>
      <button v-else class="btn-apply-disabled">지원완료</button>
    </div>
    <div class="bottom-btn-group" v-else>
      <router-link class="btn-tel" :to="`/job-post-update/${post.id}`">
        수정
      </router-link>
      <button class="btn-apply" @click="handleDelete()">삭제</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
figure {
  aspect-ratio: 16 / 9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

h2 {
  font-size: 16px;
  margin-bottom: 5px;
}

.top_info {
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
}

.pay {
  font-size: 14px;
  font-weight: bold;
  color: #444;
  padding: 10px 0;
  margin-bottom: 16px;
}

.desc {
  width: 100%;
  padding: 0px;
  border: none;
  line-height: 22px;
  margin-bottom: 10px;
  outline: none;
  background: #fff;
}

.bottom-btn-group {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;

  button,
  a {
    width: 50%;
    border-radius: 0;
    padding-top: 14px;
    padding-bottom: 14px;
    margin: 0;
    text-align: center;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-tel {
    background-color: var(--main-color-dark);
  }

  .btn-apply {
    background-color: var(--main-color-light);
  }

  .btn-apply-disabled {
    background-color: #ccc;
    cursor: default;
  }
}
</style>
