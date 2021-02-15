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
            <button type="button" @click="openModal">walletを見る</button>
            <button type="button">送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button type="button" @click="openModal">walletを見る</button>
            <button type="button">送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button type="button" @click="openModal">walletを見る</button>
            <button type="button">送る</button>
          </form>
        </li>
      </ul>
    </div>

    <div class="overlay" v-show="showContent" @click="closeModal">
      <transition name="modal">
        <div v-show="showContent" class="content">
          <p>○○さんの残高</p>
          <p>5,000円</p>
          <p>
            <button class="close-button" @click="closeModal">Close</button>
          </p>
        </div>
      </transition>
    </div>

    <div class="overlay" v-show="showContent2" @click="closeModal">
      <div class="content">
        <p>あなたの残高：500</p>
        <p>送る金額</p>
        <input type="text" class />
        <p>
          <button class="close-button" @click="closeModal">Close</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: true,
      showContent2: true
    };
  },
  computed: {
    updateUserName() {
      return this.$store.getters.updateUserName;
    }
  },
  // リロードしてもユーザー名が消えないようにする処理
  created() {
    this.$store.dispatch("updateUserName");
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/");
    },
    openModal() {
      this.showContent = true;
      console.log("クリックされました");
    },
    closeModal() {
      this.showContent = false;
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

.overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  z-index: 2;
  width: 20%;
  padding: 1em;
  background-color: #fff;
  position:absolute;
  top:220px;
}

.close-button {
  padding: 5px 10px;
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  top:200px;
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.3s;
}

.modal-enter-to {
  opacity: 1;
  top:220px;
}

.modal-leave-from {
  opacity: 1;
  top:220px;
}
</style>