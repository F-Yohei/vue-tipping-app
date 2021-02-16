import { createStore } from 'vuex';
import firebase from 'firebase';

const store = createStore({
  state() {
    return {
      users:[
        {userName: 'test1', wallet: 500},
        {userName: 'test2', wallet: 1000},
        {userName: 'test3', wallet: 1500},
        {userName: 'test4', wallet: 2000},
      ],
      userName: '',
      updateUserName: '',
      userLoginInfomation: '',
      errorMessage: ''
    };
  },
  getters: {
    getUserName: (state) => state.userName,
    updateUserName: (state) => state.updateUserName,
  },
  mutations: {
    setUserName(state, user) {
      state.userName = user.displayName;
    },
    updateUserName(state, updateUserName) {
      state.updateUserName = updateUserName;
    },
    userLoginInfomation(state, userLoginInfomation) {
        state.userLoginInfomation = userLoginInfomation
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
  },
  actions: {
    async signUp({ commit }, userInfomation) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(userInfomation.email,userInfomation.password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: userInfomation.username,
        });
        commit('setUserName', user);
      } catch (e) {
        alert(e.message);
      }
    },
    updateUserName({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('updateUserName', user.displayName);
        }
      });
    },
    async login({ commit }, userInfomation) {
        commit('userLoginInfomation', userInfomation);
        try {
            await firebase.auth().signInWithEmailAndPassword(userInfomation.email,userInfomation.password);
      } catch (e) {
            commit('setErrorMessage', e.message);
            alert(e.message);
      }
    },
    async logOut({ commit }) {
        try {
            await firebase.auth().signOut();
        } catch(e) {
            commit('setErrorMessage', e.message);
            alert(e.message);
        }
      }
  },
});

export default store;