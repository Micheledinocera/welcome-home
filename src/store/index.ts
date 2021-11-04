import { createStore } from "vuex";
import firebaseStore from "./firebaseStore";

export default createStore({
  state: {
    refreshAppInfo: true as boolean,
  },
  getters: {
    getRefreshAppInfo: (state): boolean => state.refreshAppInfo,
  },
  mutations: {
    setRefreshAppInfo: (state, refreshAppInfo: boolean) =>
      (state.refreshAppInfo = refreshAppInfo),
  },
  actions: {
    setRefreshAppInfo: (context, refreshAppInfo: boolean) =>
      context.commit("setRefreshAppInfo", refreshAppInfo),
  },
  modules: { firebaseStore },
});
