<template>
  <div class="signin">
    <el-input
      class="nome"
      type="nome"
      v-model="nome"
      @keyup.enter="$refs.emailInput.focus()"
    />
    <el-input
      class="email"
      type="email"
      ref="emailInput"
      v-model="email"
      @keyup.enter="$refs.passwordInput.focus()"
    />
    <el-input
      class="password"
      type="password"
      ref="passwordInput"
      v-model="password"
      @keyup.enter="signinAction"
    />
    <el-button @click="signinAction"> Signin </el-button>
  </div>
</template>

<script lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let email = ref("");
    let password = ref("");
    let nome = ref("");

    const signinAction = async () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          await store.dispatch("addUser", {
            uid: userCredential.user.uid,
            user: {
              email: email.value,
              Nome: nome.value,
            },
          });
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
      signinAction,
      email,
      password,
      nome,
    };
  },
};
</script>

<style lang="less" src="./Signin.less" scoped></style>
