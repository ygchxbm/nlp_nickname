<script setup>
defineProps({
  title: String,
  time: String,
  nameGroups:Object
})

function submitQuestionnaire() {
}
</script>
<template>
  <div class="eFFCq-form">
    <div class="eFFCq-form-content">
      <div class="eFFCq-form-header">
        <div class="eFFCq-title">{{ title }}</div>
        <div class="eFFCq-time">{{ time }}</div>
        <div class="eFFCq-tips-commit">
          <div class="eFFCq-tips">请选出你认为是真实人名的那一组</div>
          <el-button class="eFFCq-commit" type="primary" @click="submitQuestionnaire">提交答案</el-button>
        </div>
      </div>
      <div class="eFFCq-form-main">
        <ul class="eFFCq-ul">
          <li v-for="(group,index) in nameGroups" class="eFFCq-option">
            <div class="eFFCq-option-value">
              <span>{{index.length>1?index+1:`0${index+1}`}}</span>
              <div>{{group.names.join(' , ')}}</div>
            </div>
            <el-radio-group v-model="group.isRealName" class="ml-4">
              <el-radio label="0" size="large">group.value</el-radio>
              <el-radio label="1" size="large">group.value</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.eFFCq-form {
  width: 100%;
  height: 100%;

  .eFFCq-form-content {
    width: 800px;
    margin: 0 auto;
    .eFFCq-form-header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .eFFCq-title {
        margin-bottom: 4px;
        color: #000000E6;
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0.24px;
        line-height: 28px;
      }

      .eFFCq-time {
        color: #00000080;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }

      .eFFCq-tips-commit {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .eFFCq-tips {
          color: #00A9CEFF;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.24px;
          line-height: 28px;
        }

        .eFFCq-commit {
          width: 88px;
          height: 32px;
          background: #00A9CEFF;
          color: #FFFFFFE6;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }
    }
    .eFFCq-form-main{
      margin-top: 10px;
      border-top: 1px solid #EBEBEBFF;
      .eFFCq-ul{
        .eFFCq-option{
          width: 800px;
          height: 118px;
          margin: 10px 0;
          list-style: none;
          border-bottom: 1px solid #EBEBEBFF;
          .eFFCq-option-value{
            display: flex;
            align-items: center;
            height: 28px;
            color: #000000E6;
            font-size: 14px;
            font-weight: 400;
            line-height: 28px;
            span{
              font-weight: 500;
              margin-right: 10px;
            }
          }
        }
      }
    }

  }
}
</style>
