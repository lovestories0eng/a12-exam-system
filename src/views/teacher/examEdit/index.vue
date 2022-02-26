<template>
  <div class="wrapper">
    <exam-form></exam-form>
  </div>
</template>

<script>
import ExamForm from "./components/ExamForm"
export default {
  name: "index",
  components: {
    ExamForm
  }
}
</script>

<style scoped>
.wrapper {
  margin: 20px auto;
  width: 85%;
}
</style>
