<script setup>
import PreviewBar from '@/components/previewBar.vue';
import LastStepAndCommitBtnS from '@/components/LastStepAndCommitBtnS.vue';
import ChoiceQuestionsForm from '@/components/ChoiceQuestionsForm.vue';
import {useDetailList} from "@/hooks/useDetailList";

const isPreview = true;
const evaluatingData = useDetailList();


</script>
<template>
  <div class="preview-evaluation">
    <div class="main">
      <div class="header">
        <div class="preview-bar">
          <PreviewBar></PreviewBar>
        </div>
      </div>
      <div class="content">
        <div class="form">
          <ChoiceQuestionsForm
              :title="evaluatingData.title"
              :time="evaluatingData['create_time']"
              :nameGroups="evaluatingData.nameGroups"
              :stem="evaluatingData.stem"
              :isPreview="isPreview">
          </ChoiceQuestionsForm>
        </div>
        <div class="BtnS">
          <LastStepAndCommitBtnS :id="evaluatingData.id" :type="evaluatingData.question_type"></LastStepAndCommitBtnS>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.preview-evaluation {
  --next-bg-main-color: none;
  height: 100vh;
  background: #F8F8F8FF;
  overflow: hidden;

  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      width: 100%;

      .preview-bar {
        height: 30px;
      }
    }

    .content {
      width: 1008px;
      height: 100%;
      display: flex;

      .form {
        width: 100%;
        height: 100%;
        margin-bottom: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #FFFFFF;
      }

      .btnS {
        position: relative;
      }
    }
  }
}
</style>
