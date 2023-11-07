<script setup>
import shareIcon from '@/assets/images/share.png';
import deleteIcon from '@/assets/images/delete.png';

const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>
<template>
  <div class="home">
    <div class="content">
      <el-table :data="tableData" border style="width: 1082px">
        <el-table-column :resizable="false" prop="date" label="评测标题" width="680" style="background:#00000099;"/>
        <el-table-column :resizable="false" prop="name" label="创建时间" width="200"/>
        <el-table-column :resizable="false" label="操作" width="200">
          <template #default>
            <el-button link size="small" @click="handleClick">
              <span class="btn-span btn-share">分享</span></el-button>
            <el-button link size="small">
              <span class="btn-span btn-delete">删除</span></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
.home {
  height: 100vh;
  background: #f8f8f8;
  display: flex;
  justify-content: center;

  .content {
    padding-top: 72px;

    :deep(.el-table__inner-wrapper) {
      border: 1px solid #e6e5e5;
      box-sizing: border-box;
    }

    :deep(.el-table__row):hover td {
      background: #f8f8f8;
    }

    :deep(.el-table__row) .cell {
      color: #000000E6;
      font-size: 14px;
      font-weight: 400;
    }

    :deep(.is-leaf) {
      background: #f8f8f8;
    }

    :deep(.is-leaf) .cell {
      color: #00000099;
      font-size: 14px;
      font-weight: 400;
    }

    :deep(.el-table__row) .el-table_1_column_1 .cell {
      cursor: pointer;
    }

    :deep(.el-table__row) .el-table_1_column_1 .cell:hover {
      color: #00A9CEFF;
    }

    :deep(.el-table_1_column_2) {
      text-align: center;
    }

    :deep(.el-table_1_column_3) {
      text-align: center;
    }

    :deep(.el-table__row) .el-table_1_column_3 {
      .el-button {
      //display: flex; //align-items: center;

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

      }
    }

  }
}
</style>
