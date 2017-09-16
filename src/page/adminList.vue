<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
       tooltip-effect="dark"
      highlight-current-row
       @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column type='selection'>
      </el-table-column>
      <el-table-column
        label="编号"
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        property="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1]])">选中第一行</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        tableData: [{
          date: '2017-05-02',
          name: '王小虎01',
          address: '上海市普陀区金沙江路'
        },
        {
          date: '2017-05-02',
          name: '王小虎02',
          address: '上海市普陀区金沙江路'
        },
        {
          date: '2017-05-02',
          name: '王小虎03',
          address: '上海市普陀区金沙江路'
        },
        {
          date: '2017-05-02',
          name: '王小虎04',
          address: '上海市普陀区金沙江路'
        }],
        currentRow: [],
        currentPage: 2
      }
    },
    methods: {
    /*
      initData: function () {
        const countData = adminCount()
        if (countData.status === 1) {
          this.count = countData.count
        } else {
          console.log('获取数据失败')
        }
      },
      */
      handleSelectionChange: function (val) {
        this.currentRow = val
      },
      toggleSelection: function (row) {
        console.log(row)
        if (row) {
          row.forEach(item => {
            this.$refs.singleTable.toggleRowSelection(item)
          })
        } else {
          this.$refs.singleTable.clearSelection()
        }
      },
      handleSizeChange: function (val) {
        console.log(`每页${val}页`)
      },
      handleCurrentChange: function (val) {
      /*
        this.currentPage = val
        this.offset = (val - 1)*this.limit
        thi.getAdmin() */
        console.log(`当前页：${val}`)
      } /* ,
      getAdmin: function () {
        const res = adminList({offset: this.offset, limit: this.limit})
        if (res.status === 1) {
          this.tableData = []
          res.data.forEach( item => {
            const tableItem = {
              date: item.date,
              name: item.name,
              address: item.address
            }
            this.tableData.push(tableItem)
          })
        }
      } */
    }
  }
</script>
