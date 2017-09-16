<template>
  <div>
     <el-table
      :data="orderData"
      @expand="expand"
      :expand-row-keys="expendRow"
      :row-key="row => row.index"
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
    </el-table>
  </div>
</template>
<script type="text/javascript">
  import {getResturantDetail, getUserInfo, getAddressById} from '../data/getData.js'
  export default {
    data () {
      return {
        orderData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        expendRow: [],
        currentRow: null,
        restaurant_id: null
      }
    },
    /*
    created() {
      this.restaurant_id = this.$route.query.restaurant_id
      this.initData()
    },
    */
    methods: {
    /*
      initData: function () {
        const countData = getOrderCount({restaurant_id: this.restaurant_id})
        if (countData.status === 1) {
          this.count = countData.count
        } else {
          console.log('获取数据失败')
        }
        this.getOrders()
      },
      getOrders: function () {
        const Orders = getOrderList({ restaurant_id: this.restaurant_id})
        this.orderData: []
        Orders.forEach( (item, index) => {
          const orderData = {}
          orderData.id = item.id
        })
      },
      */
      expand: function (row, status) {
        const restaurant = getResturantDetail(row.restaurantId)
        const userInfo = getUserInfo(row.userId)
        const addressInfo = getAddressById(row.addressId)
        if (status) {
          this.orderData.splice(row.index, 1, {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, address: addressInfo.address, user_name: userInfo.username}})
          this.$nextTick(() => {
            this.expendRow.push(row.index)
          })
        }
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
</style>
