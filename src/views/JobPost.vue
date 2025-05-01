<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import supabase from "../supabase";
import { useAuth } from "../auth/auth";

const router = useRouter();
const { user, isLogin, checkLoginStatus } = useAuth();

const title = ref("");
const todo = ref("");
const pay_rule = ref("");
const pay = ref("");
const desc = ref("");
const company_name = ref("");
const location = ref("");
const tel = ref("");

onMounted(async () => {
  await checkLoginStatus();
  console.log(isLogin.value, user.value);
});
</script>

<template>
  <div v-if="isLogin" class="form-container">
    <form>
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
            <img src="/box64.jpg" alt="미리보기" width="64" height="64" />
          </figure>
        </label>
        <input id="photo" type="file" accept="image/*" />
      </div>
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

  input[type="radio"]:nth-child(1):checked ~ .tab-group label:nth-child(1) {
    background: var(--main-color-dark);
    color: #fff;
  }

  input[type="radio"]:nth-child(2):checked ~ .tab-group label:nth-child(2) {
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
