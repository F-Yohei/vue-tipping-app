import { createStore } from 'vuex';


const store = createStore({
    state() {
        return {
            user: ''
        }
    },
    getters: {
        getUserName: state => state.user.displayName
    },
    mutations: {
        updataUser(state, userInformation) {
            state.user = userInformation;
        }
    },
    actions: {
        updataUser(context, userInfomation) {
            context.commit('updataUser', userInfomation)
        }
    }
});


export default store;