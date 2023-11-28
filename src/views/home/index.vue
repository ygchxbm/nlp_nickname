<script setup>
import {useRouter} from 'vue-router';
import {ref, onMounted} from "vue";
import {deleteList, getTestList} from "@/api";
import {ElMessage} from 'element-plus'

const router = useRouter()
const questionnaires = ref([])

onMounted(() => {
  getTestList().then(res => {
    questionnaires.value = res;
  }).catch(err => {
    ElMessage({
      showClose: true,
      message: err.message,
      type: 'error',
    })
  })
})

function responseQuestions(row, column) {
  if (column.label === "评测标题") {
    const questionnaire = questionnaires.value.filter(item => {
      const {id} = item;
      return id === row.id
    })[0]
    const responsePathNameMap = {
      0: "responseChoiceQuestions",
      1: "responseTrueOrFalseQuestions",
      2: "responseLongTextQuestions"
    }
    const name = responsePathNameMap[questionnaire.question_type];
    router.push({
      name,
      state: {
        id: row.id,
      }
    })
  }
}

function share(id) {
  const questionnaire = questionnaires.value.filter(item => {
    return item["id"] === id
  })[0]
  const responsePathMap = {
    0: "/response-evaluation/choiceQuestions",
    1: "/response-evaluation/trueOrFalseQuestions",
    2: "/response-evaluation/longTextQuestions"
  }
  const path = responsePathMap[questionnaire.question_type];
  const url = window.location.href.replace('/home', path) + `?id=${id}`
  navigator.clipboard.writeText(url);
  ElMessage({
    message: '链接已复制到粘贴板',
    type: 'success',
  })
}

function deleteRow() {
  const id = arguments[0]
  questionnaires.value = questionnaires.value.filter(item => {
    return item["id"] !== id
  })
  return deleteList((id));
}

function doLastTimeFunc(func, delay) {
  const promises = [];
  let tempValue, listener;
  let deleteNum = 0
  return function () {
    const promise = func(...arguments);
    promise.then(res => {
      deleteNum++
      tempValue = res
    })
    promises.push(promise)
    if (!listener) {
      listener = setTimeout(promiseAll, delay);
    } else {
      clearTimeout(listener);
      listener = setTimeout(promiseAll, delay);
    }

    function promiseAll() {
      Promise.all(promises).then(() => {
        getTestList().then(res => {
          questionnaires.value = res;
        })
      })
    }
  }
}

const tempDeleteRow = doLastTimeFunc(deleteRow, 1000)

</script>
<template>
  <div class="home">
    <div class="content">
      <el-table @cell-click="responseQuestions" :data="questionnaires" border style="width: 1082px">
        <el-table-column :resizable="false" prop="title" label="评测标题" width="680" style="background:#00000099;"/>
        <el-table-column :resizable="false" prop="create_time" label="创建时间" width="200"/>
        <el-table-column :resizable="false" label="操作" width="200">
          <template #default="scope">
            <el-button link size="small" @click="share(scope.row.id)">
              <span class="btn-span btn-share">分享</span></el-button>
            <el-button link size="small" @click.prevent="tempDeleteRow(scope.row.id)">
              <span class="btn-span btn-delete">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
.home {
  height: 100%;
  display: flex;
  justify-content: center;

  .content {
    padding-top: 72px;
    padding-bottom:12px;

    :deep(.el-table__inner-wrapper) {
      border: 1px solid #E7E7E7;
      box-sizing: border-box;
      overflow: hidden;
    }

    :deep(.el-table__row):hover td {
      background: #f8f8f8;
    }

    :deep(.el-table__row .cell) {
      color: #000000E6;
      font-size: 14px;
      font-weight: 400;
    }

    :deep(.is-leaf) {
      background: #f8f8f8;
    }

    :deep(.is-leaf.cell) {
      color: #00000099;
      font-size: 14px;
      font-weight: 400;
    }

    :deep(.el-table__row :first-child .cell) {
      color: #00A9CEFF;
      cursor: pointer;
    }


    :deep(.el-table_1_column_2) {
      text-align: center;
    }

    :deep(.el-table_1_column_3) {
      text-align: center;
    }

  }
}

.btn-span {
  margin: 0 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
}

.btn-share {
  &:before {
    content: "";
    position: absolute;
    top: 20px;
    left: 24px;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/share.png) no-repeat;
    background-size: 75% 75%;
  }
}

.btn-share:hover {
  color: #00A9CEFF;

  &:before {
    background: url(../../assets/images/shareHover.png) no-repeat;
    background-size: 75% 75%;
  }
}

.btn-delete {
  &:before {
    content: "";
    position: absolute;
    top: 20px;
    left: 109px;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/delete.png) no-repeat;
    background-size: 75% 75%;
  }
}

.btn-delete:hover {
  color: #E34D59E6;

  &:before {
    background: url(../../assets/images/deleteHover.png) no-repeat;
    background-size: 75% 75%;
  }
}
</style>
