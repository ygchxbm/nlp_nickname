<script setup>
import {useRouter} from 'vue-router'
import {submitTest} from "@/api";

const router = useRouter()
const historyParam = history.state;
const {test_id, real_nicknames, ai_nicknames, is_correct} = historyParam;
submitTest({test_id, real_nicknames, ai_nicknames, is_correct}).then(res => {
  console.log("submit successfully ！")
})

function backHome() {
  router.push({name: "home",})
}
</script>
<template>
  <div class="submit-successfully">
    <div class="main">
      <div class="content">
        <div class="log">
          <img src="@/assets/images/check-circle-filled.png" alt="check-circle-filled">
        </div>
        <div class="text">
          <span>提交成功，感谢您的参与！</span>
        </div>
        <div class="back-home" @click="backHome">
          <button>返回首页</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.submit-successfully {
  height: 100vh;
  background-image: url('../../assets/images/bg.png');
  background-repeat: no-repeat;
  overflow: hidden;

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 900px;
      height: 750px;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .log {
        width: 76px;
        height: 76px;
      }

      .text {
        color: #000000E6;
        //font-family: "PingFang SC";
        width: 216px;
        height: 40px;
        font-size: 18px;
        font-weight: 400;
        line-height: 40px;
        margin-top: 14px;
        margin-bottom: 20px;
        text-align: center;
      }

      .back-home {
        button {
          width: 220px;
          height: 40px;
          background: #FFFFFF;
          border: 1px solid #EBEBEBFF;
          color: #666666FF;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
