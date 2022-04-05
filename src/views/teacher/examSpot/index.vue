<template>
  <div>
    <examTable v-if="!isEntry" @beforeEntryWatch="beforeEntryWatch"></examTable>
    <div v-else class="exam-spot" style="visibility: hidden">
      <div v-if="!do_something"
           class="imgDisplay"
           :style="{
             width:'90%',
           }"
      >
        <div class="stretch">
          <span class="isShowImages" @click="isShowImages">查看异常照片 &downarrow;</span>
        </div>
        <div v-if="!do_something" class="imgArea">
          <oneImgItem
            v-for="(item,index) of imgArea" :key="item.userId+index"
            :img-item="item"
            :select-id="selectId"
          ></oneImgItem>
        </div>
      </div>
      <div v-if="!do_something"
           class="students-status"
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
            :exam-id="selectId"
            @tryToDo="tryToDo"
          >
          </oneStudentItem>
          <oneStudentItem
            v-for="item of replaceArray"
            :key="item.id"
            :student-info="item"
            :exam-id="selectId"
            @tryToDo="tryToDo"
          >
          </oneStudentItem>
          <oneStudentItem
            v-for="item of replaceArray"
            :key="item.id"
            :student-info="item"
            :exam-id="selectId"
            @tryToDo="tryToDo"
          >
          </oneStudentItem>
        </div>
      </div>
      <div v-if="!do_something"
           class="StatisticalTable"
           :style="{
             width:'90%',
           }"
      >
        <div class="stretch">
          <span @click="isShowTable">查看表格数据 &downarrow;</span>
          <div class="tableArea" style="position: relative">
            <StatisticalTable :data-origin="dataOrigin"></StatisticalTable>
          </div>
        </div>
      </div>
      <FunctionsTables
        v-if="do_something"
        :exam-id="selectId"
        :name="bad_student.name"
        :user-id="bad_student.id"
        :login-pictures="out_data[bad_student.id.toString()]['login']"
        :normal-pictures="out_data[bad_student.id.toString()]['normal']"
        @functionalQuit="functionalQuit"
      >
      </FunctionsTables>
      <a v-if="!do_something" href="javascript:" data-title="同步数据" @click="clickReload"></a>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import oneStudentItem from "views/teacher/examSpot/oneStudentItem";
import oneImgItem from "views/teacher/examSpot/oneImgItem";
import StatisticalTable from "views/teacher/examSpot/table";
import getCheatPic from "@/api/cheatData/getCheatPic";
import getAllExamId from "@/api/cheatData/getAllExamId";
import examTable from "views/teacher/examSpot/examTable";
import getSwitchTimes from "@/api/cheatData/getSwitchTimes";
import processData from "@/api/cheatData/processData";
import loading from "views/teacher/examSpot/loading";
import awesomeButton from "utils/awesomeButton";
import FunctionsTables from "views/teacher/examSpot/FunctionsTables";

export default {
  name: "index",
  components: {oneStudentItem, oneImgItem, StatisticalTable, examTable, loading, FunctionsTables},
  inject: ['reload'],
  data() {
    return {
      bad_student: {
        name: '',
        id: 0,
      },
      out_data: null,
      do_something: false,
      selectExamId: '',
      isLoading: false,
      dataOrigin: [],
      selectId: '',
      isEntry: false,
      isTable: false,
      isStatus: false,
      isImages: false,
      imgAreaHeight: 0,
      tableAreaHeight: 0,
      statusHeight: 0,
      searchKeyWord: '',
      studentInfo: [],
      initImgArea: [],
      imgArea: [],
      replaceArray: []
    }
  },
  mounted() {
    this.replaceArray = this.studentInfo
    this.initImgArea = this.imgArea
  },
  created() {
    awesomeButton()
  },
  methods: {
    functionalQuit() {
      this.do_something = false
    },
    clickReload() {
      this.getInfo(this.selectId)
    },
    entry() {
      this.isEntry = !this.isEntry
      this.getPictures()
    },
    async getPictures() {
      let res = await getCheatPic(this.selectId)
    },
    isShowStatus() {
      let oDataArea = document.querySelector('.dataArea')
      this.statusHeight = this.statusHeight === 0 ? oDataArea.clientHeight : this.statusHeight
      oDataArea.style.height = this.isStatus ? '0' : this.statusHeight + 'px'
      this.isStatus = !this.isStatus
    },
    isShowImages() {
      let oImgArea = document.querySelector('.imgArea')
      this.imgAreaHeight = this.imgAreaHeight === 0 ? oImgArea.clientHeight : this.imgAreaHeight
      oImgArea.style.height = this.isImages ? '0' : this.imgAreaHeight + 'px'
      this.isImages = !this.isImages
    },
    isShowTable() {
      let oTableArea = document.querySelector('.tableArea')
      this.tableAreaHeight = this.tableAreaHeight === 0 ? oTableArea.clientHeight : this.tableAreaHeight
      oTableArea.style.height = this.isTable ? '0' : this.tableAreaHeight + 'px'
      this.isTable = !this.isTable
    },
    async beforeEntryWatch(scoped) {
      this.selectId = scoped.examId
      this.isEntry = !this.isEntry
      this.isLoading = !this.isLoading
      setTimeout(() => {
        this.isLoading = !this.isLoading
        document.querySelector('.exam-spot').style.visibility = 'visible'
      }, 2000)
      await this.getInfo(this.selectId)
      //监听浏览器回退事件
      const _this = this

      function watchPopEvent() {
        _this.isEntry = !_this.isEntry
        _this.imgArea = _this.initImgArea
        window.removeEventListener('popstate', watchPopEvent)
      }

      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", watchPopEvent, false)

      await this.getInfo(this.selectId)
      setTimeout(() => {
        this.isShowStatus()
        this.isShowStatus()
        this.isShowTable()
        this.isShowImages()
      }, 50)
      setInterval(async () => {
        await this.getInfo(scoped.examId)
      }, 60000)
    },
    async getInfo(id) {
      const {data: detailInfo} = await getSwitchTimes(id)
      const {data: res} = await getCheatPic(this.selectId)
      this.dataOrigin = processData(detailInfo)
      this.replaceArray = this.dataOrigin.map((item, index) => {
        return {
          id: item['userId'],
          name: item['name'],
          // avatar: `avatar/p${index + 1}.webp`,
          avatar: `avatar/P${index + 1}.JPG`,
          studentCondition: item['studentCondition'] ? item['studentCondition'] : '未进入考试'
        }
      })
      this.allPages = []
      this.imgArea = []
      this.out_data = this.tryBuildData(res)
      for (let i = 0; i < this.dataOrigin.length; i++) {
        const tag = this.dataOrigin[i].userId.toString()
        if (this.out_data[tag]) {
          this.imgArea = [
            ...this.out_data[tag]['abnormal']['outLook'],
            ...this.out_data[tag]['abnormal']['largeSound']
          ]
          this.replaceArray[i].avatar = this.out_data[tag]['normal'][0].picUrl
        }

      }
    },
    tryToDo(studentInfo) {
      this.do_something = true
      this.bad_student = studentInfo
    },
    tryBuildData(value) {
      let result = {}
      value.forEach(item => {
        const tag = item.userId.toString()
        const condition = item.studentCondition
        if (!result[tag]) {
          result[tag] = {
            'normal': [],
            'abnormal': {
              'outLook': [],
              'largeSound': []
            },
            'login': []
          }
        }
        switch (condition) {
          case 'normal':
            item.studentCondition = "正常"
            result[tag][condition].push(item)
            break;
          case 'login':
            result[tag][condition].push(item)
            break;
          default:
            item.studentCondition = item.studentCondition === 'outLook' ? '切屏' : '吵闹'
            result[tag]['abnormal'][condition].push(item)
            break;
        }

      })
      return result

    }
  }
}
</script>

<style scoped lang="scss">

.beforeEntry {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);

  span {
    width: 300px;
    display: inline-block;
    text-align: center;
    margin-bottom: 20px;
  }

  .inputExamId {
    height: 50px;
    width: 300px;
  }
}

.exam-spot {
  width: 100%;
  height: 100%;
  margin-left: 50px;
  position: relative;

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

  .imgDisplay {
    position: relative;
    height: 100%;

    .imgArea {
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
}

::-webkit-scrollbar {
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

.stretch {
  span {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }
}

.tableArea {
  transition-duration: .5s;
  transition-property: all;
  transition-timing-function: ease;
  transition-delay: 0s;

  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.stretch {
  width: 100%;
  height: 50px;
  background-color: white;
  box-shadow: whitesmoke 4px 4px 4px 4px;
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.reload {
  width: 300px;
  height: 50px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}

a {
  position: absolute;
  top: 180%;
  left: 45%;
  transform: translateX(-50%);
  display: inline-block;
  padding: 1.2em 2em;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  user-select: none;
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    border-radius: 4px;
    transition: box-shadow .5s ease, transform .2s ease;
    will-change: transform;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
    transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -12px));
  }

  &:hover::before {
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
  }

  &::after {
    position: relative;
    display: inline-block;
    content: attr(data-title);
    transition: transform .2s ease;
    font-weight: bold;
    letter-spacing: .01em;
    will-change: transform;
    transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
  }
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transform-style: preserve-3d;
  transform: perspective(800px);
}
</style>
