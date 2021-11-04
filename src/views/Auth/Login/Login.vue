<template>
  <div class="login">
    <h1>Login</h1>
    <el-input
      class="email"
      type="email"
      v-model="email"
      @keyup.enter="$refs.passwordInput.focus()"
    />
    <el-input
      class="password"
      type="password"
      ref="passwordInput"
      v-model="password"
      @keyup.enter="loginAction"
    />
    <el-button @click="loginAction"> Login </el-button>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { ElNotification } from "element-plus";

export default {
  setup() {
    const store = useStore();
    let email = ref("");
    let password = ref("");

    const loginAction = async () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          await store.dispatch("setUser", userCredential.user.uid);
        })
        .catch((error) => {
          ElNotification({
            title: "Error",
            message: error.message,
            type: "error",
          });
        });
    };

    return {
      loginAction,
      email,
      password,
    };
  },
};
</script>

<style lang="less" src="./Login.less" scoped></style>
