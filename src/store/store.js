import { createStore } from 'vuex';


const store = createStore({
    state() {
        return {
            user: ''
        }
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        updataUser(state, userInformation) {
            state.user = userInformation;
        }
    }
});


export default store;