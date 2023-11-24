<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import LongTextQuestionsForm from '@/components/LongTextQuestionsForm.vue';
import {computed, ref} from "vue";
import {useDetailList} from "@/hooks/useDetailList";

const doneOptionNum = ref(0);
const isPreview = false;
const evaluatingData = useDetailList();

const allOptionNum = computed(() => {
  return evaluatingData.value["qst_total_num"] / evaluatingData.value["qst_group_num"]
})

function selectedOption(val) {
  doneOptionNum.value = Reflect.ownKeys(val.value).length;
}
</script>
<template>
  <div class="response-evaluation">
    <div class="main">
      <div class="content">
        <div class="progress">
          <ProgressBar :doneOptionNum="doneOptionNum" :allOptionNum="allOptionNum"></ProgressBar>
        </div>
        <div class="form">
          <LongTextQuestionsForm
              :id="evaluatingData.id"
              :title="evaluatingData.title"
              :time="evaluatingData['create_time']"
              :nameGroups="evaluatingData.nameGroups"
              :isPreview="isPreview"
              @selectedOption="selectedOption">
          </LongTextQuestionsForm>
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
