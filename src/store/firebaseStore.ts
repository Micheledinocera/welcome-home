import { vuexfireMutations, firestoreAction } from "vuexfire";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firestore/db";
import { AppInfo } from "@/model/AppInfo";
import { User } from "@/model/User";
import firebase from "firebase/compat/app";
import { Casa } from "@/model/Casa";
import { Transaction } from "@/model/Transaction";

const firebaseStore = {
  state: {
    appInfo: new AppInfo() as AppInfo,
    user: new User() as User,
    ownedCase: [] as Casa[],
    guestCase: [] as Casa[],
    guestsCasa: [] as User[],
    userTransactions: [] as Transaction[],
    casaTransactions: [] as Transaction[],
  },
  getters: {
    getAppInfo: (state: { appInfo: AppInfo }): AppInfo => state.appInfo,
    getUser: (state: { user: User }): User => state.user,
    getOwnedCase: (state: { ownedCase: Casa[] }): Casa[] => state.ownedCase,
    getGuestCase: (state: { guestCase: Casa[] }): Casa[] => state.guestCase,
    getGuestsCasa: (state: { guestsCasa: User[] }): User[] => state.guestsCasa,
    getUserTransactions: (state: {
      userTransactions: Transaction[];
    }): Transaction[] => state.userTransactions,
    getCasaTransactions: (state: {
      casaTransactions: Transaction[];
    }): Transaction[] => state.casaTransactions,
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
    }),
    bindUser: firestoreAction(async (context, uid: string) => {
      const q = query(
        collection(db, User.tableName),
        where(firebase.firestore.FieldPath.documentId(), "==", uid),
        limit(1)
      );
      const getQuerySnapshot = await getDocs(q);
      getQuerySnapshot.forEach((doc) => {
        (context.state as any).user = { uid: uid, ...doc.data() };
      });
    }),
    addUser: firestoreAction(async (context, user: User) => {
      await setDoc(doc(db, User.tableName, user.uid), {
        nome: user.nome,
        email: user.email,
      });
      (context.state as any).user = new User(user);
    }),
    setEmptyUser: (context: any) => {
      context.state.user = new User();
    },
    bindOwnedCase: firestoreAction(async (context, uid: string) => {
      const q = query(
        collection(db, Casa.tableName),
        where("owner.uid", "==", uid)
      );
      onSnapshot(q, (querySnapshot) => {
        (context.state as any).ownedCase = [];
        querySnapshot.forEach((doc) => {
          (context.state as any).ownedCase.push({ id: doc.id, ...doc.data() });
        });
      });
    }),
    bindGuestCase: firestoreAction(async (context, uid: string) => {
      const q = query(
        collection(db, Transaction.tableName),
        where("utenteId", "==", uid)
      );
      onSnapshot(q, async (querySnapshot) => {
        const guestCaseId = [] as string[];
        querySnapshot.forEach((doc) => {
          guestCaseId.push(doc.data().casaId);
        });
        if (guestCaseId.length > 0) {
          const subq = query(
            collection(db, Casa.tableName),
            where(firebase.firestore.FieldPath.documentId(), "in", guestCaseId)
          );
          const getQuerySnapshot = await getDocs(subq);
          (context.state as any).guestCase = [];
          getQuerySnapshot.forEach((doc) => {
            (context.state as any).guestCase.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        } else (context.state as any).guestCase = [];
      });
    }),
    bindGuestsFromCasa: firestoreAction(async (context, casaId: string) => {
      const q = query(
        collection(db, Transaction.tableName),
        where("casaId", "==", casaId)
      );
      onSnapshot(q, async (querySnapshot) => {
        const guestsId = [] as string[];
        querySnapshot.forEach((doc) => {
          guestsId.push(doc.data().utenteId);
        });
        if (guestsId.length > 0) {
          const subq = query(
            collection(db, User.tableName),
            where(firebase.firestore.FieldPath.documentId(), "in", guestsId)
          );
          const getQuerySnapshot = await getDocs(subq);
          (context.state as any).guestsCasa = [];
          getQuerySnapshot.forEach((doc) => {
            (context.state as any).guestsCasa.push({
              uid: doc.id,
              ...doc.data(),
            });
          });
        } else (context.state as any).guestsCasa = [];
      });
    }),
    bindUserTransaction: firestoreAction(async (context, utenteId: string) => {
      const q = query(
        collection(db, Transaction.tableName),
        where("utenteId", "==", utenteId)
        // orderBy("timestamp","desc")
      );

      onSnapshot(q, (querySnapshot) => {
        (context.state as any).userTransactions = [];
        querySnapshot.forEach((doc) => {
          (context.state as any).userTransactions.push(doc.data());
        });
      });
    }),
    bindCasaTransaction: firestoreAction((context, casaId: string) => {
      const q = query(
        collection(db, Transaction.tableName),
        where("casaId", "==", casaId)
        // orderBy("timestamp","desc")
      );
      onSnapshot(q, (querySnapshot) => {
        (context.state as any).casaTransactions = [];
        querySnapshot.forEach((doc) => {
          (context.state as any).casaTransactions.push(doc.data());
        });
      });
    }),
    addCasa: firestoreAction(async (context, casa: Casa) => {
      await addDoc(collection(db, Casa.tableName), {
        owner: casa.owner,
        nome: casa.nome,
      }).then((addedCasa) => {
        (context.rootState as any).selectedCasa = new Casa({
          id: addedCasa.id,
          owner: casa.owner,
          nome: casa.nome,
        });
      });
    }),
    addTransaction: firestoreAction((context, transaction: Transaction) => {
      addDoc(collection(db, Transaction.tableName), transaction);
    }),
  },
};

export default firebaseStore;
