import { Casa } from "@/model/Casa";
import { createStore } from "vuex";
import firebaseStore from "./firebaseStore";

export default createStore({
  state: {
    selectedCasa: new Casa() as Casa,
  },
  getters: {
    getSelectedCasa: (state: any): Casa => state.selectedCasa,
  },
  mutations: {
    setSelectedCasa: (state: any, selectedCasa: Casa) =>
      (state.selectedCasa = selectedCasa),
  },
  actions: {
    setSelectedCasa: (context, selectedCasa: Casa) =>
      context.commit("setSelectedCasa", selectedCasa),
  },
  modules: { firebaseStore },
});
