<template>
  <div class="header">
    <div class="title">{{ appInfo.Nome }}</div>
    <div class="user" v-if="user.Nome != ''">
      {{ "Connesso come "+ user.Nome }}
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ComputedRef } from "vue";
import { AppInfo } from "@/model/AppInfo";
import { User } from "@/model/User";

export default {
  name:"Header",
  setup() {
    const store = useStore();
    const appInfo: ComputedRef<AppInfo> = computed(
      () => store.getters.getAppInfo
    );

    const user: ComputedRef<User> = computed(() => store.getters.getUser);

    return {
      appInfo,
      user,
    };
  },
};

</script>

<style scoped lang="less" src="./Header.less"></style>
