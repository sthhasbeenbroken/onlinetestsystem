<template>
  <section class="index">
    <div class="hello"><p class="title"><strong>教务公告：</strong></p>
    </div>
    <div class="msg">
      
      <el-table
    :data="tableData"
    border
    style="width:95%"
    fit
    @row-click="openMsg"
>
    <el-table-column
        prop="goodsNo"
        label="公告编号"
        width="150"
        align="center"
    >
    </el-table-column>
    <el-table-column
        prop="goodsName"
        label="公告内容"
       
        align="center"
      
    >
    </el-table-column>
    <el-table-column
        prop="goodsTime"
        label="日期"
        width="150"
        align="center"
        
    >
    </el-table-column>
</el-table>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
 			   {
			        goodsNo:"10005100000123",
			        goodsName:"关于清明节放假的通知",
			        goodsTime:"2020-3-20 12：00"
			    },
          {
			        goodsNo:"10005100000124",
			        goodsName:"关于放假的通知",
			        goodsTime:"2020-3-20 12：00"
			    },
          {
			        goodsNo:"10005100000125",
			        goodsName:"关于调休的相关事宜",
			        goodsTime:"2020-3-20 12：00"
			    },
                    {
			        goodsNo:"10005100000126",
			        goodsName:"关于调休的相关事宜",
			        goodsTime:"2020-3-22 12：00"
			    },
                    {
			        goodsNo:"10005100000127",
			        goodsName:"关于调休的相关事宜",
			        goodsTime:"2020-3-24 12：00"
			    }
			],

      user: { //用户信息
        userName: null,
        userId: null
      } 
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() { //获取用户信息
      let userName = this.$cookies.get("cname")
      let userId = this.$cookies.get("cid")
      this.user.userName = userName
      this.user.userId = userId
    },
    openMsg() {
      this.$alert('根据《国务院办公厅关于2022年部分节假日安排的通知》精神，A区行政服务中心将于4月5日（星期五）至4月7日（星期天）进行清明节放假调休，共3天，放假期间不受理业务。4月8日（星期一）开始正常上班受理业务。望市民朋友相互转告，给您带来不便，敬请谅解。','清明节放假通知',{
        confirmButtonText: '确定'
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.index {
  margin-left: 70px;
  .hello {
    font-size: 20px;
    color: #726f70;
    .icon-xihuan {
      font-size: 30px;
      color: #dd6572;
    }
  }
  .title{
    padding:10px
  }
  .msg {
    .title {
      font-size: 16px;
      color: #000;
      margin-top: 20px;
      margin-left: 10px;
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 200px;
      overflow: hidden;
    }
    li {
      margin-top: 10px;
      font-size: 14px;
      color: lightcoral;
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>

