<template>
  <div class="select-wrapper">
    <el-select v-model="value" placeholder="请选择" @change="handleSelect">
      <el-option
        v-for="item in options"
        :key="item.label"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    subjects: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      options: [],
      value: ''
    }
  },
  // 解决异步传输数据无法获取到的问题
  watch: {
    subjects(value) {
      this.options = []
      for (let i=0;i<value.length;i++) {
        this.options.push({label: value[i]})
      }
    }
  },
  created() {
    if (this.subjects.length !== 0) {
      for (let i=0;i<this.subjects.length;i++) {
        this.options.push({label: this.subjects[i]})
      }
    }
  },
  methods: {
    handleSelect(value) {
      this.$emit('changeOption', value)
    }
  }
}
</script>

<style scoped>
  .select-wrapper {
    text-align: center;
  }
</style>
