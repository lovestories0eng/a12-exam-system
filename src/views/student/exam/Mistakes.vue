<template>
  <div class="app-contain">
    <el-form>
      <el-form-item>
        <Categories :list="list"></Categories>
        <QuestionAnswerShow v-for="(item, index) in tableData"
                            :key="index"
                            :q-type-str="item.exerciseType"
                            :chapter-id="item.chapterId"
                            :chapter-name="item.chapterName"
                            :major-name="item.majorName"
                            :question-overview="item[item.exerciseType + 'Tea']"
                            :student-answer="item.studentAnswer"
                            :student-value="item.studentValue"
                            :exercise-value="item.exerciseValue"
                            :teacher-message="item.teacherMessage"
                            class="record-answer-info"
        />
        <pagination v-show="total > 0"
                    :total="total"
                    :background="false"
                    :page="queryParam.pageIndex"
                    :limit="queryParam.pageSize"
                    :layout="paginationLayout"
                    style="margin-top: 20px; text-align: center;"
                    @pagination="search(arguments)"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Pagination from '@/components/Pagination'
import Categories from "views/student/exam/mistakes/Categories"
import QuestionAnswerShow from 'components/exam/QuestionAnswerShow'

import {getFlowSweeper} from '@/api/user'
import {unique} from "utils";

export default {
  name: 'MyExam',
  components: { Pagination, QuestionAnswerShow, Categories },
  data () {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      list: [],
      listLoading: false,
      tableData: [],
      total: 0,
      qAnswerLoading: false,
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    paginationLayout() {
      return this.$store.getters.device === 'mobile'? 'prev, pager, next' : 'prev, pager, next, jumper'
    }
  },
  created () {
    this.search()
  },
  methods: {
    search (params) {
      if (params !== undefined) {
        this.pageIndex = params[0].page
        this.pageSize = params[0].limit
      }
      this.listLoading = true
      let _this = this
      getFlowSweeper().then(response => {
        const re = response.data
        console.log(re);
        re.forEach(item => {
          _this.list.push(item.majorName)
        })
        _this.list = unique(_this.list)
        _this.tableData = re
        _this.total = re.length
        _this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
  .app-contain {
    padding: 30px 0 0 0;
  }
}


@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .app-contain {
    padding: 30px 30px 0 30px;
  }
}


@media only screen and (min-width: 1200px) {
  .app-contain {
    padding: 30px 100px 0 100px;
  }
}

.record-answer-info {
  margin-top: 25px;
  min-height: 200px;

  .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>

