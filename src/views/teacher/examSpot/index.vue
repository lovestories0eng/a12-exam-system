<template>
  <div>
    <!--    <div v-if="!isEntry" class="beforeEntry">-->
    <!--      <span>请输入考试ID</span>-->
    <!--      <br>-->
    <!--      <input v-model="selectId" type="text" class="inputExamId" @keyup.enter="entry">-->
    <!--    </div>-->
    <examTable v-if="!isEntry" @beforeEntryWatch="beforeEntryWatch"></examTable>
    <div v-else class="exam-spot">
      <div class="exam-spot-search">
        <input v-model="searchKeyWord" type="text" placeholder="学号/姓名" @input="inputEvent">
        <p class="tips">/*考生如有异常行为将在此页面通知您*/</p>
      </div>
      <div class="students-status"
           :style="{
             width:'90%',
             // position:'absolute'
           }"
      >
        <div class="stretch">
          <span @click="isShowStatus">查看学生状态 &downarrow;</span>
        </div>
        <div class="dataArea">
          <oneStudentItem
            v-for="item of replaceArray"
            :key="item.id"
            :student-info="item"
          ></oneStudentItem>
        </div>
      </div>
      <div class="imgDisplay"
           :style="{
             width:'90%',
           }"
      >
        <div class="stretch">
          <span @click="isShowImages">查看异常照片 &downarrow;</span>
        </div>
        <div class="imgArea">
          <oneImgItem
            v-for="item of imgArea" :key="item.userId"
            :img-item="item"
          ></oneImgItem>
        </div>
      </div>
      <div class="StatisticalTable"
           :style="{
             width:'90%',
           }"
      >
        <div class="stretch">
          <span @click="isShowTable">查看表格数据 &downarrow;</span>
          <div class="tableArea">
            <StatisticalTable></StatisticalTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import oneStudentItem from "views/teacher/examSpot/oneStudentItem";
import oneImgItem from "views/teacher/examSpot/oneImgItem";
import StatisticalTable from "views/teacher/examSpot/table";
import getCheatPic from "@/api/cheatData/getCheatPic";
import getAllExamId from "@/api/cheatData/getAllExamId";
import examTable from "views/teacher/examSpot/examTable";
export default {
  name: "index",
  components: {oneStudentItem,oneImgItem,StatisticalTable,examTable},
  data() {
    return {
      selectId:'',
      isEntry:false,
      isTable:false,
      isStatus: false,
      isImages:false,
      imgAreaHeight:0,
      tableAreaHeight:0,
      statusHeight: 0,
      searchKeyWord: '',
      studentInfo: [
        {
          id: '1',
          name: 'psh',
          avatar: '',
          isReady: false,
        },
        {
          id: '2',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: 'xcvz',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: 'asdasd',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '4636346',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '12346',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '46',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '6464',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '235',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '2435',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '425',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '1234',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '536',
          name: '',
          avatar: '',
          isReady: false,
        }, {
          id: '134',
          name: '',
          avatar: '',
          isReady: false,
        }, {
          id: '232',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '223',
          name: '',
          avatar: '',
          isReady: false,
        },
        {
          id: '22',
          name: '',
          avatar: '',
          isReady: false,
        },
      ],
      imgArea:[
          {
        picUrl:'watch_img/P1.jpg',
        userId:'123'
      },
        {
          picUrl:'watch_img/P2.jpg',
          userId:'234'
        },
        {
          picUrl:'watch_img/P3.jpg',
          userId:'345'
        },
        {
          picUrl:'watch_img/P4.jpg',
          userId:'456'
        },
        {
          picUrl:'watch_img/P5.jpg',
          userId:'567'
        },
        {
          picUrl:'watch_img/P6.jpg',
          userId:'678'
        },
        {
          picUrl:'watch_img/P7.jpg',
          userId:'789'
        },
        {
          picUrl:'watch_img/P8.jpg',
          userId:'890'
        },
        {
          picUrl:'watch_img/P9.jpg',
          userId:'901'
        },
        {
          picUrl:'watch_img/P10.jpg',
          userId:'012'
        },
        {
          picUrl:'watch_img/P2.jpg',
          userId:'222'
        },
        {
          picUrl:'watch_img/P1.jpg',
          userId:'333'
        }
      ],
      replaceArray: []
    }
  },
  mounted() {
    this.replaceArray = this.studentInfo
    this.inputEvent = this.searchStudent()
    let o = document.querySelector('.stretch span')
  },
  methods: {
    searchStudent() {
      let t = null
      const _this = this
      return function () {
        if (!t && _this.searchKeyWord) {
          _this.replaceArray = _this.replaceArray.filter((item) => {
            return !item.id.indexOf(_this.searchKeyWord) || !item.name.indexOf(_this.searchKeyWord)
          })
        } else if (!_this.searchKeyWord) {
          _this.replaceArray = _this.studentInfo
        }
        t = setTimeout(() => {
          t = null
        }, 1000)
      }
    },
    inputEvent: () => {
    },
    updateStatus() {

    },
    entry(){
      this.isEntry = !this.isEntry
      this.getPictures()
    },
    async getPictures(){
      let res = await getCheatPic(this.selectId)
      console.log(res)
    },
    isShowStatus() {
      let oDataArea = document.querySelector('.dataArea')
      this.statusHeight = this.statusHeight === 0 ? oDataArea.clientHeight : this.statusHeight
      oDataArea.style.height = this.isStatus ? '0' : this.statusHeight + 'px'
      this.isStatus = !this.isStatus
    },
    isShowImages(){
      let oImgArea = document.querySelector('.imgArea')
      this.imgAreaHeight = this.imgAreaHeight === 0? oImgArea.clientHeight : this.imgAreaHeight
      oImgArea.style.height = this.isImages? '0':this.imgAreaHeight + 'px'
      this.isImages = !this.isImages
    },
    isShowTable() {
      let oTableArea = document.querySelector('.tableArea')
      this.tableAreaHeight = this.tableAreaHeight === 0? oTableArea.clientHeight : this.tableAreaHeight
      oTableArea.style.height = this.isTable ? '0':this.tableAreaHeight + 'px'
      this.isTable = !this.isTable
    },
    async beforeEntryWatch(scoped){
      const {data:res} = await getCheatPic(scoped.examId)
      res.forEach((item)=>{
        this.imgArea.push({userId:item.userId,picUrl: item.picUrl})
      })
      this.imgArea.pop()
      this.imgArea.pop()
      this.imgArea.pop()
      this.isEntry = !this.isEntry
    }
  }
}
</script>

<style scoped lang="scss">
.beforeEntry{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translateX(-50%) translateY(-50%);
  span{
    width: 300px;
    display: inline-block;
    text-align: center;
    margin-bottom: 20px;
  }
  .inputExamId{
    height: 50px;
    width: 300px;
  }
}
.exam-spot {
  width: 100%;
  margin-left: 50px;

  .students-status {
    position: relative;
    height: 100%;
    .dataArea {
      position: relative;
      display: flex;
      overflow-y: scroll;
      overflow-x: hidden;
      flex-wrap: wrap;
      transition-duration: .5s;
      transition-property: all;
      transition-timing-function: ease;
      transition-delay: 0s;
      height: auto;
      justify-content: flex-start;
    }

    .updateStatus {
      outline: none;
      border: none;
    }
  }
  .imgDisplay{
    position: relative;
    height: 100%;
    .imgArea{
      position: relative;
      display: flex;
      overflow-y: scroll;
      overflow-x: hidden;
      flex-wrap: wrap;
      transition-duration: .5s;
      transition-property: all;
      transition-timing-function: ease;
      transition-delay: 0s;
      height: auto;
      justify-content: flex-start;
    }

  }

  .exam-spot-search {
    width: 100%;
    height: 100px;
    position: relative;

    .updateStatus {
      position: absolute;
      top: 50%;
      transform: translateX(-50%);
      left: 20%;
      outline: none;
      border: none;
    }

    input {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      height: 30px;
      outline: none;
      border-radius: 2em;
      border: 2px solid skyblue;
      padding: 10px;
    }

    p {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      color: grey;
      font-family: Italic, serif;
    }
  }
}::-webkit-scrollbar {
   width: 6px;
   height: 6px;
   background: transparent;
 }

::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}

:hover::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 53%, 0.4);
}

:hover::-webkit-scrollbar-track {
  background: hsla(0, 0%, 53%, 0.1);
}
.stretch{
  span{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover{
      cursor: pointer;
    }
  }
}
.tableArea{
  transition-duration: .5s;
  transition-property: all;
  transition-timing-function: ease;
  transition-delay: 0s;
  overflow: hidden;
}
.stretch{
  width: 100%;
  height:50px;
  background-color:white;
  box-shadow: whitesmoke 4px 4px 4px 4px;
  text-align:center;
  line-height:50px;
  margin-bottom:20px;
  margin-top:20px;
}
</style>
