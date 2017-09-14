<template>
  <div class="fillcontain">
     <el-table :data="tableData" fit border style="width: 100%" max-height="250">
        <el-table-column  fixed prop="order" label="编号" width="120"></el-table-column>
        <el-table-column  prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column  prop="province" label="省份" width="120"></el-table-column>
        <el-table-column  prop="city"  label="市区" width="120"></el-table-column>
        <el-table-column  prop="address"  label="地址"  width="300"></el-table-column>
        <el-table-column  prop="zip"  label="邮编"  width="120"></el-table-column>
        <el-table-column  prop="time"  label="时间"  width="120"></el-table-column>
        <el-table-column  prop="state"  label="状态"  width="120"></el-table-column>
        <el-table-column  fixed="right"  label="操作"  width="120">
            <template scope="scope">
              <el-button  @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small"> 移除</el-button>
            </template>
        </el-table-column>
      </el-table>
    <div class="block" style="margin-top:20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage2"
        :page-sizes="[10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="30">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        tableData: [
          {
            order: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路',
            zip: 200333,
            time: '2017-09-07',
            state: '在线'
          },
          {
            order: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路',
            zip: 200333,
            time: '2017-09-07',
            state: '在线'
          },
          {
            order: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路',
            zip: 200333,
            time: '2017-09-07',
            state: '在线'
          }
        ],
        currentPage2: 2
      }
    },
    methods: {
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      handleSizeChange (val) {
        console.log('每页' + val + '条')
      },
      handleCurrentChange (val) {
        console.log(`当前页:${val}`)
      }
    }
  }
</script>
