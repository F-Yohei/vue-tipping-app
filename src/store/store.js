import { createStore } from 'vuex';
import firebase from 'firebase';

const store = createStore({
  state() {
    return {
      users:[
        {id: 0, userName: 'test1', wallet: 500},
        {id: 1, userName: 'test2', wallet: 1000},
        {id: 2, userName: 'test3', wallet: 1500},
        {id: 3, userName: 'test4', wallet: 2000},
      ],
      userName: '',
      updateUserName: '',
      userLoginInfomation: '',
      myBalance: '1000',
      errorMessage: '',
    };
  },
  getters: {
    getUserName: state => state.userName,
    updateUserName: state => state.updateUserName,
    getUser: state => state.users,
    myBalance: state => state.myBalance
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
    updateBalance(state, { user, money }) {
      state.users[user.id].wallet =+ state.users[user.id].wallet + parseInt(money);
      state.myBalance = state.myBalance - money;
    }
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
      },
      updateBalance({ commit }, { user, money }) {
        commit('updateBalance', { user, money });
      }
  }
});

export default store;