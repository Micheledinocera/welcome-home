<template>
  <div class="home">
    <h1>Home</h1>
  </div>
  <router-view />
</template>

<script lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      const user = store.getters.getUser;
      store.dispatch("bindOwnedCase", user.uid);
      store.dispatch("bindGuestCase", user.uid);
      store.dispatch("bindUserTransaction", user.uid);
    });

    return {};
  },
};
</script>

<style lang="less" src="./Home.less" scoped></style>
