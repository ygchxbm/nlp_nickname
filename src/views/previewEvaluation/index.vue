<script setup>
import {ref} from "vue";
const historyParam = history.state;
const title = historyParam.title || '默认标题';
const nowFormatDate = historyParam.nowFormatDate;
const nameGroups = JSON.parse(historyParam.nameGroups);
import {useRouter} from 'vue-router'
const router = useRouter()

function lastStep(){
  router.push({name: "releaseEvaluation",})
}
</script>
<template>
  <div class="preview">
    <div class="preview-title"><span>预览状态</span></div>
    <div class="preview-main">
      <div class="preview-content">
        <div class="header">
          <div class="title">{{ title }}</div>
          <div class="time">{{ nowFormatDate }}</div>
        </div>
        <div class="main">
          <div class="content">
            <div class="tips">请选出你认为是真实人名的那一组</div>
            <ul class="questionnaire">
              <li v-for="(group) in nameGroups">
                <ul>
                  <li class="option-base" v-for="(option,name,optionIndex) in group">
                    <div class="option-label">{{ ["A", "b"][optionIndex] }}</div>
                    <div class="option-content">{{ option.names.join(' , ') }}</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btnS">
        <el-button plain @click="lastStep">上一步</el-button>
        <el-button class="shareBtn" type="primary">分享评测</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.preview {
  height: 100vh;

  .preview-title {
    align-items: center;
    background: #DEF4F9FF;

    span {
      color: #00A9CEFF;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
  }

  .preview-main {
    width: 100%;
    height: 100%;
    min-height: 500px;
    background: #F8F8F8FF;
    display: flex;
    justify-content: center;

    .preview-content {
      width: 900px;
      height: 100%;
      background: #FFFFFF;
      overflow: scroll;

      .header {
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          margin-top: 20px;
          margin-bottom: 4px;
          color: #000000E6;
          font-size: 20px;
          font-weight: 400;
          letter-spacing: 0.24px;
          line-height: 28px;
        }

        .time {
          color: #00000080;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
        }
      }

      .main {
        display: flex;
        justify-content: center;

        .content {
          width: 800px;
        }

        .tips {
          margin: 12px 0 9px 0;
          color: #00A9CEFF;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.24px;
          line-height: 28px;
        }

        .questionnaire {
          min-width: 800px;
          background: #ffffff;
          margin-bottom: 50px;

          > li {
            list-style: none;
            margin: 5px;
            padding: 5px;
            border-bottom: 1px dotted #c6c5c5;
          }

          > li:first-child {
            border-top: 1px dotted #c6c5c5;
          }

          ul {
            margin-top: 10px;
            padding: 5px;

            .option-base {
              display: flex;
              line-height: 30px;
              padding: 5px;
              border-radius: 8px;
              min-width: 500px;
              margin: 1px 0;

              .option-label {
                width: 30px;
                height: 30px;
                border: 1px solid #e6e6e6;
                border-radius: 15px;
                margin: 0 20px 0 5px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }

    .btnS {
      position: relative;
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
  }

  --next-bg-main-color: none;
}
</style>
