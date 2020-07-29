<template>
  <div class="CommonTab">
    <el-tag
      :key="tag.name"
      v-for="tag in tabs"
      size="mini"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'light'"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    ...mapState({
      tabs: state => state.tab.tabList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTab'
    }),
    handleClose(tag) {
      this.close(tag)
    },
    changeMenu(item) {
      //路由跳转
      this.$router.push({ name: item.name })
      //通过commit提交
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.CommonTab {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
