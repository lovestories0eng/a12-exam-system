<template>
  <div class="header-search show">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <!-- { item }解构数据 -->
      <el-option v-for="{ item } in options" :key="searcherKey(item)" :value="item" :label="searcherLabel(item)" />
    </el-select>
  </div>
</template>

<script>
// Fuse是一个轻量级的模糊搜索模块 使搜索结果更符合预期
import Fuse from 'fuse.js'

export default {
  name: 'HeaderSearch',
  props: {
    searchPool: {
      type: Array,
      default() {
        return []
      }
    },
    searcherMethod: {
      type: Function,
      default() {
        return null;
      }
    },
    searcherKey: {
      type: Function,
      default() {
        return null;
      }
    },
    searcherLabel: {
      type: Function,
      default() {
        return null;
      }
    },
    fuseKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      search: '',
      options: [],
      fuse: undefined
    }
  },
  // 解决数据异步传输获取不到的问题
  watch: {
    searchPool(list) {
      this.initFuse(list)
    }
  },
  created() {
    this.initFuse(this.searchPool)
  },
  methods: {
    change(val) {
      this.searcherMethod(val)
      this.search = ''
      this.options = []
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        // 是否按分数对结果列表排序
        shouldSort: true,
        // 匹配算法阈值。阈值为0.0需要完全匹配（字母和位置），阈值为1.0将匹配任何内容。
        threshold: 0.4,
        // 确定文本中预期找到的模式的大致位置。
        location: 0,
        distance: 100,
        // 模式的最大长度
        maxPatternLength: 32,
        // 模式的最小字符长度
        minMatchCharLength: 1,
        keys: this.fuseKeys
      })
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    v-deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
