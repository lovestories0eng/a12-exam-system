<template>
  <div class="wrapper" style="box-shadow: 0 2px 15px rgba(0, 0, 255, .2); padding: 10px;">
    <el-form>
      <el-form-item label="试题类型">
        <el-select v-model="form.exerciseType" placeholder="请选择试题类型">
          <el-option label="单选题" :value="questionMap('单选题')"></el-option>
          <el-option label="多选题" :value="questionMap('多选题')"></el-option>
          <el-option label="填空题" :value="questionMap('填空题')"></el-option>
          <el-option label="判断题" :value="questionMap('判断题')"></el-option>
          <el-option label="解答题" :value="questionMap('解答题')"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科  ">
        <el-select v-model="form.majorId" style="width: 25%;" placeholder="请选择学科" @change="loadChapterData">
          <el-option v-for="(item, index) in majors" :key="index" :label="item.majorName" :value="item.majorId"></el-option>
        </el-select>
        <!--<el-input v-model="form.majorId" style="width: 25%;" placeholder="请输入学科"></el-input>-->
      </el-form-item>
      <el-form-item label="章节  ">
        <el-select v-model="form.chapterId" style="width: 25%;" placeholder="请先选择学科" :disabled="form.majorId === ''">
          <el-option v-for="(item, index) in chaptersShow" :key="index" :value="item.chapterId" :label="item.chapterName"></el-option>
        </el-select>
        <!--<el-input v-model="form.chapterId" style="width: 25%;" placeholder="请选择章节"></el-input>-->
      </el-form-item>
      <el-form-item label="分值  ">
        <el-input v-model="form.exerciseValue" style="width: 25%;"></el-input>
      </el-form-item>
      <el-form-item label="难度  ">
        <el-rate v-model="form.exerciseHard" style="margin-top: 11px"></el-rate>
      </el-form-item>
      <el-form-item label="题目">
        <!--<el-input v-model="variable.question" style="width: 25%;"></el-input>-->
        <el-upload
          action="#"
          :show-file-list="false"
          :http-request="uploadImg"
        >
          <el-button
            type="success"
            plain
            round
            size="big"
          >
            上传题目图片
          </el-button>
        </el-upload>
        <mavon-editor
          ref="md"
          v-model="variable.question"
          :external-link="externalLink"
          class="mavon-editor-question"
          :autofocus="false"
          default-open="preview"
          :editable="true"
          :subfield="true"
          :style="{'width': '100%', 'margin-top': '10px'}"
          @imgAdd="imgAdd"
        >
        </mavon-editor>
      </el-form-item>
      <div v-if="form.exerciseType === 'choice4'">
        <el-form-item v-for="(item, index) in 4" :key="item" label="选项">
          {{ choice4Objects[index] + '：' }}
          <mavon-editor
            v-model="variable['option' + item]"
            :external-link="externalLink"
            class="mavon-editor-choice-option"
            :autofocus="false"
            default-open="preview"
            :editable="true"
            :subfield="true"
            :style="{'width': '100%', 'margin-top': '10px'}"
          >
          </mavon-editor>
        </el-form-item>
      </div>
      <div v-else-if="form.exerciseType === 'choice5'">
        <el-form-item v-for="(item, index) in 5" :key="item" label="选项">
          {{ choice5Objects[index] + '：' }}
          <mavon-editor
            v-model="variable['option' + item]"
            :external-link="externalLink"
            class="mavon-editor-choice-option"
            :autofocus="false"
            default-open="preview"
            :editable="true"
            :subfield="true"
            :style="{'width': '100%', 'height': '100px', 'margin-top': '10px'}"
          >
          </mavon-editor>
        </el-form-item>
      </div>
      <el-form-item label="正确答案">
        <mavon-editor
          v-if="subjectiveQuestion.indexOf(form.exerciseType) !== -1"
          v-model="variable.rightAnswer"
          :external-link="externalLink"
          class="mavon-editor-subject-answer"
          :autofocus="false"
          default-open="preview"
          :editable="true"
          :subfield="true"
          :style="{'width': '100%', 'margin-top': '10px'}"
        >
        </mavon-editor>
        <el-select v-else-if="form.exerciseType === 'choice4'" v-model="variable.rightAnswer" style="width: 25%;">
          <el-option v-for="item in choice4Objects" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-else-if="form.exerciseType === 'choice5'" v-model="variable.rightAnswer" style="width: 25%;">
          <el-option v-for="item in choice5Objects" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-else-if="form.exerciseType === 'judge'" v-model="variable.rightAnswer" style="width: 25%;">
          <el-option v-for="item in judgeObjects" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目解析">
        <!--<el-input v-model="variable.analyse" style="width: 25%;"></el-input>-->
        <mavon-editor
          v-model="variable.analyse"
          :external-link="externalLink"
          class="mavon-editor-analyze"
          :autofocus="false"
          default-open="preview"
          :editable="true"
          :subfield="true"
          :style="{'width': '100%', 'margin-top': '10px'}"
        >
        </mavon-editor>
      </el-form-item>
      <el-button @click="submitExercise">创建题目</el-button>
    </el-form>
  </div>
</template>

<script>
import {questionMap} from "utils/questionMap"
import { createExercise, createExercisePicture } from "@/api/exercises"
import { getMajorList, getChapterByMajorId } from "@/api/common";
import {updateImage} from "@/api/user";

export default {
  name: "ExerciseForm",
  data() {
    return {
      externalLink: this.$externalLink,
      // 客观题
      objectiveQuestion: ['judge', 'choice4', 'choice5'],
      // 主观题
      subjectiveQuestion: ['fill', 'solve'],
      choice4Objects: ['A', 'B', 'C', 'D'],
      choice5Objects: ['A', 'B', 'C', 'D', 'E'],
      judgeObjects: ['对', '错'],
      questionMap: questionMap,
      form: {
        exerciseType: 'choice4',
        majorId: '',
        chapterId: '',
        exerciseHard: 1,
        exerciseValue: 1,
      },
      variable: {
        question: "请输入题目",
        rightAnswer: "",
        option1: "选项A内容",
        option2: "选项B内容",
        option3: "选项C内容",
        option4: "选项D内容",
        option5: "选项E内容",
        analyse: "题目解析"
      },
      majors: [],
      chapters: {},
      chaptersShow: [],
      imageFiles: []
    }
  },
  created() {
    getMajorList()
    .then(res => {
      this.majors = res.data
    })
  },
  methods: {
    uploadImg(f){
      let formData = new window.FormData()
      formData.append('picture', f.file)
      createExercisePicture(formData)
        .then(res => {
          if (res.status === 100){
            this.$message.success('上传成功')
            this.imageFiles.push(res.pictureUrl)
            if (this.imageFiles.length === 1)
              this.variable.question += '\n' + "![]" + '(' + res.pictureUrl + ')'
            else
              this.variable.question += "![]" + '(' + res.pictureUrl + ')'
          }
        })
        .catch(error => {
          this.$message.error('提交失败')
          console.log(error)
        })

    },
    imgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      let formData = new FormData();
      formData.append('picture', $file);
      createExercisePicture(formData).then(response => {
        if (response.status === 100) {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          this.$refs.md.$img2Url(pos, response.pictureUrl);
        } else {
          this.$message.error(response.message || 'Error');
        }
      });
    },
    imgDel(pos, url) {
      console.log(pos)
      console.log(url)
    },
    loadChapterData(majorId) {
      if (this.chapters[majorId] === undefined) {
        let formData = new window.FormData()
        formData.append('majorId', majorId)
        getChapterByMajorId(formData)
        .then(res => {
          this.chapters[majorId] = res.chapters
          this.chaptersShow = res.chapters
        })
      } else {
        this.chaptersShow = this.chapters[majorId]
      }
    },
    submitExercise() {
      this.form[this.form.exerciseType + 'Tea'] = this.variable
      createExercise(this.form)
      .then(res => {
        this.$message.success('题目成功创建')
        window.location.reload()
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 20px auto;
  width: 85%;
}

/deep/ img {
  margin: auto;
  width: 25%;
}
</style>
