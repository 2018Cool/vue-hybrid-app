<template>
  <wb-content :has-header="false" :watermarks="false">
    <div class="my-login d-flex flex-column align-items-center p-4">
      <img src="@/assets/logo.png" class="logo-style slow-up">
      <div class="inpu-div fade-in">
        <van-field
          v-model="username"
          clearable
          size="large"
          placeholder="用户名"
          :spellcheck="false"
          :style="{borderColor:input1Focus?'#3d9efd':'#ececec'}"
          @focus="input1Focus=true"
          @blur="input1Focus=false"
          @keyup.enter="login"
        />
        <van-field
          v-model="password"
          clearable
          size="large"
          type="password"
          placeholder="密码"
          :spellcheck="false"
          :style="{borderColor:input2Focus?'#3d9efd':'#ececec'}"
          @focus="input2Focus=true"
          @blur="input2Focus=false"
          @keyup.enter="login"
        />
        <van-button
          type="info"
          :loading="loading"
          loading-type="spinner"
          loading-text="登录中..."
          class="my-4"
          block
          :disabled="btnDisable"
          @click="login"
        >
          登录
        </van-button>
      </div>
    </div>
  </wb-content>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      input1Focus: false,
      input2Focus: false,
      btnDisable: true,
      loading: false
    }
  },
  watch: {
    username(val) {
      this.btnDisable = val.trim().length === 0 || this.password.length === 0
    },
    password(val) {
      this.btnDisable = val.trim().length === 0 || this.username.length === 0
    }
  },
  beforeMount() {
    const userInfo = this.$store.getters.userInfo
    if (userInfo) {
      this.username = userInfo.id || ''
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('Login', { username: this.username, password: this.password }).then(() => {
        this.loading = false
        this.$router.replace('/projects')
      }).catch(() => {
        this.loading = false
      })
    }
  }

}
</script>

<style lang="scss">
  .my-login {
    .van-cell:not(:last-child)::after {
      display: none;
    }
    .van-button{
      border-radius: 10px;
    }
    .van-cell {
      border-bottom: 1px solid #ececec;
    }
    .inpu-div {
      width: 100%;
      max-width: 400px;
    }
    .logo-style {
      margin-top: 5vh;
      width: 26vw;
      max-width: 120px;
    }
  }

  .slow-up {
    animation-delay: 0.2s;
    animation-duration: 0.8s;
    animation-fill-mode: both;
    transform: translateZ(0);
    animation-name: up;
    will-change: transform;
  }

  .fade-in {
    animation-delay: 0.8s;
    animation-duration: 1s;
    animation-fill-mode: both;
    transform: translateZ(0);
    animation-name: fadeIn;
    will-change: transform;
  }

  @keyframes up {
    from {
      transform: scale(1.5) translate3d(0, 18vh, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

</style>
