<template>
  <el-form :inline="true" :model="form" ref="form" label-width="100px">
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
      <el-input v-model="form[item.model]" :placeholder="'请输入' + item.label" v-if="!item.type"> </el-input>
      <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'">
        <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-switch v-if="item.type === 'switch'" v-model="form[item.model]"></el-switch>
      <el-date-picker
        v-model="form[item.model]"
        type="date"
        value-format="yyyy-MM-dd"
        format="yyyy 年 MM 月 dd 日"
        placeholder="选择日期"
        v-if="item.type === 'date'"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    //默认为false 传入即为true
    inline: Boolean,
    form: Object,
    formLabel: Array
  },
  data() {
    return {}
  }
}
</script>
<style></style>
