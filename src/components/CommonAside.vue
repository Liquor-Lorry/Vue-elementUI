<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#7b68ee"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isFoldMenu"
  >
    <h3 v-show="!isFoldMenu">Lorry后台管理系统</h3>
    <h3 v-show="isFoldMenu">Lorry</h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="index" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span>{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      asideMenu: [
        {
          path: '/',
          label: '首页',
          name: 'home',
          icon: 's-home'
        },
        {
          path: '/video',
          label: '视频管理',
          name: 'video',
          icon: 'video-play'
        },
        {
          path: '/user',
          label: '用户管理',
          name: 'user',
          icon: 'user'
        },
        //有二级页面的情况
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面一'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面二'
            }
          ]
        }
      ]
    }
  },
  computed: {
    //利用计算属性判断是否有children

    //没有children
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    //有children
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    //取到vuex里面的值
    isFoldMenu() {
      return this.$store.state.tab.isFold
    },
    menu() {
      return this.$store.state.tab.menu
    }
  },
  methods: {
    clickMenu(item) {
      //路由跳转
      this.$router.push({ name: item.name })
      //通过commit提交
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
