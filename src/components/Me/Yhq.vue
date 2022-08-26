<template>
  <div>
    <van-nav-bar title="优惠券" left-arrow
    @click-left="onClickLeft"/>
    <!-- 优惠券 -->
    <van-coupon-cell
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    @click="showList=true"/>
    <van-popup v-model="showList"
    round
    position="bottom"
    style="height:90%;padding-top:4px">
    <van-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    :disabled-coupons="disabledCoupons"
    @change="onChange"
    @exchange="onExchange"/>
    </van-popup>
  </div>
</template>
<script>
const coupon ={
  available:1,
  condition:'无使用门槛\n最多优惠12元',
  reason:'',
  value:150,
  name:'优惠券名称',
  startAt:1489104000,
  endAt:1514592000,
  valueDesc:'1.5',
  unitDesc:'元',
}

export default {
 data(){
   return{
     showList:'',
     chosenCoupon:-1,
     coupons:[coupon],
     disabledCoupons:[coupon],
   }
 },
 methods:{
   onClickLeft(){
     history.go(-1)
   },
   onChange(index){
     this.showList = false
     this.chosenCoupon = index
   },
   onExchange(Code){
     this.coupons.push(coupon)
   }
 }
};
</script>