<template>
  <div v-if="showNeedingAttention" class="matters-needing-attention">
    <!--<span @click="$emit('hiddenAttentions',false)">&CircleTimes;</span>-->
    <header class="m-n-a-header">请仔细阅读以下注意事项</header>
    <div class="m-n-a-content">
      <p v-for="(item,index) of attentions" :key="index">{{ index + 1 + '.' + item }}</p>
    </div>
    <div class="confirm">
      <div class="tips">确认注意事项并在输入以下内容</div>
      <strong>{{ '/*' + studentNeedingInput + '*/' }}</strong>
      <input v-model="confirmInfo" type="text" :placeholder="studentNeedingInput" />
    </div>
    <div
      :style="{
        visibility:showInputError?'visible':'hidden'
      }"
      class="error"
    >
      !输入错误请仔细检查
    </div>
    <div class="button-group">
      <button id="Y" @click="eConfirm">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MattersNeedingAttention",
  data() {
    return {
      confirmInfo: '',
      studentNeedingInput: '已知晓相关注意事项，一切后果由自己承担',
      showNeedingAttention: true,
      showInputError: false,
      attentions: ['注意是先弄就看楼主仙女科比v是i礼物啊被否；奥士堡能否偶哦组别擦阿素不错', 'ask地方吧咯i哦处女咯组合v宁波拉尔u吧啊阿拉斯加你的', '注意是先弄就看楼主仙女科比v是i礼物啊被否；奥士堡能否偶哦组别擦阿素不错', '注意是先弄就看楼主仙女科比v是i礼物啊被否；奥士堡能否偶哦组别擦阿素不错', '注意是先弄就看楼主仙女科比v是i礼物啊被否；奥士堡能否偶哦组别擦阿素不错', '注意是先弄就看楼主仙女科比v是i礼物啊被否；奥士堡能否偶哦组别擦阿素不错']
    }
  },
  methods: {
    //点击确定并输入确认信息后才能进入考试
    eConfirm() {
      let reg = /已知晓相关注意事项，一切后果由自己承担/
      const flag = reg.test(this.confirmInfo)
      if (!flag)
        this.showInputError = true
      this.$emit('beforeEntryExam', flag)
    }
  }
}
</script>

<style scoped lang="scss">
.matters-needing-attention {
  min-height: 500px;
  //max-width: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  z-index: 99999;
  background-color: white;
  border: 1px solid #eeeeee;

  span {
    display: inline-block;
    position: absolute;
    right: 0;
    font-size: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  header {
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .m-n-a-content {
    width: 70%;
    min-height: 200px;
    margin-top: 30px;
    //position: absolute;
    text-align: left;
    margin-left: 50%;
    transform: translateX(-50%);
    overflow: scroll;
    overflow-x: hidden;
    margin-bottom: 50px;

    p {
      text-indent: 2em;
      margin-top: 5px;
    }
  }

  .confirm {
    input {
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 10px;
      outline: none ;
      width: 70%;
    }

    strong {
      display: block;
      text-align: center;
      color: red;
    }

    .tips {
      text-align: center;
      color: grey;
      margin-bottom: 20px;
    }
  }

  .button-group {
    #Y {
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 30px;
      margin-bottom: 20px;
      background-color: skyblue;
      outline: none;
      border: none;
      color: white;
      font-size: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .error {
    text-align: center;
    color: darkred;
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
</style>
