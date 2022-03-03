<template>
  <div>
    <MessageReminder :table-data="tableData"></MessageReminder>
  </div>
</template>

<script>
import MessageReminder from "views/teacher/gradingPaper/components/MessageReminder";
import {getMessageAlerts, uploadGradingScore} from "@/api/gradingPaper";

export default {
  name: "index",
  components: {
    MessageReminder
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    getMessageAlerts()
    .then(res => {
      this.tableData = res.data
      console.log(this.tableData)
    })

    // uploadGradingScore()
    // .then(res => {
    //   console.log(res)
    // })
  },
}
</script>

<style scoped>

</style>
