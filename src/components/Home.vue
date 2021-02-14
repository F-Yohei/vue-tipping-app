<template>
  <div>
    <div class="login-message-area">
      <div>
        <span>{{ updateUserName }}さんようこそ！！</span>
      </div>

      <div>
        <span>残高 : 1000</span>
        <button @click="logOut">ログアウト</button>
      </div>
    </div>

    <h1>ユーザ一覧</h1>

    <div class="user-list-wrapper">
      <h4>ユーザ名</h4>

      <ul class="user-list">
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    updateUserName() {
      return this.$store.getters.updateUserName
    }
  },
  // リロードしてもユーザー名が消えないようにする処理
  created() {
    this.$store.dispatch('updateUserName');
  },
  methods: {
    async logOut() {
        await this.$store.dispatch('logOut');
        this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.login-message-area {
  width: 42%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.login-message-area > div > button {
  margin-left: 10px;
  padding: 5px;
  color: #fff;
  background: #0596fc;
  border-radius: 3px;
  border: #0596fc;
}

.user-list-wrapper {
  width: 35%;
  margin: 0 auto;
}

.user-list-wrapper > h4 {
  text-align: left;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-list > li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.user-list > li > form > button {
  margin-right: 10px;
  color: #fff;
  border: #02b5b3;
  border-radius: 3px;
  background: #02b5b3;
  padding: 5px 10px;
}
</style>