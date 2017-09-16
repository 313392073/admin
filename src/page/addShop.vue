<template>
  <div style="padding: 20px">
    <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
      <el-form-item label="商铺名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-autocomplete
          class="inline-input"
          v-model="formData.address"
          :fetch-suggestions="querySearch"
          placeholder="请输入地址"
          @select="handleSelect"
        ></el-autocomplete>
        <br />
        <span>当前城市：{{city.address}}</span>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="formData.tel"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介" prop="description">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语" prop="mark">
        <el-input v-model="formData.mark"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类" prop="category">
        <el-cascader
          :options="cateOptions"
          v-model="formData.category"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="店铺特点">
        <span>品牌保证</span>
        <el-switch on-text="" off-text="" v-model="formData.delivery"></el-switch>
        <span>蜂鸟专送</span>
        <el-switch on-text="" off-text="" v-model="formData.feniao"></el-switch>
        <span>新开店铺</span>
        <el-switch on-text="" off-text="" v-model="formData.shop"></el-switch>
        <br />
        <span>外卖保</span>
        <el-switch on-text="" off-text="" v-model="formData.waisale"></el-switch>
        <span>准时达</span>
        <el-switch on-text="" off-text="" v-model="formData.ontime"></el-switch>
        <span>开发票</span>
        <el-switch on-text="" off-text="" v-model="formData.invoice"></el-switch>
       </el-form-item>
       <el-form-item label="配送费" prop="mark">
        <el-input-number v-model="formData.shipping" @change="handleChange" :min="1" :max="10"></el-input-number>
       </el-form-item>
       <el-form-item label="起送价" prop="mark">
         <el-input-number v-model="formData.sendprice" @change="handleChange" :min="1"></el-input-number>
       </el-form-item>
       <el-form-item label="营业时间">
         <el-col :span="12">
          <el-time-select
            placeholder="起始时间"
            v-model="formData.startTime"
            :picker-options="{
              start: '05:30',
              step: '00:15',
              end: '23:59'
            }">
          </el-time-select>
         </el-col>
         <el-col :span="12">
          <el-time-select
          placeholder="结束时间"
          v-model="formData.endTime"
          :picker-options="{
            start: '05:30',
            step: '00:15',
            end: '23:30'
          }">
          </el-time-select>
         </el-col>
        </el-form-item>
        <el-form-item label="上传店铺头像">
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
        <el-form-item label="上传营业执照">
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
        <el-form-item label="上传餐饮服务许可证">
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
        <el-form-item label="优惠活动">
           <el-select v-model="value" @change="selectActivity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
           </el-select>
        </el-form-item>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="活动标题"
          width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="活动名称"
          width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cname }}</span>
          </template>
        </el-table-column>
        <el-table-column
           label="活动详情"
           width="180">
           <template scope="scope">
             <span style="margin-left: 10px">{{ scope.row.detail }}</span>
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

      <el-form-item style="margin-top: 20px">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6"><el-button type="primary" @click="onSubmit">立即创建</el-button></el-col>
        </el-row>

      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        formData: {
          name: '',
          address: '',
          startTime: '',
          endTime: '',
          delivery: true,
          feniao: true,
          shop: true,
          waisale: true,
          invoice: true,
          ontime: false,
          shipping: 5,
          sendprice: 20,
          resource: '',
          desc: '',
          latitude: '',
          longitude: '',
          tel: '',
          description: '',
          mark: '',
          category: ['快餐便当', '简餐']
        },
        rules: {
          name: [
            {required: true, message: '商铺名称不能为空', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在3-5个字符', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '商铺地址不能为空', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '电话号码不能为空', trigger: 'blur'},
            {type: 'number', message: '电话号码必须是数字'}
          ]
        },
        city: {
          address: '成都'
        },
        cateOptions: [],
        imageUrl: '',
        value: '',
        options: [{
          value: '选项1',
          label: '满减优惠'
        }],
        tableData: [{
          title: '优惠',
          cname: '满减优惠',
          detail: '满30减5，满60减8'
        }]
      }
    },
    methods: {
      onSubmit: function () {
        console.log('submit')
      },
      querySearch: function (queryString, cb) {
      /*
        if (queryString) {
          const cityList = searchplace(this.city.id, queryString)
          if (cityList instanceof Array) {
            cityList.map(item => {
              item.value = item.address
              return item
            })
            cb(cityList)
          }
        }
        */
      },
      handleSelect: function (address) {
      /*
        this.formData.latitude = address.latitude
        this.formData.longitude = address.longitude
        */
      },
      handleChange: function () {
        console.log('handleChange')
      },
      handleAvatarSuccess: function (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload: function (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是jpg格式')
        }

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过2MB')
        }
        return isJPG && isLt2M
      },
      handleDelete: function (index, row) {
        console.log(index, row)
      },
      selectActivity: function () {
      /*
        $this.$prompt('请输入活动详情', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          if(value === null) {
            this.$message({
              type: 'info',
              message: '请输入活动详情'
            })
            return
          }
          let newObj = {}
          switch(this.activityValue) {
            case '满减优惠':
              newObj = {
                icon_name: '减',
                name: '满减优惠',
                description: value
              }
              break;
          }
        })
        */
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader, .el-upload {
      width: 178px;
      height: 178px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
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
