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
    accuracy = parseFloat(((trueOptionNum / props.nameGroups.length).toFixed(4)));
  }
}

let config = {
  recurrentSelection: true,//是否可以重复选择答案选项
  showResultsImmediately: false,//是否立即显示答案
}

function selectOption(groupIndex, name) {
  if (!config.recurrentSelection) {
    if (!Reflect.has(selectedOptions.value, groupIndex)) {
      Reflect.set(selectedOptions.value, groupIndex, name);
    }
  } else {
    Reflect.set(selectedOptions.value, groupIndex, name);
  }
  emit('selectedOption', selectedOptions);
  let doneOptionNum = Object.values(selectedOptions.value).length;
  if (doneOptionNum === props.nameGroups.length) {
    isFinishedAnswer = true;
    const trueOptionNum = Object.values(selectedOptions.value).filter(item => {
      return item === 'realNamesGroup';
    }).length
    accuracy = parseFloat(((trueOptionNum / props.nameGroups.length).toFixed(4)));
  }
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
              <li class="option-base" v-for="(option,name,optionIndex) in group" @click="selectOption(groupIndex,name)"
                  :class="[
                {'option':(!(groupIndex in selectedOptions&&selectedOptions[groupIndex]===name))&&!isPreview},
                {'option-item_true':(groupIndex in selectedOptions&&selectedOptions[groupIndex]===name&&(config.recurrentSelection||name.includes('real')))&&!isPreview},
                {'option-item_false':(groupIndex in selectedOptions&&selectedOptions[groupIndex]===name&&(name.includes('ai')&&config.showResultsImmediately))&&!isPreview},
                ]">
                <div class="option-label">{{ ["A", "b"][optionIndex] }}</div>
                <div class="option-content">{{ option.names.join(' , ') }}</div>
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
        min-width: 800px;
        background: #ffffff;
        margin-bottom: 30px;

        > li {
          list-style: none;
          //margin: 5px 0;
          //padding: 5px 0;
          border-bottom: 1px solid #efefef;
        }

        ul {
          margin: 8px 0;
          padding: 6px 0;

          .option-base {
            display: flex;
            align-items: center;
            line-height: 30px;
            padding: 8px 0;
            border-radius: 8px;
            min-width: 500px;
            margin: 1px 0;

            .option-label {
              width: 32px;
              height: 32px;
              border: 1px solid #e6e6e6;
              border-radius: 15px;
              margin: 0 20px 0 20px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .option-content {
              font-size: 14px;
              font-weight: 400;
              line-height: 28px;
              max-width: 700px;
              min-height: 30px;
            }
          }

          .option {
            cursor: pointer;
          }

          .option:hover {
            background: #e3f5f9;
          }

          .option-item_true {
            //border: 1px solid #48a8d0;
            background: #e3f5f9;
            cursor: pointer;

            .option-label {
              background: #48a8d0;
              border-color: #48a8d0;
              color: #ffffff;
            }

            .option-content {
              color: #00A9CEFF;
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
