<template>
  <div>
    <h1>新規登録画面</h1>
    <form>
      <ul>
        <li class="user-name">
          <label for="user-name">ユーザー名</label>
          <input type="text" id="user-name" placeholder="UserName" v-model="username" />
        </li>
        <li class="email">
          <label for="email">メールアドレス</label>
          <input type="email" id="email" placeholder="E-mail" v-model="email" />
        </li>
        <li class="password">
          <label for="password">パスワード</label>
          <input type="password" id="password" placeholder="PassWord" v-model="password" />
        </li>
      </ul>
    </form>

    <button @click="register">新規登録</button>
    <br />
    <router-link to="/" tag="a">ログインはこちらから</router-link>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: this.username
        });
        //ユーザー名をFirebaseへ格納した後、非同期処理でstoreへ渡し、ログイン後画面へ遷移する
        this.$store.dispatch('updataUser', user);
        this.$router.push('/home');
      } catch (e) {
        alert(e.message);
      }
    }
  }
};
</script>


<style scoped>
form {
  margin-bottom: 40px;
}
ul > li {
  list-style: none;
  width: 20%;
  margin: 0 auto;
}

label {
  width: 110px;
  float: left;
}

button {
  padding: 10px 20px;
  color: #0596fc;
  border-color: #0596fc;
  background-color: #fff;
  border-radius: 4px;
  transition: 0.2s;
}

button:hover {
  color: #fff;
  background-color: #0596fc;
}

a {
  text-decoration: none;
  color: #0596fc;
}
</style>