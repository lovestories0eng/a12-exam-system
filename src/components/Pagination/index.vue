<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <!--
      pageSize 改变时会触发 size-change 回调参数为每页条数
      currentPage 改变时会触发 current-change 回调参数为当前页
      使用了size-change和current-change事件来处理页码大小和当前页变动时候触发的事件。
      page-sizes接受一个整型数组，数组元素为展示的选择每页显示个数的选项，[100, 200, 300, 400]表示四个选项，
      每页显示 100 个，200 个，300 个或者 400 个。
    -->
    <el-pagination
      :background="background"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return [5, 10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
}
.pagination-container.hidden {
  display: none;
}
</style>
