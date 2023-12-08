<!-- 主页 -->
<script setup lang="ts">
import * as echarts from "echarts"
import {hotelSaleInfo} from '../api/room'
import { onMounted,ref } from "vue"
const getRoomTypeList=ref<any>([])
const getHotelSaleInfo=async ()=>{
  await hotelSaleInfo().then((res)=>{
    getRoomTypeList.value=res.data
    onShowEchart()
  })
}
const onShowEchart = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: '酒店房型销售额信息'
    },
    tooltip: {},
    xAxis: {
      data: getRoomTypeList.value.map((item:any)=>{
        return item.roomTypeName
      })
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: getRoomTypeList.value.map((item:any)=>{
          return item.typeTotalMoney
        })
      }
    ]
  });
}
onMounted(()=>{
  getHotelSaleInfo()
  onShowEchart()
})

</script>

<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div id="main"></div>
</template>

<style scoped lang="scss">
#main {
  padding: 20px;
  box-sizing: border-box;
  width: calc(100vw - 200px);
  height: calc(100vh - 60px);
}
</style>