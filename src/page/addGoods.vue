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
     <el-col :span="12" :offset="6">
        <p class="title">添加食品</p>
        <el-form ref="foodForm" :model="foodForm" :rules="foodrule" label-width="80px">
          <el-form-item label="食品名称">
            <el-input v-model="foodForm.name"></el-input>
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
          name: ''
        },
        foodrule: {
          name: []
        }
      }
    },
    methods: {
      submitcategoryForm: function (val) {
        console.log('submitcategoryForm' + val)
      },
      addCategoryFun: function () {
        this.showAddCategory = !this.showAddCategory
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
  .form{
    min-width: 320px;
    border-radius: 4px;
    transition: all 1s;
    &:hover{

      box-shadow: 0 0 5px #ccc, 0 2px 3px #ddd;
    }
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
</style>
