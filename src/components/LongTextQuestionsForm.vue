<script setup>
import {ref} from "vue";
import {ElMessageBox} from "element-plus";
import {useRouter} from 'vue-router'

const router = useRouter()

let accuracy = ref(-1);
let isFinishedAnswer = false

const props = defineProps({
  id: String | Number,
  title: String,
  time: String,
  nameGroups: Object,
  isPreview: Boolean
})

const selectedOptions = ref({});
const emit = defineEmits(['selectedOption']);

function submitQuestionnaire() {
  if (isFinishedAnswer) {
    console.info("accuracy:", accuracy);
    const real_nicknames = [];
    const ai_nicknames = [];
    for (const index in props.nameGroups) {
      ai_nicknames.push(...props.nameGroups[index].aiNamesGroup.names);
      real_nicknames.push(...props.nameGroups[index].realNamesGroup.names);
    }
    const is_correct = Object.values(selectedOptions.value).filter(item => {
      return item === 'realNamesGroup'
    }).length;
    router.push({
      name: "submitSuccessfully",
      state: {
        test_id: props.id,
        real_nicknames,
        ai_nicknames,
        is_correct
      }
    });
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

function selectedOption(group, index, key) {
  Reflect.set(selectedOptions.value, index, {
    selectedValue: key,
  })
  emit('selectedOption', selectedOptions);

  let doneOptionNum = Object.values(selectedOptions.value).length;
  if (doneOptionNum === props.nameGroups.length) {
    isFinishedAnswer = true;
    const trueOptionNum = Object.values(selectedOptions.value).filter(item => {
      return item.selectedValue === 'realNamesGroup'
    }).length;
    accuracy = parseFloat(((trueOptionNum / props.nameGroups.length).toFixed(4)))
  }
}

function getLongTest(str) {
  let copyStr = str
  let i = 0;
  while (i < 15) {
    str += copyStr;
    i++
  }
  return str
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
          <el-button v-if="!isPreview" class="eFFCq-commit" type="primary" @click="submitQuestionnaire">提交答案</el-button>
        </div>
      </div>
      <div class="eFFCq-form-main">
        <ul class="eFFCq-ul">
          <li v-for="(group,groupIndex) in nameGroups" class="eFFCq-option-group">
            <ul>
              <li v-for="(item,key,index) in group" class="eFFCq-option-base" @click="selectedOption(group,groupIndex,key)"
                  :class="[
                      {'eFFCq-option-selected':(groupIndex in selectedOptions&&selectedOptions[groupIndex].selectedValue===key&&!isPreview)},
                      {'eFFCq-option':!(groupIndex in selectedOptions)&&!isPreview}]">
                <div class="eFFCq-option-radio"><span>{{ ['A', 'B'][index] }}</span></div>
                <div class="eFFCq-option-Text">{{ item.names.join(' , ')}}</div>
<!--                <div class="eFFCq-option-Text">{{ getLongTest(item.names.join(' , ')) }}</div>-->
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="eFFCq-form-footer">
        <el-button v-if="!isPreview" class="commit-Btn" type="primary" @click="submitQuestionnaire">提交答案</el-button>
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
      margin-top: 20px;

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
        margin-top: 12px;

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

    .eFFCq-form-main {
      margin-top: 10px;
      border-top: 1px solid #EBEBEBFF;

      .eFFCq-ul {
        margin-top: 15px;
        padding-bottom: 40px;

        .eFFCq-option-group {
          width: 800px;
          min-height: 473px;
          margin-bottom: 20px;
          list-style: none;

          > ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;

            .eFFCq-option-base {
              width: 390px;
              height: 100%;
              list-style: none;
              border-radius: 6px;
              border: 1px solid #EBEBEBFF;

              .eFFCq-option-radio {
                width: 32px;
                height: 32px;
                border-radius: 16px;
                background: #FFFFFF;
                border: 1px solid #EBEBEBFF;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px 0 8px 20px;

                span {
                  color: #000000CC;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 23px;
                }
              }

              .eFFCq-option-Text {
                width: 350px;
                min-height: 384px;
                margin-left: 20px;
                margin-bottom: 20px;
                color: #000000E6;
                font-size: 14px;
                font-weight: 400;
                line-height: 24px;
                overflow: hidden;
              }
            }

            .eFFCq-option {
              cursor: pointer;
            }

            .eFFCq-option:hover {
              background: #f8f8f8;
            }

            .eFFCq-option-selected {
              background: #e3f5f9;

              .eFFCq-option-radio {
                background: #48a9ce;

                span {
                  color: #FFFFFFFF;
                }
              }
            }
          }

          //border-bottom: 1px solid #EBEBEBFF;


          .eFFCq-option-value {
            display: flex;
            align-items: center;
            height: 28px;
            color: #000000E6;
            font-size: 14px;
            font-weight: 400;
            line-height: 28px;

            span {
              font-weight: 500;
              margin-right: 10px;
            }
          }

        }
      }
    }

    .eFFCq-form-footer {
      display: flex;
      justify-content: center;

      .commit-Btn {
        width: 88px;
        height: 32px;
        background: #00A9CEFF;
        color: #FFFFFFE6;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        margin-bottom: 60px;
      }
    }

  }
}
</style>
