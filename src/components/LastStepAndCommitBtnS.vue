<script setup>
import {useRouter} from 'vue-router'
import {ElMessage} from "element-plus";

const router = useRouter()

const props = defineProps({
  id: Number || String,
  type: Number
})

function lastStep() {
  router.push({name: "InitiateEvaluation",})
}

function shareEvaluation() {
  const responsePathMap = {
    0: "/response-evaluation/choiceQuestions",
    1: "/response-evaluation/trueOrFalseQuestions",
    2: "/response-evaluation/longTextQuestions"
  }
  const path = responsePathMap[props.type];
  const url = window.location.href.split('/#/')[0] + "/#" + `${path}?id=${props.id}`;
  navigator.clipboard.writeText(url);
  ElMessage({
    message: '链接已复制到粘贴板',
    type: 'success',
  })
}
</script>

<template>
  <div class="btn-main">
    <el-button plain @click="lastStep">上一步</el-button>
    <el-button @click="shareEvaluation" class="shareBtn" type="primary">分享评测</el-button>
  </div>
</template>

<style lang="scss" scoped>
.btn-main {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;

  .el-button {
    width: 88px;
    height: 32px;
    margin-left: 20px;
    color: #000000E6;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }

  .shareBtn {
    margin-top: 10px;
    margin-bottom: 50px;
    background: #48a8cd;
    color: #FFFFFF;
  }
}
</style>
