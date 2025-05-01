import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

export function useAuth() {
  const router = useRouter();
  const user = ref(null);
  const isLogin = ref(false);

  const checkLoginStatus = async () => {
    const {
      data: { user: _user },
    } = await supabase.auth.getUser();
    user.value = _user; // 사용자 정보 저장

    if (_user) {
      isLogin.value = true;
    } else {
      isLogin.value = false;
      alert("로그인 후 이용해주세요.");
      router.push("/");
    }
  };

  return {
    user,
    isLogin,
    checkLoginStatus,
  };
}
