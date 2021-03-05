import { createStore } from 'vuex';
import firebase from 'firebase';

const store = createStore({
  state() {
    return {
      users: [],
      loginUser: '',
      userName: '',
      userLoginInfomation: '',
      errorMessage: '',
    };
  },
  getters: {
    getLoginUser: state => state.loginUser,
    getUserName: state => state.userName,
    getUsers: state => state.users,
  },
  mutations: {
    setUserName(state, user) {
      state.userName = user.displayName;
    },
    getLoginUser(state, doc) {
      state.loginUser = doc.data();

    },
    getUsers(state, snapshot) {
       state.users.splice(0);
       snapshot.forEach((doc) => {
        state.users.push(doc.data());
      });
    },
    userLoginInfomation(state, userLoginInfomation) {
      state.userLoginInfomation = userLoginInfomation;
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
  },
  actions: {
    //Firestoreに新規ユーザーの情報を登録
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
          displayName: userInfomation.userName,
        });
        await commit('setUserName', user);
      } catch (e) {
        alert(e.message);
      }
    },
    //firestoreからログイン中のユーザー情報を取得
    async getLoginUser({ commit }) {
      const user = await firebase.auth().currentUser
      const db = await firebase.firestore();
      const doc = await db
        .collection('users')
        .doc(user.uid)
        .get();
      await commit('getLoginUser', doc);
    },
    //firestoreからログインユーザー以外のユーザー情報を取得
    async getUsers({ commit }) {
      const user = await firebase.auth().currentUser
      const db = await firebase.firestore();
      const snapshot = await db
        .collection('users')
        .where('docId', '!=',user.uid)
        .get()
      commit('getUsers', snapshot);
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
    //残高を更新する為の処理
    async updateBalance({ state }, { user, money }) {
      const db = await firebase.firestore();
      db.runTransaction(async t => {
        const loginUser = await firebase.auth().currentUser;
        //送金される側の処理
        t.update(db.collection('users').doc(user.docId), {
          wallet: user.wallet + parseInt(money),
        });
        //送金する側の処理
        t.update(db.collection('users').doc(loginUser.uid), {
          wallet: state.loginUser.wallet - money,
        });
        // state.loginUserの値を更新
        state.loginUser.wallet = state.loginUser.wallet - money;
      });
    },
  },
});

export default store;