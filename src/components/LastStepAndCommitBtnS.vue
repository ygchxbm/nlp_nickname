<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
function lastStep(){
  router.push({name: "InitiateEvaluation",})
}

function shareEvaluation(){

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
