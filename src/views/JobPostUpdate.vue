<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import supabase from "../supabase";
import { useAuth } from "../auth/auth";

const router = useRouter(); // 페이지 이동 모듈
const route = useRoute(); // params, 경로 참조
const { user, isLogin, checkLoginStatus } = useAuth();
const isLoading = ref(false);

const title = ref("");
const todo = ref("");
const pay_rule = ref("");
const pay = ref("");
const desc = ref("");
const company_name = ref("");
const location = ref("");
const tel = ref("");

const handleSubmit = async () => {
  isLoading.value = true;
  const { error } = await supabase
    .from("job_posts")
    .update({
      title: title.value,
      todo: todo.value,
      pay_rule: pay_rule.value,
      pay: pay.value,
      desc: desc.value,
      company_name: company_name.value,
      location: location.value,
      tel: tel.value,
      img_url: "https://placehold.co/400x250",
    })
    .eq("id", route.params.id);

  if (error) {
    alert(error.message);
  } else {
    alert("글 수정 성공");
    router.push("/job-list");
  }
  isLoading.value = false;
};

const previewImage = ref(null);
const onFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    previewImage.value = URL.createObjectURL(file);
    console.log(previewImage.value);
  }
};

const getPost = async () => {
  const { data, error } = await supabase
    .from("job_posts")
    .select()
    .eq("id", route.params.id)
    .single();
  console.log(data);

  title.value = data.title;
  todo.value = data.todo;
  pay_rule.value = data.pay_rule;
  pay.value = data.pay;
  desc.value = data.desc;
  company_name.value = data.company_name;
  location.value = data.location;
  tel.value = data.tel;
  previewImage.value = data.img_url;
};

onMounted(async () => {
  await checkLoginStatus();
  getPost();
});

onUnmounted(() => {
  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value);
  }
});
</script>

<template>
  <div v-if="isLoading" class="loading_info">
    <p>저장중...</p>
  </div>
  <div v-if="isLogin" class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">제목</label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="공고 내용을 요약해주세요."
          required
        />
      </div>
      <div class="form-group">
        <label for="todo">하는 일</label>
        <input
          id="todo"
          v-model="todo"
          type="text"
          placeholder="해야할 업무를 입력해주세요."
          required
        />
      </div>
      <div class="form-group">
        <label for="todo">급여 조건</label>
        <input
          id="pay_rule1"
          name="pay_rule"
          v-model="pay_rule"
          type="radio"
          value="시급"
          required
          checked
        />
        <input
          id="pay_rule2"
          name="pay_rule"
          v-model="pay_rule"
          type="radio"
          value="월급"
          required
        />
        <div class="tab-group">
          <label for="pay_rule1">시급</label>
          <label for="pay_rule2">월급</label>
        </div>
        <input
          id="pay"
          v-model="pay"
          type="number"
          placeholder="시급 또는 월급을 입력해주세요."
          required
        />
      </div>
      <div class="form-group">
        <label for="desc">자세한 설명</label>
        <textarea
          id="desc"
          v-model="desc"
          placeholder="구체적인 업무 내용, 근무 여견, 지원자가 갖추어야 할 능력 등 우대 사항에 대해 알려주세요."
          required
          rows="4"
        />
      </div>
      <div class="form-group">
        <label for="company_name">업체명</label>
        <input
          id="company_name"
          v-model="company_name"
          type="text"
          placeholder="ex) 땅콩가게"
          required
        />
      </div>
      <div class="form-group">
        <label for="location">위치</label>
        <input
          id="location"
          v-model="location"
          type="text"
          placeholder="ex) 서울시 강남구 논현동"
          required
        />
      </div>
      <div class="form-group">
        <label for="tel">연락처</label>
        <input
          id="tel"
          v-model="tel"
          type="text"
          placeholder="ex) 010-1234-5678"
          required
        />
      </div>
      <div class="form-group">
        <label for="photo">
          <p class="title">사진(선택)</p>
          <figure>
            <Icon
              icon="material-symbols:photo-camera-outline"
              width="64"
              height="64"
            />
            <img
              v-if="previewImage"
              :src="previewImage"
              alt="미리보기"
              width="64"
              height="64"
            />
            <img
              v-else
              src="/box64.jpg"
              alt="미리보기"
              width="64"
              height="64"
            />
          </figure>
        </label>
        <input id="photo" type="file" accept="image/*" @change="onFileChange" />
      </div>
      <button class="btn-submit">수정완료</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  margin-top: 20px;
  padding-bottom: 50px;

  .tab-group {
    display: flex;
    gap: 15px;

    label {
      flex: 1;
      border: 1px solid var(--main-color-dark);
      border-radius: 8px;
      text-align: center;
      padding: 12px;
    }
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:nth-child(2):checked ~ .tab-group label:nth-child(1) {
    background: var(--main-color-dark);
    color: #fff;
  }

  input[type="radio"]:nth-child(3):checked ~ .tab-group label:nth-child(2) {
    background: var(--main-color-dark);
    color: #fff;
  }

  #pay {
    margin-top: 8px;
  }

  // for=photo를 가진 form-group의 후손 input의 보더 스타일 제거
  .form-group:has(label[for="photo"]) input {
    border: none;
  }

  //file 아이콘
  label[for="photo"] {
    figure {
      display: flex;
      align-items: center;

      img {
        border: 1px solid red;
        margin-left: 30px;
      }
    }
  }
  input[type="file"] {
    display: none;
  }
}

.btn-submit {
  background: var(--main-color-light);
}

.form-group:has(label[for="photo"]) {
  padding-bottom: 25px;
  border-bottom: 5px solid #ccc;
}
</style>
