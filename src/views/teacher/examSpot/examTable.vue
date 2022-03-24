<template>
  <div v-if="allExamInfo" class="examTable"
       style="width: 90%"
  >
    <el-table
      :data="allExamInfo"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="examName"
        label="考试名字"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="examId"
        label="考试编号"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="examBeginTime"
        label="开始时间"
      >
      </el-table-column>
      <el-table-column
        prop="examEndTime"
        label="截止时间"
      >
      </el-table-column>
      <el-table-column
        prop="isTimeOut"
        label="考试状态"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <button style="background-color: whitesmoke;outline: none;border: none;font-size: 12px;font-weight: lighter;" @click="entryWatch(scope.row)">
            {{ scope.row.description }}
          </button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import getAllExamId from "@/api/cheatData/getAllExamId";

export default {
  name: "examTable",
  data(){
    return {
      allExamInfo:[]
    }
  },
  async mounted() {
    let res = await getAllExamId()
    for(let i = 0;i<res.data.length;i++) {
      res.data[i]['examBeginTime'] = this.processTimeTamp(res.data[i]['examBeginTime'])
      res.data[i]['examEndTime'] = this.processTimeTamp(res.data[i]['examEndTime'])
      // console.log(Date.now())
      if(Date.parse(res.data[i]['examEndTime']) < Date.now()){
        res.data[i]['isTimeOut'] = '考试结束'
        res.data[i]['description'] = '查看记录'
      }else if (Date.parse(res.data[i]['examBeginTime']) > Date.now()){
        res.data[i]['isTimeOut'] = '考试尚未开始'
        res.data[i]['description'] = '未开始'
      }else{
        res.data[i]['isTimeOut'] = '进行中'
        res.data[i]['description'] = '进入监考'
      }
    }
    this.allExamInfo = res.data.filter(item =>{
      return item.examName
    })
    this.allExamInfo.sort((a,b)=>{
      return Date.parse(b.examEndTime) - Date.parse(a.examEndTime)
    })
  },
  methods:{
    processTimeTamp(time){
      let date = new Date(time).toJSON();
      return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    entryWatch(scoped) {
      this.$emit('beforeEntryWatch',scoped)
    }
  }
}
</script>

<style scoped lang="scss">
.examTable{
  height: 100%;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translateY(-50%) translateX(-50%);

}

</style>
