<template>
  <div class="header">
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu" size="mini" circle @click="foldMenu"></el-button>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img class="userImg" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-remove" @click.native="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  computed: {
    ...mapState({
      current: state => state.tab.clickMenu
    })
  },
  methods: {
    foldMenu() {
      this.$store.commit('foldMenu')
    },
    loginOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #dda0dd;
    font-weight: 400;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #f5f5dc;
      font-weight: 400;
    }
  }
}
</style>
