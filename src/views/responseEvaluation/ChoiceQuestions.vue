<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import ChoiceQuestionsForm from '@/components/ChoiceQuestionsForm.vue';
import {ref} from "vue";

const doneOptionNum = ref(0);
const isPreview=false;

const historyParam = history.state;
const title = historyParam.title || '默认标题';
const time = historyParam.nowFormatDate||"";
const nameGroups = JSON.parse(historyParam.nameGroups);
function selectedOption(val) {
  doneOptionNum.value = Reflect.ownKeys(val.value).length;
}
</script>
<template>
  <div class="response-evaluation">
    <div class="main">
      <div class="content">
        <div class="progress">
          <ProgressBar :doneOptionNum="doneOptionNum" :allOptionNum="nameGroups.length"></ProgressBar>
        </div>
        <div class="form">
          <ChoiceQuestionsForm
              :title="title"
              :time="time"
              :nameGroups="nameGroups"
              :isPreview="isPreview"
              @selectedOption="selectedOption">
          </ChoiceQuestionsForm>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.response-evaluation {
  --next-bg-main-color: none;
  height: 100vh;
  background-image: url('../../assets/images/bg.png');
  background-repeat: no-repeat;
  overflow: hidden;

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

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
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
  }
}
</style>
