<script setup>
import {computed} from "vue";

const props = defineProps({
  doneOptionNum: Number,
  allOptionNum: Number
})
const percentage = computed(() => {
  return (props.doneOptionNum / props.allOptionNum) * 100 || 0
})
</script>
<template>
  <div class="progress-main">
    <el-progress stroke-width:6 color="#00A9CEFF" stroke-linecap="butt" :percentage="percentage" text-inside="text-inside"/>
    <div class="progress-num"><span>{{ `${doneOptionNum}/${allOptionNum}` }}</span></div>
  </div>
</template>
<style lang="scss" scoped>
.progress-main {
  width: 100%;

  .el-progress {
    :deep(.el-progress-bar) .el-progress-bar__outer .el-progress-bar__inner .el-progress-bar__innerText {
      span {
        position: relative;
        top: 20px;
      }
    }
  }

  .progress-num {
    display: flex;
    justify-content: end;

    span {
      color: #00000080;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 0.24px;
      margin-top: 5px;
    }
  }
}
</style>
