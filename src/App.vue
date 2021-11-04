<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";
import Header from "@/components/Header/Header.vue";

export default {
  components: { Header },
  setup() {
    const store = useStore();

    const bindAppInfo = () => store.dispatch("bindAppInfo");

    onMounted(() => {
      bindAppInfo();
    });

    return {};
  },
};
</script>

<style lang="less" src="./App.less"></style>
