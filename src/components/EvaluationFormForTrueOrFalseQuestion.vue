<script setup>
import {ref} from "vue";

defineProps({
  title: String,
  time: String,
  nameGroups: Object
})

const selectedOptions = ref({});

function submitQuestionnaire() {
}

function selectedOption(group, index, key) {
  Reflect.set(selectedOptions.value, index, {
    isRealName: group.isRealName,
    selectedValue: key,
  })
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
              <span>{{ index > 9 ? index + 1 : `0${index + 1}` }}</span>
              <div>{{ group.names.join(' , ') }}</div>
            </div>
            <div class="eFFCq-option-radios">
              <div v-for="(item,key) in group.option"
                   @click="selectedOption(group,index,key)"
                   :class="[{
                     'eFFCq-option-radio':selectedOptions[index]?.selectedValue!==key||true},{
                     'eFFCq-option-radio-selected':selectedOptions[index]?.selectedValue===key}]">
                <div class="eFFCq-radio-icon">
                  <div class="eFFCq-radio-icon-child"></div>
                </div>
                <div class="eFFCq-radio-label">
                  <span>{{ item.value }}</span>
                </div>
              </div>
            </div>
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

    .eFFCq-form-main {
      margin-top: 10px;
      border-top: 1px solid #EBEBEBFF;

      .eFFCq-ul {
        .eFFCq-option {
          width: 800px;
          height: 118px;
          margin: 10px 0;
          list-style: none;
          border-bottom: 1px solid #EBEBEBFF;

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

          .eFFCq-option-radios {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .eFFCq-option-radio {
              width: 100%;
              height: 40px;
              cursor: pointer;
              display: flex;
              align-items: center;
              margin-top: 1px;

              .eFFCq-radio-icon {
                width: 16px;
                height: 16px;
                border-radius: 8px;
                border: 1px solid #DCDCDCFF;
                margin-left: 25px;
                margin-right: 8px;
              }

              .eFFCq-radio-label {
                line-height: 40px;
                //text-align: center;
              }
            }

            .eFFCq-option-radio:hover {
              border-radius: 2px;
              background: #e1f4f9;

              .eFFCq-radio-icon {
                background: #FFFFFF;
              }
            }

            .eFFCq-option-radio-selected {
              width: 100%;
              height: 40px;
              cursor: pointer;
              display: flex;
              align-items: center;
              border-radius: 2px;
              background: #e1f4f9;

              .eFFCq-radio-icon {
                width: 16px;
                height: 16px;
                border-radius: 8px;
                border: 1px solid #00A9CEFF;
                margin-left: 25px;
                margin-right: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #FFFFFF;

                .eFFCq-radio-icon-child {
                  width: 8px;
                  height: 8px;
                  border-radius: 4px;
                  background: #00A9CEFF;
                }
              }

              .eFFCq-radio-label {
                line-height: 40px;
                //text-align: center;
              }
            }
          }
        }
      }
    }

  }
}
</style>
