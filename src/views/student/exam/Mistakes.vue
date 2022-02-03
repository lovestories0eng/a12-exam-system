<template>
  <div class="app-contain">
    <el-form>
      <el-form-item>
        <Categories :list="list"></Categories>
        <QuestionAnswerShow v-for="(item, index) in processedData"
                            :key="index"
                            :q-type="item.questionType"
                            :q-type-str="item.questionTypeStr"
                            :subject-name="item.subjectName"
                            :question="item.questionItem"
                            :answer="item.answerItem"
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
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import Categories from "views/student/exam/mistakes/Categories";
import questionAnswerApi from '@/api/mistakes'
import QuestionAnswerShow from 'components/exam/QuestionAnswerShow'

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
      processedData: []
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
    this.getList()
  },
  methods: {
    getList() {
      questionAnswerApi.select('student').then(data => {
        data = data.response.response
        this.list = data
        }
      )
    },
    search (params) {
      if (params !== undefined) {
        this.pageIndex = params[0].page
        this.pageSize = params[0].limit
      }
      this.listLoading = true
      let _this = this
      questionAnswerApi.pageList(this.queryParam).then(data => {
        data = data.response
        const re = data.response
        console.log(JSON.stringify(re));
        _this.tableData = re.list
        _this.total = re.total
        _this.queryParam.pageIndex = re.pageNum
        _this.listLoading = false
        if (re.list.length !== 0) {
          _this.initData()
        }
      })
    },
    initData() {
      // 清空上一页的数据，存储下一页的数据
      this.processedData = []
      for (let i of this.tableData) {
        let temp_obj = {}
        temp_obj.questionType = i.questionAnswerVM.questionVM.questionType
        temp_obj.questionItem = i.questionAnswerVM.questionVM
        temp_obj.answerItem = i.questionAnswerVM.questionAnswerVM
        temp_obj.questionTypeStr = i.questionTypeStr
        temp_obj.subjectName = i.subjectName
        this.processedData.push(temp_obj)
      }
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

