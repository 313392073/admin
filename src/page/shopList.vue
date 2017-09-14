<template>
  <div>
    <el-table :data="tableDate" style="width:100%">
      <el-table-column type="expand">
         <template scope="props">
           <el-form label-position="left" inline class="demo-table-expand">
             <el-form-item label="店铺名称">
               <span>{{ props.row.name }}</span>
             </el-form-item>
             <el-form-item label="店铺地址">
               <span>{{ props.row.adress }}</span>
             </el-form-item>
             <el-form-item label="店铺介绍">
               <span>{{ props.row.description }}</span>
             </el-form-item>
             <el-form-item label="店铺 ID">
               <span>{{ props.row.id }}</span>
             </el-form-item>
             <el-form-item label="联系电话">
               <span>{{ props.row.tel }}</span>
             </el-form-item>
             <el-form-item label="评分">
               <span>{{ props.row.rating }}</span>
             </el-form-item>
             <el-form-item label="销售量">
               <span>{{ props.row.num }}</span>
             </el-form-item>
             <el-form-item label="分类">
               <span>{{ props.row.category }}</span>
             </el-form-item>
           </el-form>
         </template>
      </el-table-column>
      <el-table-column
        label="店铺名称"
        prop="id">
      </el-table-column>
      <el-table-column
        label="店铺地址"
        prop="name">
      </el-table-column>
      <el-table-column
        label="店铺描述"
        prop="description">
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="info"
            @click="handleAdd(scope.$index, scope.row)">添加食品</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- Form -->
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-autocomplete
            class="inline-input"
            v-model="form.address"
            :fetch-suggestions="querySearch"
            placeholder="请输入详细地址"
            @select="handleSelect"
            ></el-autocomplete>
            <br />
          <span>当前城市：{{city.name}}</span>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-cascader
            :options="categoryOptions"
            v-model="selectedCategory"
            @active-item-change="handleItemChange"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="商铺图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="baseUrl + '/v1/adding/shop'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type='text/javascript'>
 // import {foodCategory, getResturants, updateResturant} from '../data/getData.js'
  export default {
    data () {
      return {
        tableDate: [{
          name: '好滋好味鸡蛋仔',
          address: '上海市普陀区真北路',
          description: '今天天气不错',
          id: '001',
          tel: '13458563587',
          rating: '10333',
          num: '886',
          category: '江浙小吃/小吃零食'
        }],
        borders: true,
        dialogFormVisible: false,
        imageUrl: '',
        form: {},
        formLabelWidth: '120px',
        city: {},
        nowadress: [],
        categoryOptions: [],
        selectedCategory: []
      }
    },
    methods: {
     /* getCategory: function () {
        const categories = foodCategory()
        categories.forEach((item, index) => {
          if (index === 0) {
            return
          }
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            }
            item.sub_categories.forEach((subitem, index) => {
              if (index === 0) {
                return
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              })
            })
            this.categoryOptions.push(addnew)
          }
        })
      }, */
      handleEdit: function (index, row) {
        this.dialogFormVisible = !this.dialogFormVisible
        this.form = row
        this.selectedCategory = row.category.split('/')
        console.log(this.categoryOptions.length)
        /*
        if (!this.categoryOptions.length) {
          this.getCategory()
        }
        */
      },
      handleAdd: function (index, row) {
        this.$router.push({path: 'addFoods', query: {restaurant_id: row.id}})
      },
      handleDelete: function (index, row) {
       // const res = deleteReaturant(row.id)
        const res = {status: 2}
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '删除店铺成功'
          })
          this.form.splice(index, 1)
        } else {
          this.$message({
            type: 'error',
            message: '错误,删除失败'
          })
          console.log('删除店铺失败')
        }
      },
      handleAvatarSuccess: function (res, file) {
        if (res.status === 1) {
          this.imageUrl = res.imageUrl
        }
      },
      querySearch: function (qS, cb) {
        var res = this.nowadress
        var result = qS ? res.filter(this.createFilter(qS)) : res
        cb(result)
      },
      createFilter: function (qS) {
        return (res) => {
          return (res.value.indesOf(qS.toLowerCase()) === 0)
        }
      },
      handleSelect: function (item) {
        console.log(item)
        // const {address, latitude, longitude} = item
        // this.form.address = {adress, latitude, longitude}
      },
      beforeAvatarUpload: function (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 jpg格式！')
        }

        if (isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }

        return isJPG && isLt2M
      },
      handleItemChange: function (val) {
        console.log('active item:', val)
      },
      updateShop: function () {
        console.log('提交')
      /*
        this.dialogFormVisible = false
        var res = updateResturant(this.form)
        if (res === 1) {
          this.$message({
            type: 'success',
            message: '更新店铺信息成功'
          })
          this.getResturants()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
        */
      }
    }
  }
</script>

<style scoped lang="less">
  .demo-table-expand{
    font-size: 0;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .avatar-uploader,.el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position:relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
  .avatar-uploader:hover, .el-upload:hover {
    border-color: #20a0ff;
    border-width: 2px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width:100px;
    height:100px;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .avatar {
    width:100px;
    height:100px;
    display: block;
  }
</style>
