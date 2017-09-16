<template>
  <div>
   <el-row :gutter="20">
       <el-col :span="16" :offset="4">
          <p class="title">食品选择</p>
          <el-form :model="categoryForm" ref="categoryForm" label-width="80px" class="form">
            <el-row class="category_select">
              <el-form-item label="食品种类">
                <el-select v-model="categoryForm.categorySelect" placeholder="请选择">
                  <el-option
                    v-for="item in categoryForm.categoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row class="add_category_row" :style="showAddCategory? 'height: 185px': ''">
              <div class="add_category">
                <el-form-item label="食品种类">
                  <el-input v-model="categoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="种类描述">
                  <el-input v-model="categoryForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitcategoryForm('categoryForm')">提交</el-button>
                </el-form-item>
              </div>
            </el-row>
            <div class="add_category_button" @click="addCategoryFun">
              <i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
              <i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
              <span>添加食品种类</span>
            </div>
          </el-form>
       </el-col>
   </el-row>

   <el-row :gutter="20">
     <el-col :span="16" :offset="4">
        <p class="title">添加食品</p>
        <el-form ref="foodForm" :model="foodForm" :rules="foodrule" label-width="80px" class="addForm">
          <el-form-item label="食品名称" prop="name">
            <el-input v-model="foodForm.name"></el-input>
          </el-form-item>
          <el-form-item label="食品活动">
            <el-input v-model="foodForm.activity"></el-input>
          </el-form-item>
          <el-form-item label="食品详情">
            <el-input v-model="foodForm.detail"></el-input>
          </el-form-item>
          <el-form-item label="上传食品图片">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="食品特点">
            <el-select v-model="foodvalue" multiple placeholder="请选择">
                <el-option
                  v-for="item in foodSpec"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="食品规格">
            <el-radio class="radio" v-model="radio" label="one">单规格</el-radio>
              <el-radio class="radio" v-model="radio" label="two">多规格</el-radio>
          </el-form-item>
          <el-row v-if="radio === 'one'">
             <el-form-item label="包装费">
                <el-input-number v-model="foodForm.package_free" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number v-model="foodForm.price" :min="1"></el-input-number>
              </el-form-item>
          </el-row>
          <el-row v-else style="text-align: center">
            <el-button type="primary" @click="dialogFormVisible = true">添加规格</el-button>

            <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
              <el-form :model="foodvalue" ref="addForm" :rules="addrule">
                <el-form-item label="规格" :label-width="formLabelWidth" prop="size">
                  <el-input v-model="foodvalue.size" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="包装费" :label-width="formLabelWidth">
                  <el-input-number v-model="foodvalue.package_free" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="价格" :label-width="formLabelWidth">
                  <el-input-number v-model="foodvalue.price" :min="1"></el-input-number>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSure">确 定</el-button>
              </div>
            </el-dialog>

             <el-table
              :data="foodForm.specs"
              border
              style="width: 100%;margin-top:20px">
              <el-table-column
                label="规格">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.size }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="包装费">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.package_free }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="价格">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确认添加食品</el-button>
          </el-form-item>
        </el-form>
     </el-col>
   </el-row>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        categoryForm: {
          categorySelect: '',
          name: '',
          description: '',
          categoryList: []
        },
        showAddCategory: false,
        foodForm: {
          name: '',
          activity: '',
          detail: '',
          specs: [
            {
              size: '默认',
              package_free: 0,
              price: 20
            }
          ]
        },
        foodrule: {
          name: [{required: true, message: '请输入食品名称', trigger: 'blur'}]
        },
        imageUrl: '',
        foodSpec: [
          {
            value: '01',
            label: '新品'
          },
          {
            value: '02',
            label: '招牌'
          }
        ],
        foodvalue: {
          size: '默认',
          package_free: 0,
          price: 20
        },
        radio: 'one',
        dialogFormVisible: false,
        formLabelWidth: '100px',
        addrule: {
          size: [{required: true, message: '请输入添加的规格', trigger: 'blur'}]
        }
      }
    },
    created () {
      this.$msgbox({
        title: '温馨提示',
        message: '你即将添加一条食品信息，你确定吗？'
      })
    },
    methods: {
      submitcategoryForm: function (val) {
        console.log('submitcategoryForm' + val)
      },
      addCategoryFun: function () {
        this.showAddCategory = !this.showAddCategory
      },
      handleAvatarSuccess: function (res, file) {
        this.imageUrl = ''
      },
      beforeAvatarUpload: function (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传的图片格式只能为jpg格式')
        }

        if (!isLt2M) {
          this.$message.error('上传的图片大小不能超过2M')
        }

        return isJPG && isLt2M
      },
      addSure: function () {
        this.foodForm.specs.push({...this.foodvalue})
        this.foodvalue.size = ''
        this.foodvalue.package_free = 0
        this.foodvalue.price = 20
        this.dialogFormVisible = false
      },
      handleDelete: function (index) {
        this.foodForm.specs.splice(index, 1)
      },
      submitForm: function () {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      }
    }
  }
</script>

<style scoped lang="less">

  p.title{
    width:100%;
    text-align:center;
    color: #222;
    ofnt-size: 20px;
    line-height: 50px;
  }
  .addForm, .form{
    min-width: 320px;
    border-radius: 4px;
    transition: all 1s;
    &:hover{

      box-shadow: 0 0 5px #ccc, 0 2px 3px #ddd;
    }
  }
  .addForm{
    padding: 20px 20px 0;
    border: 1px solid #ccc;
  }
  .category_select{
    border: 1px solid #ccc;
    padding: 20px 5px 0 5px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .add_category_row{
    overflow: hidden;
    transition: all 400ms;
    height: 0;
  }
  .add_category{
    background: #f9fafc;
    padding: 15px;
    border: 1px solid #ccc;
    border-top: none;
  }
  .add_category_button{
    border:1px solid #ccc;
    padding: 8px;
    text-align:center;
    cursor:pointer;
    border-top:0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    span, .edit_icon{
      transition: all 400ms;
      color: #ccc;
      font-size: 14px;
    }
    &:hover{
      background-color: #f9fafc;
      span, .edit_icon{
        color: #20a0ff;
      }
    }
  }
   .avatar-uploader, .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 100px;
      height: 100px;
    }
    .avatar-uploader:hover, .el-upload:hover {
      border-color: #20a0ff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
</style>
