import { createStore } from 'vuex';
import firebase from 'firebase';

const store = createStore({
  state() {
    return {
      users: [],
      myWallet: '',
      userName: '',
      updateUserName: '',
      userLoginInfomation: '',
      errorMessage: '',
    };
  },
  getters: {
    getMyWallet: state => state.myWallet.myWallet,
    getUserName: state => state.userName,
    updateUserName: state => state.updateUserName,
    getUser: state => state.users,
  },
  mutations: {
    setUserName(state, user) {
      state.userName = user.displayName;
    },
    updateUserName(state, updateUserName) {
      state.updateUserName = updateUserName;
    },
    getMyWallet(state, doc) {
      state.myWallet = doc.data();
      console.log(doc.data())
    },
    async getUsers(state, snapshot) {
      await state.users.splice(0);
      await snapshot.forEach((doc) => {
        state.users.push(doc.data());
      });
    },
    userLoginInfomation(state, userLoginInfomation) {
      state.userLoginInfomation = userLoginInfomation;
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    async updateBalance(state, { user, money }) {
      const db = firebase.firestore();

      await db.runTransaction(async t => {
        const user = firebase.auth().currentUser;
        //送金される側の処理
        await t.update(db.collection('users').doc(user.docId), {
          wallet: state.users[user.id].wallet + parseInt(money),
        });
        //送金する側の処理
        await t.update(db.collection('myData').doc('H6cABQw9IDXukCpCtuwxpppFvgx1'), {
          wallet: state.myWallet.wallet - money,
        });
      });
      //state.{users,myWallet}の値を更新
      state.users[user.id].wallet =+ state.users[user.id].wallet + parseInt(money);
      state.myWallet.wallet = state.myWallet.wallet - money;
    },
  },
  actions: {
    async signUp({ commit }, userInfomation) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            userInfomation.email,
            userInfomation.password
          );
        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: userInfomation.username,
        });
        await commit('setUserName', user);
      } catch (e) {
        alert(e.message);
      }
    },
    //ログイン処理
    async login({ commit }, userInfomation) {
      commit('userLoginInfomation', userInfomation);
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(
            userInfomation.email,
            userInfomation.password
          );
      } catch (e) {
        commit('setErrorMessage', e.message);
        alert(e.message);
      }
    },
    //ログアウト処理
    async logOut({ commit }) {
      try {
        await firebase.auth().signOut();
      } catch (e) {
        commit('setErrorMessage', e.message);
        alert(e.message);
      }
    },
    updateBalance({ commit }, { user, money }) {
      commit('updateBalance', { user, money });
    },
    updateUserName({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('updateUserName', user.displayName);
        }
      });
    },
    //firestoreから自身の残高情報を取得
    async getMyWallet({ commit }, uid) {
      const db = firebase.firestore();
      const doc = await db
        .collection('myData')
        .doc(uid)
        .get();
      commit('getMyWallet', doc);
    },
    //firestoreからユーザー情報を取得
    async getUsers({ commit }) {
      const db = firebase.firestore();
      const snapshot = await db
        .collection('users')
        .orderBy('id')
        .get();
      commit('getUsers', snapshot);
    },
  },
});

export default store;