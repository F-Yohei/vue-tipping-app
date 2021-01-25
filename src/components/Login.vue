<template>
  <div>
    <h1>ログイン画面</h1>
    <form>
      <ul>
        <li class="email">
          <label for="email">メールアドレス</label>
          <input type="email" id="email" placeholder="E-mail" />
        </li>
        <li class="password">
          <label for="password">パスワード</label>
          <input type="password" id="password" placeholder="PassWord" />
        </li>
      </ul>
    </form>

    <button>ログイン</button>
    <br />
    <router-link to="/signup" tag="a">新規登録はこちらから</router-link>

  </div>
</template>

<script>
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
