<template>
  <div style="padding: 10px; border: solid 1px #eee8d5">
    <el-steps :active="active + 1" finish-status="success">
      <el-step title="步骤 1" description="试卷总览"></el-step>
      <el-step title="步骤 2" description="添加题目"></el-step>
      <el-step title="步骤 3" description="试卷提交"></el-step>
    </el-steps>

    <el-form v-show="active === 0" ref="form" :model="form" label-width="80px" style="width: 100%;">
      <el-row>
        <el-col span="10">
          <el-form-item label="试卷名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="10">
          <el-form-item label="试卷类型">
            <el-select v-model="form.examType" placeholder="请选择试卷类型">
              <el-option label="班级试卷" value="班级试卷"></el-option>
              <el-option label="学生个人试卷" value="学生个人试卷"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="10">
          <el-form-item label="班级">
            <el-select v-model="form.classBelonging" @change="changeClassBelonging">
              <el-option v-for="item in classInfo" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="10">
          <el-form-item label="学生列表">
            <div v-if="form.studentList.length === 0 && form.classBelonging === ''" style="color: red">
              请先选择班级
            </div>
            <div v-else-if="form.studentList.length === 0 && form.classBelonging !== ''" style="color: red">
              该班暂无学生
            </div>
            <el-checkbox-group v-else v-model="form.studentChosenList">
              <el-checkbox
                v-for="(item, index) in form.studentList"
                :key="index"
                :label="item"
                :value="form.studentChosenId[index]"
                name="type"
              >
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-form-item label="学科">-->
      <!--  <el-input v-model="form.major" style="width: 25%;" placeholder="请输入学科"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="章节">-->
      <!--  <el-input v-model="form.chapter" style="width: 25%;" placeholder="请输入章节"></el-input>-->
      <!--</el-form-item>-->
      <el-row>
        <el-col span="10">
          <el-form-item label="学科">
            <el-select v-model="form.majorId" placeholder="请选择学科" @change="loadChapterData">
              <el-option v-for="(item, index) in majors" :key="index" :label="item.majorName" :value="item.majorId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="10">
          <el-form-item label="章节  ">
            <el-select v-model="form.chapterId" placeholder="请先选择学科" :disabled="form.majorId === ''">
              <el-option v-for="(item, index) in chaptersShow" :key="index" :label="item.chapterName" :value="item.chapterId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="考试时间">
        <el-col :span="5">
          <el-date-picker v-model="form.startEndDate" type="datetimerange" range-separator="至" placeholder="选择日期" style="width: 100%;" value-format="timestamp"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.note" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <el-form v-show="active === 1">
      <el-form ref="form" label-width="100px">
        <el-form-item v-for="(item, index) in tableData" :key="index">
          <QuestionAnswerCreate
            :id="'question-'+ item.itemOrder"
            :q-type-str="item.exerciseType"
            :chapter-id="item.chapterId"
            :chapter-name="item.chapterName"
            :major-name="item.majorName"
            :question-overview="item[item.exerciseType + 'Tea']"
            :exercise-value="item.exerciseValue"
            class="record-answer-info"
            @getExerciseId="getExerciseId"
          />
        </el-form-item>
      </el-form>
    </el-form>
    <el-form v-show="active === 2">
      <h2 style="text-align:center;">试卷预览</h2>
      <!-- 试卷预览以及确认创建试卷 -->
      <el-form ref="form" label-width="100px">
        <el-form-item v-for="(item, index) in tableData" :key="index">
          <QuestionAnswerEdit
            v-if="item[item.exerciseType + 'Tea'].status === '已选择'"
            :id="'question-'+ item.itemOrder"
            :q-type-str="item.exerciseType"
            :chapter-id="item.chapterId"
            :chapter-name="item.chapterName"
            :major-name="item.majorName"
            :question-overview="item[item.exerciseType + 'Tea']"
            :exercise-value="item.exerciseValue"
            class="record-answer-info"
          />
        </el-form-item>
      </el-form>
      <el-button @click="createExam">创建试卷</el-button>
    </el-form>
    <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import {getChapterByMajorId, getClassList, getClassStudentList, getMajorList} from "@/api/common"
import { getExerciseByMajorIdAndChapterId } from "@/api/exercises"
import {questionMap} from "utils/questionMap"
import {createExam} from "@/api/exam/publishPaper"
import QuestionAnswerShow from "components/exam/QuestionAnswerShow"
import QuestionAnswerCreate from "components/exam/QuestionAnswerCreate"
import QuestionAnswerEdit from "components/exam/QuestionAnswerEdit"

export default {
  name: "ExamForm",
  components: {
    QuestionAnswerShow,
    QuestionAnswerCreate,
    QuestionAnswerEdit
  },
  data() {
    return {
      questionMap: questionMap,
      active: 0,
      tableData: [],
      form: {
        name: '',
        examType: '',
        startEndDate: '',
        major: '',
        chapter: '',
        studentList: [],
        studentChosenList: [],
        studentChosenId: [],
        note: '',
        classBelonging: '',
      },
      classInfo: [],
      classIdMapStudentId: {},
      chosenExerciseId: [],
      majors: [],
      chapters: {},
      chaptersShow: []
    }
  },
  created() {
    getClassList()
    .then(res => {
      this.classInfo = res.data
    })
    getMajorList()
    .then(res => {
      this.majors = res.data
      console.log(this.majors)
    })
  },
  methods: {
    loadChapterData(majorId) {
      if (this.chapters[majorId] === undefined) {
        let formData = new window.FormData()
        formData.append('majorId', majorId)
        getChapterByMajorId(formData)
        .then(res => {
          console.log(res);
          this.chapters[majorId] = res.chapters
          this.chaptersShow = res.chapters
        })
      } else {
        this.chaptersShow = this.chapters[majorId]
      }
    },
    getExerciseId(exerciseIdAndFlag) {
      if (exerciseIdAndFlag.flag === 1) {
        this.chosenExerciseId.push(exerciseIdAndFlag.exerciseId)
      } else if (exerciseIdAndFlag.flag === 2) {
        this.chosenExerciseId.splice(this.chosenExerciseId.indexOf(exerciseIdAndFlag.exerciseId), 1)
      }
      // for debug
      // console.log(this.chosenExerciseId)
    },
    createExam() {
      let Obj = {
        examName: this.form.name,
        examBeginTime: this.form.startEndDate[0],
        examEndTime: this.form.startEndDate[1],
        majorId: this.form.majorId,
        chapterId: this.form.chapterId,
        userId: this.form.studentChosenId,
        exerciseId: this.chosenExerciseId
      }
      createExam(Obj)
      .then(res => {
        if (res.status === 100) {
          this.$message.success('发布成功')
        }
      })
      .catch(error => {
        this.$message.error(error || '发布失败')
      })
      this.chosenExerciseId = []
    },
    changeClassBelonging(classId) {
      let formData = new window.FormData()
      formData.append('classId', classId)
      getClassStudentList(formData)
      .then(res => {
        this.form.studentChosenList = []
        this.form.studentList = []
        this.form.studentChosenId = []
        res = res.students
        for (let i=0;i<res.length;i++) {
          this.form.studentChosenId.push(res[i].userId)
          this.form.studentList.push(res[i].name)
        }
      })
    },
    onSubmit() {
      let formData  = new window.FormData()
      formData.append('majorId', this.form.majorId)
      formData.append('chapterId', this.form.chapterId)
      getExerciseByMajorIdAndChapterId(formData)
      .then(res => {
        if (res.status === 100) {
          this.$message.success('创建成功，请进行下一步操作')
          res = res.data
          this.tableData = []
          for (let i=0;i<res.length;i++) {
            let exerciseType = res[i].exerciseType
            res[i][exerciseType + 'Tea'].exerciseType = questionMap(exerciseType)
            res[i][exerciseType + 'Tea'].status = '未选择'
            res[i][exerciseType + 'Tea'].itemOrder = i + 1
            this.tableData.push(res[i])
            // this.tableData.push(res[i][exerciseType + 'Tea'])
          }
          console.log(this.tableData)
        }
      })
      .catch(error => {
        this.$message.error(error || '创建失败')
      })
    },
    next() {
      if (this.active >= 2) {
        this.$message.error('步骤已完毕')
      } else {
        this.active++
      }
    },
    previous() {
      if (this.active - 1 < 0) {
        this.$message.error('无法回退')
      } else {
        this.active--
      }
    }
  }
}
</script>

<style scoped>

</style>
