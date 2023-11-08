<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import EvaluationFormForChoiceQuestion from '@/components/EvaluationFormForTrueOrFalseQuestion.vue'
import {ref} from "vue";

let count = ref(4);
let number = ref(40);

const historyParam = history.state;
const title = historyParam.title || '默认标题';
const time = historyParam.nowFormatDate;
const nameGroups = JSON.parse(historyParam.nameGroups);
console.info("nameGroups:", nameGroups, "----- 🚀 ~ filePath:src\views\responseEvaluation\trueOrFalseQuestions.vue method:")
</script>
<template>
  <div class="response-evaluation">
    <div class="main">
      <div class="content">
        <div class="progress">
          <ProgressBar :count="count" :number="number"></ProgressBar>
        </div>
        <div class="form">
          <EvaluationFormForChoiceQuestion
              :title="title"
              :time="time"
              :nameGroups="nameGroups">
          </EvaluationFormForChoiceQuestion>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.response-evaluation {
  height: 100vh;
  background-image: url('../../assets/images/bg.png');
  background-repeat: no-repeat;

  .main {
    //padding-top: 38px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      width: 900px;
      height: 100%;
      margin-top: 35px;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;

      .progress {
        width: 880px;
        margin-top: 10px;
      }

      .form {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
