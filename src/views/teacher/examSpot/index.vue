<template>
  <div class="exam-spot">
    <div class="exam-spot-search">
      <input v-model="searchKeyWord" type="text" placeholder="学号/姓名" @input="inputEvent">
      <p class="tips">/*考生如有异常行为将在此页面通知您*/</p>
      <button class="updateStatus" @click="updateStatus">更新考试状态</button>
    </div>
    <oneStudentItem
        v-for="item of replaceArray"
        :key="item.id"
        :student-info="item"
    ></oneStudentItem>
  </div>
</template>

<script>
import oneStudentItem from "views/teacher/examSpot/oneStudentItem";

export default {
  name: "index",
  components: {oneStudentItem},
  data() {
    return {
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
      replaceArray: []
    }
  },
  mounted() {
    this.replaceArray = this.studentInfo
    this.inputEvent = this.searchStudent()
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

    }
  }
}
</script>

<style scoped lang="scss">
.exam-spot {
  width: 90%;
  display: flex;
  margin-left: 50px;
  overflow: hidden;
  flex-wrap: wrap;

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

</style>
