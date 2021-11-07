<template>
  <div class="casa-page">
    <h1>Casa Page</h1>
    <div class="add-casa" v-if="selectedCasa.id == ''">
      <el-input v-model="casaNome" @keyup.enter="addCasa"></el-input>
      <div class="el-button" @click="addCasa">Add Casa</div>
    </div>
    <div class="back" @click="back">BACK</div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ComputedRef, onMounted, ref } from "vue";
import { Casa, ICasa } from "@/model/Casa";
import { useRouter } from "vue-router";
import { RouterNames } from "@/router/RouterNames";
import { User } from "@/model/User";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    let casaNome = ref("");

    const selectedCasa: ComputedRef<Casa> = computed(
      () => store.getters.getSelectedCasa
    );
    const guests: ComputedRef<User> = computed(
      () => store.getters.getGuestsCasa
    );
    const transactions: ComputedRef<User> = computed(
      () => store.getters.getCasaTransactions
    );

    const back = async () => {
      await store.dispatch("setSelectedCasa", new Casa());
      router.push({ name: RouterNames.USER_PAGE });
    };

    const bindItemsFromCasa = () => {
      store.dispatch("bindGuestsFromCasa", selectedCasa.value.id);
      store.dispatch("bindCasaTransaction", selectedCasa.value.id);
    };

    const addCasa = async () => {
      await store.dispatch(
        "addCasa",
        new Casa({
          nome: casaNome.value,
          owner: store.getters.getUser,
        } as ICasa)
      );
      bindItemsFromCasa();
    };

    onMounted(() => {
      if (selectedCasa.value.id != "") bindItemsFromCasa();
    });

    return {
      casaNome,
      selectedCasa,
      guests,
      transactions,
      back,
      addCasa,
    };
  },
};
</script>

<style lang="less" src="./CasaPage.less" scoped></style>
