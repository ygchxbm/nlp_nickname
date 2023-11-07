<script setup>
import axios from "axios";
import {ref, reactive, computed} from 'vue';
import {Upload} from '@element-plus/icons-vue';
import {useRouter, useRoute} from 'vue-router';

const router = useRouter()
const route = useRoute()

let isCreatedEvaluation = ref(false)
let languages = ['中文', '英文', '阿语', '俄语'],
    projects = ['项目1', '项目2', '项目3'],
    nameStyles = ['pubg', 'lGame'],
    questionTypes = ['选择题', '判断题', '长文本对比'],
    oneGroupNameNums = ['1', '2', '3', '4', '5']
const form = reactive({
  title: '',
  language: '中文',
  project: '项目1',
  nameStyle: 'pubg',
  questionType: '选择题',
  oneGroupNameNum: 5,
  questionNum: 40,
})

let realNames = [];
let aiNames = [];
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

function onlyNumber(value) {
  if (typeof value === 'number') {
    return value
  } else {
    return parseInt(value).toString()
  }
}

function onSubmit() {
  const url = 'http://127.0.0.1:3000';
  const params = new URLSearchParams();
  params.append('language', form.language);
  params.append('nameStyle', form.nameStyle);
  params.append('namesNumber', (form.questionNum * form.oneGroupNameNum).toString());
  params.append('referenceNames', []);
  axios.post(url + '/getNames', params)
      .then(res => {
        ({aiNames, realNames} = res.data);
        nameGroups.value = groupNames(realNames, aiNames, 200, form.oneGroupNameNum);
        const id=getUuid();
        console.log(id);
        if (nameGroups.value.length > 0) {
          // isCreatedEvaluation.value = true
          router.push({
            // path: '/preview-evaluation/index',
            name: "previewEvaluation",
            state: {
              title: form.title,
              nowFormatDate: nowFormatDate.value,
              nameGroups: JSON.stringify(nameGroups.value)
            }
          })
        }
      })
}

function groupNames(realNames, aiNames, allNamesNum, oneGroupNameNum) {
  const result = [];
  let i = 0;
  while (i < allNamesNum) {
    if (i % oneGroupNameNum === 0) {
      const randNumber = Math.random();
      let option;
      if (randNumber < 0.5) {
        option = {
          realNamesGroup: {
            names: [],
          },
          aiNamesGroup: {
            names: [],
          },
        }
      } else {
        option = {
          aiNamesGroup: {
            names: [],
          },
          realNamesGroup: {
            names: [],
          },
        }
      }
      result.push(option);
    }
    const resLength = result.length;
    result[resLength - 1].realNamesGroup.names.push(realNames[i]);
    result[resLength - 1].aiNamesGroup.names.push(aiNames[i]);
    i++;
  }
  return result;
}

function getUuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
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
          <el-form-item label="语言">
            <el-select v-model="form.language">
              <el-option
                  v-for="item in languages"
                  :key="item"
                  :label="item"
                  :value="item"/>
            </el-select>
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
          <el-form-item label="风格">
            <el-select v-model="form.nameStyle">
              <el-option v-for="item in nameStyles" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="题目类型">
            <el-radio-group v-model="form.questionType">
              <el-radio v-for="item in questionTypes" :key="item" :label="item" :value="item">
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="每组数量">
            <el-select v-model="form.oneGroupNameNum">
              <el-option v-for="item in oneGroupNameNums" :key="item" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item label="题目总数">
            <el-input :formatter="onlyNumber" v-model="form.questionNum"/>
          </el-form-item>
          <div class="upload">
            <input class="upload-input" type="file" @change="openFile">
            <el-button class="upload-btn">
              <el-icon class="el-icon--right">
                <Upload/>
              </el-icon>
              上传文件
            </el-button>
            <div class="span-content">
              请上传昵称模板文件
              <!--            <span>{{ selectedFileName }}</span>-->
              <!--            <el-icon @click="clearFile" :size="16" color="#9b9da1" style="cursor: pointer;border:1px solid #9b9da1;border-radius: 5px;margin-left: 3px" :style="{'opacity':isShowSpanCloseBtn}">-->
              <!--              <Close/>-->
              <!--            </el-icon>-->
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
              <ul class="questionnaire">
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
        }

        .upload {
          margin: 0 87px 63px 0;

          .upload-input {
            opacity: 0;
            width: 80px;
            height: 30px;
            border-radius: 15px;
            position: absolute;
            z-index: 10;
          }

          .upload-btn {
            width: 112px;
            height: 32px;
            border-radius: 3px;
            padding: 5px 16px 5px 18px;
            color: #000000E6;
            font-size: 14px;
            font-weight: 400;
            //line-height: 22px;
            text-align: center;

            .el-icon {
              //width: 16px;
              //height: 16px;
              padding: 0;
              margin: 0 5px 0 0;
            }
          }

          .span-content {
            margin-top: 8px;
            //margin-left: 5px;
            font-size: 12px;
            min-width: 120px;
            color: #9b9da1;
            display: flex;
            align-items: center;
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
