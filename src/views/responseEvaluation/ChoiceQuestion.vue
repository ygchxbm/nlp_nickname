<script setup>
import {ref} from "vue";
import {ElMessageBox} from 'element-plus';
import {useRouter} from 'vue-router';

const historyParam = history.state;
const title = historyParam.title || '默认标题';
const nowFormatDate = historyParam.nowFormatDate;
const nameGroups = JSON.parse(historyParam.nameGroups);


const router = useRouter();

let config = {
  recurrentSelection: true,//是否可以重复选择答案选项
  showResultsImmediately: false,//是否立即显示答案
}
let selectedObj = ref({});

const nameGroupsLength = nameGroups.length;
let accuracy = 0;


function selectOption(groupIndex, name) {
  if (!config.recurrentSelection) {
    if (!Reflect.has(selectedObj.value, groupIndex)) {
      Reflect.set(selectedObj.value, groupIndex, name);
    }
  } else {
    Reflect.set(selectedObj.value, groupIndex, name);
  }
}

function submitQuestionnaire() {
  const results = Object.values(selectedObj.value);
  let selectedOptionsNum = results.length;
  if (selectedOptionsNum === nameGroupsLength) {
    const rightOptionsNum = results.filter(item => {
      return item.includes('real')
    }).length;
    accuracy = (rightOptionsNum / nameGroupsLength).toFixed(2);
    console.log(accuracy)
  } else {
    ElMessageBox.alert('題目还未答完，请继续答题', '提示', {
      // autofocus: false,
      confirmButtonText: 'OK',
      // callback: (action) => {
      //   ElMessage({
      //     type: 'info',
      //     message: `action: ${action}`,
      //   })
      // },
    })
  }
}
</script>
<template>
  <div class="preview">
    <div class="preview-main">
      <div class="preview-content">
        <div class="main">
          <el-progress stroke-width:6 color="#00A9CEFF" stroke-linecap="butt" :percentage="(Object.values(selectedObj).length/nameGroups.length)*100" text-inside="text-inside"/>
          <div class="progress-num"><span>{{ `${Object.values(selectedObj).length}/${nameGroups.length}` }}</span></div>
        </div>
        <div class="questionnaire">
          <div class="header">
            <div class="title">{{ title }}</div>
            <div class="time">{{ nowFormatDate }}</div>
          </div>
          <div class="main">
            <div class="content">
              <div class="tipsAndCommit">
                <div class="tips">请选出你认为是真实人名的那一组</div>
                <el-button class="commitBtn" type="primary" @click="submitQuestionnaire">提交答案</el-button>
              </div>
              <ul class="options">
                <li v-for="(group,groupIndex) in nameGroups">
                  <ul>
                    <li class="option-base" v-for="(option,name,optionIndex) in group" @click="selectOption(groupIndex,name)"
                        :class="[
                {'option':!(groupIndex in selectedObj&&selectedObj[groupIndex]===name)},
                {'option-item_true':groupIndex in selectedObj&&selectedObj[groupIndex]===name&&(config.recurrentSelection||name.includes('real'))},
                {'option-item_false':groupIndex in selectedObj&&selectedObj[groupIndex]===name&&(name.includes('ai')&&config.showResultsImmediately)},
                ]">
                      <div class="option-label">{{ ["A", "b"][optionIndex] }}</div>
                      <div class="option-content">{{ option.names.join(' , ') }}</div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="bottomCommitBtn">
            <el-button class="commitBtn" type="primary" @click="submitQuestionnaire">提交答案</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.preview {
  height: 100vh;

  .preview-main {
    width: 100%;
    height: 100%;
    min-height: 500px;
    display: flex;
    justify-content: center;
    padding-top: 38px;
    background-image: url('../../assets/images/bg.png');
    background-repeat: no-repeat;
    overflow: hidden;

    .preview-content {
      width: 900px;
      height: 100%;
      background: #FFFFFF;

      .main {
        width: 880px;
        margin: 10px auto 0;

        .el-progress {
          //background: #00A9CEFF;
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
            //line-height:20px ;
          }
        }
      }

      .questionnaire {
        height: 100%;
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

            .tipsAndCommit {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;

              .tips {
                color: #00A9CEFF;
                font-size: 14px;
                font-weight: 400;
                letter-spacing: 0.24px;
                line-height: 28px;
              }

              .commitBtn {
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

          .options {
            min-width: 800px;
            background: #ffffff;
            margin-bottom: 30px;

            > li {
              list-style: none;
              margin: 5px 0;
              padding: 5px 0;
              border-bottom: 1px dotted #c6c5c5;
            }

            > li:first-child {
              border-top: 1px dotted #c6c5c5;
            }

            ul {
              margin-top: 10px;
              padding: 5px 0;

              .option-base {
                display: flex;
                line-height: 30px;
                padding: 5px 0;
                border-radius: 8px;
                min-width: 500px;
                margin: 1px 0;
                cursor: pointer;

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

              .option {
                border: 1px solid #ffffff;
              }

              .option:hover {
                background: #f8f8f8;

                .option-label {
                  background: #32ca99;
                  border-color: #32ca99;
                  color: #ffffff;
                }
              }

              .option-item_true {
                border: 1px solid #9de2c9;
                background: #effaf7;

                .option-label {
                  background: #32ca99;
                  border: 1px solid #32ca99;
                  color: #ffffff;
                }
              }

              .option-item_false {
                border: 1px solid #ffbba4;
                background: #fff6f3;

                .option-label {
                  background: #ff561b;
                  border: 1px solid #ff561b;
                  color: #ffffff;
                }
              }
            }
          }
        }
        .bottomCommitBtn {
          display: flex;
          justify-content: center;
          margin-bottom: 60px;
          .commitBtn{
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
    }
  }

  --next-bg-main-color: none;
}
</style>
