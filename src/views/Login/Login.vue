<template>
  <!-- <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div> -->
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/images/lorry.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="form" label-width="0" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <span>用户名</span>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <span>密码</span>
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <!--  按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$http.post('/permission/getMenu', this.form).then(res => {
        res = res.data
        if (res.code === 20000) {
          //先清空 避免二次登陆
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      //console.log(this);
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
// .el-form {
//   width: 50%;
//   margin: auto;
//   padding: 45px;
//   height: 450px;
//   background-color: #fff;
// }
.login_container {
  background-color: #4682b4;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 310px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
