<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div class="list-container guest" v-if="guestCase.length > 0">
      <div class="title">Le case in cui sei ospite</div>
      <div class="list">
        <div
          class="list-item"
          v-for="(casa, index) in guestCase"
          :key="casa.nome + index"
          @click="() => selectCasa(casa)"
        >
          {{ casa.nome }}
        </div>
      </div>
    </div>
    <div class="list-container owner" v-if="ownedCase.length > 0">
      <div class="title">Le tue case</div>
      <div class="list">
        <div
          class="list-item"
          v-for="(casa, index) in ownedCase"
          :key="casa.nome + index"
          @click="() => selectCasa(casa)"
        >
          {{ casa.nome }}
        </div>
      </div>
    </div>
    <div class="add" @click="addCasa">Aggiungi una casa</div>
    <div class="transactions">
      <div class="list">
        <div
          class="list-item"
          v-for="transaction in transactions"
          :key="'transaction_' + transaction.timestamp"
        >
          <div class="column">{{ transaction.casaNome }}</div>
          <div class="column">{{ transaction.utenteNome }}</div>
          <div class="column">{{ transaction.transazione }}</div>
          <div class="column">{{ transaction.timestamp }}</div>
          <div class="column">{{ transaction.subtotale }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ComputedRef } from "vue";
import { Casa } from "@/model/Casa";
import { Transaction } from "@firebase/firestore";
import { useRouter } from "vue-router";
import { RouterNames } from "@/router/RouterNames";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const ownedCase: ComputedRef<Casa[]> = computed(
      () => store.getters.getOwnedCase
    );
    const guestCase: ComputedRef<Casa[]> = computed(
      () => store.getters.getGuestCase
    );
    const transactions: ComputedRef<Transaction[]> = computed(
      () => store.getters.getUserTransactions
    );

    const selectCasa = async (casa: Casa) => {
      await store.dispatch("setSelectedCasa", casa);
      router.push({ name: RouterNames.CASA_PAGE });
    };

    const addCasa = () => {
      router.push({ name: RouterNames.CASA_PAGE });
    };

    return {
      ownedCase,
      guestCase,
      transactions,
      selectCasa,
      addCasa,
    };
  },
};
</script>

<style lang="less" src="./UserPage.less" scoped></style>
