<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" description="试卷总览"></el-step>
      <el-step title="步骤 2" description="添加题目"></el-step>
      <el-step title="步骤 3" description="试卷提交"></el-step>
    </el-steps>

    <el-form v-show="active === 0" ref="form" :model="form" label-width="80px">
      <el-form-item label="试卷名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="试卷类型">
        <el-select v-model="form.examType" placeholder="请选择试卷类型">
          <el-option label="班级试卷" value="班级试卷"></el-option>
          <el-option label="学生个人试卷" value="学生个人试卷"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="考试时间">
        <el-col :span="5">
          <el-date-picker v-model="form.startEndDate" type="datetimerange" range-separator="至" placeholder="选择日期" style="width: 100%;" value-format="timestamp"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="form.classBelonging" @change="changeClassBelonging">
          <el-option v-for="item in classInfo" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="学科">
        <el-input v-model="form.major" style="width: 25%;" placeholder="请输入学科"></el-input>
      </el-form-item>
      <el-form-item label="章节">
        <el-input v-model="form.chapter" style="width: 25%;" placeholder="请输入章节"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.note" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
    <el-form v-show="active === 1">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="exerciseId"
          label="id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="exerciseType"
          label="题型"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="question"
          label="题干"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.status === '未选择'" style="color: red;">
              {{ scope.row.status }}
            </div>
            <div v-else>
              {{ scope.row.status }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.$index, tableData)"
            >
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-form v-show="active === 2">
      <el-button @click="createExam">创建试卷</el-button>
    </el-form>
    <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import {getClassList, getClassStudentList} from "@/api/common"
import { getExerciseByMajorIdAndChapterId } from "@/api/exercises"
import {questionMap} from "utils/questionMap";
import {createExam} from "@/api/exam/publishPaper";
export default {
  name: "ExamForm",
  data() {
    return {
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
      chosenExerciseId: []
    }
  },
  created() {
    getClassList()
    .then(res => {
      this.classInfo = res.data
    })
  },
  methods: {
    handleClick(index, scope) {
      if (scope[index].status === '未选择') {
        scope[index].status = '已选择'
        this.chosenExerciseId.push(scope[index].exerciseId)
      }
      else {
        scope[index].status = '未选择'
        let tempData = scope[index].exerciseId
        this.chosenExerciseId.splice(this.chosenExerciseId.indexOf(tempData), 1)
      }
    },
    createExam() {
      let Obj = {
        examName: this.form.name,
        examBeginTime: this.form.startEndDate[0],
        examEndTime: this.form.startEndDate[1],
        majorId: this.form.major,
        chapterId: this.form.chapter,
        userId: this.form.studentChosenId,
        exerciseId: this.chosenExerciseId
      }
      createExam(Obj)
      .then(res => {
        console.log(Obj)
        console.log(res)
      })
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
      formData.append('majorId', this.form.major)
      formData.append('chapterId', this.form.chapter)
      getExerciseByMajorIdAndChapterId(formData)
      .then(res => {
        res = res.data
        this.tableData = []
        for (let i=0;i<res.length;i++) {
          let exerciseType = res[i].exerciseType
          res[i][exerciseType + 'Tea'].exerciseType = questionMap(exerciseType)
          res[i][exerciseType + 'Tea'].status = '未选择'
          this.tableData.push(res[i][exerciseType + 'Tea'])
        }
      })
    },
    next() {
      if (this.active > 2) {
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
