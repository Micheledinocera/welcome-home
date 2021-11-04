import { vuexfireMutations, firestoreAction } from "vuexfire";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firestore/db";
import { AppInfo } from "@/model/AppInfo";
import { User } from "@/model/User";
import firebase from "firebase/compat/app";

const firebaseStore = {
  state: {
    appInfo: new AppInfo() as AppInfo,
    user: new User() as User,
  },
  getters: {
    getAppInfo: (state: { appInfo: AppInfo }): AppInfo => state.appInfo,
    getUser: (state: { user: User }): User => state.user,
  },
  mutations: vuexfireMutations,
  actions: {
    bindAppInfo: firestoreAction((context) => {
      const q = query(collection(db, AppInfo.tableName));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          (context.state as any).appInfo = doc.data();
        });
      });
      // context.bindFirestoreRef(
      //   "appInfo",
      //   db.collection(AppInfo.tableName).limit(1),
      //   {
      //     wait: true,
      //     serialize: (snapshot) => {
      //       setTimeout(() => {
      //         context.commit("setRefreshAppInfo", false);
      //         context.commit("setRefreshAppInfo", true);
      //       }, 100);
      //       return snapshot.data();
      //     },
      //   }
      // );
      // .then((data) => {
      // if (
      //   Utils.isIos() &&
      //   Utils.isInStandaloneMode() &&
      //   data[0].version > window.localStorage.getItem(Utils.APP_VERSION)!
      // ) {
      //   if ("serviceWorker" in navigator) {
      //     navigator.serviceWorker
      //       .getRegistrations()
      //       .then(function (registrations) {
      //         for (const registration of registrations) {
      //           registration.update();
      //         }
      //       });
      //   }
      // }
    }),
    setUser: firestoreAction(async (context, uid) => {
      const q = query(
        collection(db, User.tableName),
        where(firebase.firestore.FieldPath.documentId(), "==", uid),
        limit(1)
      );
      debugger;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        (context.state as any).user = doc.data();
      });
    }),
    addUser: firestoreAction(async (context, user) => {
      await setDoc(doc(db, User.tableName, user.uid), user.user);
      (context.state as any).user = user.user;
    }),
  },
};

export default firebaseStore;
