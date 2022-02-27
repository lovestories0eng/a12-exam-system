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

      </el-form-item>
      <el-form-item label="学生列表">
        <el-checkbox-group v-model="form.studentChosenList">
          <el-checkbox
            v-for="(item, index) in form.studentList"
            :key="index"
            :label="item"
            name="type"
          >
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="考试时长">
        <el-input-number v-model="form.examLastTime" :min="1" :max="300" @change="handleChange"></el-input-number> 分钟
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
          prop="id"
          label="id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="题型"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="题干"
        >
        </el-table-column>
      </el-table>
    </el-form>

    <el-form v-show="active === 2"></el-form>

    <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import {getClassList} from "@/api/common";
export default {
  name: "ExamForm",
  data() {
    return {
      active: 0,
      tableData: [{
        id: '1',
        type: '选择题',
        content: '数据库三级模式中，真正存在的是（ ）。'
      }, {
        id: '2',
        type: '选择题',
        content: '关系数据库中的关键字是指（ ）。'
      }, {
        id: '3',
        type: '选择题',
        content: '数据库的三级模式之间存在的映象关系正确的是（ ）。 数据库三级结构从内到外的三个层次为（ ）。'
      }, {
        id: '4',
        type: '判断题',
        content: '这道编的题目答案是错的。'
      }],
      form: {
        name: '',
        examType: '',
        startEndDate: '',
        major: '',
        chapter: '',
        studentList: ['ycl', 'psh', 'wsy', 'syt', 'czk'],
        studentChosenList: [],
        examLastTime: 0,
        note: ''
      }
    }
  },
  created() {
    getClassList()
    .then(res => {
      console.log(res)
    })
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    },
    handleChange() {
      console.log('value changed')
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
