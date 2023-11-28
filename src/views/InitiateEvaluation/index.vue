<script setup>
import {ref, reactive, computed} from 'vue';
import {Upload} from '@element-plus/icons-vue';
import {useRouter, useRoute} from 'vue-router';
import {createList} from "@/api";

const router = useRouter()
const route = useRoute()

let isCreatedEvaluation = ref(false)
let languages = ['中文', '英文', '阿语', '俄语'],
    projects = ['pubg', 'lGame', '项目3'],
    nameStyles = ['pubg', 'lGame'],
    questionTypes = [
      {label: 0, value: '选择题'},
      {label: 1, value: '判断题'},
      {label: 2, value: '长文本对比'}
    ],
    oneGroupNameNums = ['1', '2', '3', '4', '5']
const form = reactive({
  title: '',
  language: '中文',
  project: 'pubg',
  style: 'pubg',
  questionType: 0,
  oneGroupNameNum: 5,
  questionNum: 40,
  referenceNames: []
})
const selectedFileName = ref('请上传昵称模板文件');
let isShowSpanCloseBtn = ref('0');

let nameGroups = ref([]);

let selectedObj = ref({});

const nowFormatDate = computed(() => {
  let date = new Date(),
      year = date.getFullYear(), //获取完整的年份(4位)
      month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
      strDate = date.getDate() // 获取当前日(1-31)
  if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
  return `${year}-${month}-${strDate}`
})

function onlyNumber() {
  if (typeof form.questionNum === 'string') {
    if (form.questionNum === '') {
      form.questionNum = 0
    } else {
      form.questionNum = form.questionNum.match(/\d+/g).join('');
    }
  }
}

function onSubmit() {
  createList({
    title: form.title || "默认标题",
    language: form.language,
    project: form.project,
    style: form.style,
    question_type: form.questionType,
    qst_group_num: form.oneGroupNameNum,
    qst_total_num: form.questionNum,
    real_nicknames: form.referenceNames
  }).then(res => {
    const previewPathNameMap = {
      0: "previewChoiceQuestions",
      1: "previewTrueOrFalseQuestions",
      2: "previewLongTextQuestions"
    }
    const previewPathName = Reflect.get(previewPathNameMap, form.questionType);
    router.push({
      name: previewPathName,
      state: {
        id: res,
      }
    })
  })
}

function openFile(e) {
  const node = e.srcElement;
  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    form.referenceNames = reader.result.replace(/\[|(])|(")/g, '').split(',');
    selectedFileName.value = node.files[0].name;
    isShowSpanCloseBtn.value = '1';
    const fileNamesLength = form.referenceNames.length;
    if (fileNamesLength > form.questionNum) {
      form.questionNum = fileNamesLength;
    }
  }
  reader.readAsText(node.files[0]);
}

function clearFile() {
  form.referenceNames = [];
  selectedFileName.value = '请上传昵称模板文件';
  isShowSpanCloseBtn.value = '0';
}

function questionTypeChange(type) {
  if (type === "判断题") {
    form.oneGroupNameNum = 1;
  } else if (type === "选择题") {
    form.oneGroupNameNum = 5;
  }
}

</script>
<template>
  <div class="release-evaluation">
    <div v-if="!isCreatedEvaluation" class="bg-padding">
      <div class="content">
        <h1>发起评测</h1>
        <el-form class="from" :model="form" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入评测标题"/>
          </el-form-item>
          <el-form-item label="项目">
            <el-select v-model="form.project">
              <el-option
                  v-for="item in projects"
                  :key="item"
                  :label="item"
                  :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="语言">
            <el-select v-model="form.language">
              <el-option
                  v-for="item in languages"
                  :key="item"
                  :label="item"
                  :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="风格">
            <el-select v-model="form.style">
              <el-option v-for="item in nameStyles" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="题目类型">
            <el-radio-group v-model="form.questionType" text-color="#48a8d1">
              <el-radio @change="questionTypeChange(item)" v-for="item in questionTypes" :key="item.label" :label="item.label">{{ item.value }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="每组数量">
            <el-select v-model="form.oneGroupNameNum">
              <el-option v-for="item in oneGroupNameNums" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="昵称总数">
            <!--            <el-input :formatter="onlyNumber" v-model="form.questionNum"/>-->
            <el-input @blur="onlyNumber" v-model="form.questionNum"/>
          </el-form-item>
          <div class="upload">
            <div class="upload-sets">
              <input class="upload-input" type="file" @change="openFile">
              <el-button class="upload-btn">
                <el-icon class="el-icon--right">
                  <Upload/>
                </el-icon>
                上传文件
              </el-button>
            </div>
            <div class="upload-content">
              <span class="span-text">{{ selectedFileName }}</span>
              <div class="close-icon" @click="clearFile" v-if="isShowSpanCloseBtn==='1'"></div>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">生成评测</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-else class="preview">
      <div class="preview-title"><span>预览状态</span></div>
      <div class="preview-main">
        <div class="preview-content">
          <div class="header">
            <div class="title">{{ form.title }}</div>
            <div class="time">{{ nowFormatDate }}</div>
          </div>
          <div class="main">
            <div class="content">
              <div class="tips">请选出你认为是真实人名的那一组</div>
              <ul class="options">
                <li v-for="(group,groupIndex) in nameGroups">
                  <ul>
                    <li class="option-base" v-for="(option,name,optionIndex) in group"
                        :class="{'option':!(groupIndex in selectedObj&&selectedObj[groupIndex]===name)}">
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
          <el-button plain>上一步</el-button>
          <el-button class="shareBtn" type="primary">分享评测</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
.release-evaluation {
  height: 100vh;
  overflow: hidden;

  .bg-padding {
    height: 100%;
    padding: 20px;
    background: #FFFFFF;

    .content {
      min-height: 770px;
      height: 100%;
      background: #F8F8F8FF;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        color: #000000E6;
        font-size: 20px;
        font-weight: 400;
        height: 28px;
        letter-spacing: 0.24px;
        margin: 60px 0 27px 75px;
      }

      .from {
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-form-item {
          margin-bottom: 24px;
          display: flex;
          align-items: center;

          :deep(.el-form-item__content ) {
            .el-radio-group {
              .el-radio {
                .el-radio__input.is-checked .el-radio__inner {
                  border-color: #48a8d1;
                  background: #ffffff;
                }

                .el-radio__input.is-checked .el-radio__inner::after {
                  width: 8px;
                  height: 8px;
                  background: #48a8d1;
                }

                .el-radio__input.is-checked + .el-radio__label {
                  color: #000000;
                }
              }
            }
          }

          :deep(.el-form-item__label) {
            height: 22px;
            line-height: 22px;
            color: #00000080;
            font-size: 14px;
            font-weight: 400;
          }

          .el-input {
            width: 330px;
            height: 32px;

            :deep(.el-input__wrapper) {
              padding: 5px 12px 5px 8px;
            }

            :deep(.el-input__wrapper):hover {
              box-shadow: 0 0 0 1px #7BC1CFFF;
            }

            :deep(.el-input__wrapper.is-focus) {
              box-shadow: 0 0 2px 1px #00A9CEFF;
            }
          }

          .el-select {
            width: 330px;
            height: 32px;

            :deep(.el-input__wrapper) {
              height: 32px;
              padding: 5px 8px 5px 8px;
            }
          }

          .el-radio-group {
            width: 330px;
          }

          .el-button {
            width: 330px;
            height: 40px;
            background: #00A9CEFF;
          }

          .el-button {
            background: #00B2D9;
          }

        }

        .upload {
          margin-bottom: 30px;

          .upload-sets {
            width: 112px;

            .upload-input {
              opacity: 0;
              width: 112px;
              height: 30px;
              border-radius: 15px;
              position: absolute;
              z-index: 10;
              cursor: pointer;
            }

            .upload-btn {
              width: 112px;
              height: 32px;
              border-radius: 3px;
              padding: 5px 16px 5px 18px;
              color: #000000E6;
              font-size: 14px;
              font-weight: 400;
              text-align: center;

              .el-icon {
                padding: 0;
                margin: 0 5px 0 0;
              }
            }
          }

          .upload-sets:hover {
            .upload-btn {
              border-color: #00A9CEFF;
              background: #FFFFFF;
              color: #00A9CEFF;
            }
          }


          .upload-content {
            margin-top: 8px;
            min-width: 200px;
            color: #9b9da1;
            display: flex;
            align-items: center;

            .span-text {
              font-size: 12px;
            }

            .close-icon {
              width: 16px;
              height: 16px;
              background-image: url("@/assets/images/close-circle-filled.png");
              background-repeat: no-repeat;
              margin-left: 8px;
              cursor: pointer;
            }
          }
        }


      }
    }
  }

  .preview {
    height: 100%;

    .preview-title {
      //position: absolute;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #DEF4F9FF;

      span {
        color: #00A9CEFF;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    ;
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

          .options {
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
                //cursor: pointer;
                border: 1px solid #ffffff;
                color: #000000E6;
                font-size: 14px;
                font-weight: 400;

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
  }

  --next-bg-main-color: none;
}


</style>
