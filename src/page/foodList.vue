<template>
  <div>
    <el-table
      :data="tableData"
      @expand='expand'
      :expand-row-keys='expendRow'
      :row-key="row => row.index"
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
           <el-form-item label="食品名称">
             <span>{{ props.row.name }}</span>
           </el-form-item>
           <el-form-item label="餐馆名称">
             <span>{{ props.row.restaurant_name }}</span>
           </el-form-item>
           <el-form-item label="食品 ID">
             <span>{{ props.row.item_id }}</span>
           </el-form-item>
           <el-form-item label="餐馆 ID">
             <span>{{ props.row.restaurant_id }}</span>
           </el-form-item>
           <el-form-item label="食品介绍">
             <span>{{ props.row.desc }}</span>
           </el-form-item>
           <el-form-item label="餐馆地址">
             <span>{{ props.row.restaurant_address }}</span>
           </el-form-item>
           <el-form-item label="食品评分">
             <span>{{ props.row.rating }}</span>
           </el-form-item>
           <el-form-item label="食品分类">
             <span>{{ props.row.category_name }}</span>
           </el-form-item>
           <el-form-item label="月销量">
             <span>{{ props.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="食品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="食品介绍"
        prop="desc">
      </el-table-column>
      <el-table-column
        label="评分"
        prop="rating">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="食品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品分类" :label-width="formLabelWidth">
          <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">
            <el-option
              v-for="item in menuOptions"
              :key="item.value"
              :label="item.label"
              :value="item.index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品图片" :label-width="formLabelWidth">
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
      </el-form>
      <el-row style="overflow: auto;text-align: center">
        <el-table :data="gridData" :row-class-name="tableRowClassName">
          <el-table-column property="specs" label="规格" width="150"></el-table-column>
          <el-table-column property="packing_fee" label="包装费" width="200"></el-table-column>
          <el-table-column property="price" label="价格"></el-table-column>
          <el-table-column label="操作" >
            <template scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="deleteSpecs(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="specsFormVisible = true" style="margin: 10px;">添加规格</el-button>
       </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加规格" :visible.sync="specsFormVisible">
      <el-form :model="specsForm" :rules="specsFormrules" >
        <el-form-item label="规格" :label-width="formLabelWidth" prop = "specs">
          <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装费" :label-width="formLabelWidth">
           <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
           <el-input-number v-model="specsForm.price" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="specsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addspecs">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        dialogFormVisible: false,
        specsFormVisible: false,
        formLabelWidth: '100px',
        expendRow: [],
        imageUrl: '',
        selectIndex: null,
        selectMenu: {},
        menuOptions: [],
        tableData: [{
          name: '好滋好味鸡蛋仔',
          restaurant_name: 'gg1',
          item_id: '483',
          restaurant_id: '1156',
          desc: '456',
          restaurant_address: '12987122',
          rating: '4.5',
          category_name: '江浙小吃/小吃零食',
          month_sales: '328'
        }],
        gridData: [{
          specs: '默认',
          packing_fee: '0.00',
          price: '18'
        }],
        form: {
          name: '',
          region: ''
        },
        specsFormrules: {
          specs: [
            {required: true, message: '请输入规格', trigger: 'blur'}
          ]
        },
        specsForm: {
          specs: '',
          packing_free: 0,
          price: 20
        }
      }
    },
    computed: {
      gridData: function () {
        let gridData = []
        if (this.form.specfoods) {
          this.form.specfoods.forEach(item => {
            gridData.push({
              gridData: item.specs_name,
              pack_fee: item.packing_fee,
              price: item.price
            })
          })
          return gridData
        }
      }
    },
    methods: {
    /*
      getMenu: function () {
        this.menuOptions = []
        const menu = getMenu({restaurant_id: this.form.restaurant_id, allMenu: true})
        menu.forEach((item, index) => {
          this.menuOptions.push({
            label: item.name,
            value: item.id,
            index
          })
        })
      },
      */
      handleEdit: function (index, row) {
        this.dialogFormVisible = true
        this.getSelectItemData(row, 'edit')
      },
      /*
      getSelectItemData: function (row, type) {
        const restaurant = getResturantDetail(row.resturant_id)
        const category = getMenuById(row.category_id)

        this.form = {...row, ...{resurant_name: resurant.name, restaurant_address: restaurant.address, category_name: category.name}}
        this.selescTable = {label: category.name, value: row.category_id}
        this.form.splice(row.index, 1, {...this.selectTable})

        this.$nextTick(() => {
          this.expendRow.push(row.index)
        })
        if (type === 'edit' && this.restaurant_id !== row.restaurant_id) {
          this.getMenu()
        }
      },
      */
      handleDelete: function (index, row) {
        console.log(index, row)
      },
      expand: function (row, status) {
        console.log('expend')
      },
      handleAvatarSuccess: function (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload: function (file) {
        const isJPG = file.type === 'image/jepg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是JPG格式')
        }

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过2MB')
        }

        return isJPG && isLt2M
      },
      tableRowClassName: function (row, index) {
        if (index === 1) {
          return 'info-row'
        } else if (index === 3) {
          return 'positive-row'
        }
        return ''
      },
      deleteSpecs: function (index) {
        this.gridData.splice(index, 1)
      },
      addspecs: function () {
        this.specsFormVisible = false
        this.gridData.push({...this.specsForm})
        this.specsForm.specs = ''
        this.specsForm.packing_fee = 0
        this.specsForm.price = 20
      }
    }
  }
</script>
<style scoped>
   .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .avatar-uploader, .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 178px;
        height: 178px;
      }
      .avatar-uploader:hover ,.el-upload:hover {
        border-color: #20a0ff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
</style>
