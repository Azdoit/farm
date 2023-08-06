<template>
  <div class="wrapper">
    <Map :date="curDate"></Map>
    <h3 class="title"></h3>
    <div class="imgDate">
      <span class="text1">影像</span>
      <span class="text2">日期</span>
      <div
        v-for="(item, index) in dateList"
        :key="index"
        class="date"
        :class="{ active: curDate === index }"
        @click="changeDate(index)"
      >
        {{ item.date }}
      </div>
    </div>
    <div class="modify">
      <span>我要修改</span>
    </div>
    <svg-icon name="camera"></svg-icon>
  </div>
</template>

<script setup>
import Map from "@/components/map/index.vue";
import { ref, reactive,watch } from "vue";
const curDate = ref(0);
const map = ref(null)
const dateList = reactive([
  {
    date: "7-9",
  },
  {
    date: "7-10",
  },
  {
    date: "7-11",
  },
]);
const changeDate = (index) => {
  curDate.value = index;
};
// watch(curDate,(newVal) => {
//   console.log(newVal);
// })
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .title {
    position: absolute;
    top: 50px;
    left: 130px;
    font-weight: bold;
    color: #ffffff;
    font-size: 18px;
  }
  .imgDate {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 109px;
    left: 13px;
    span {
      color: #fff;
      font-size: 14px;
      margin-top: 5px;
    }

    .date {
      width: 40px;
      height: 27px;
      margin-top: 15px;
      line-height: 27px;
      font-size: 14px;
      color: #545454;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.7);
      border: 1px solid #ffffff;
      border-radius: 30px;
      cursor: pointer;
      &.active {
        background-color: rgba(255, 234, 0, 0.7);
        border: 1px solid rgba(255, 241, 9, 1);
        color: #000;
      }
    }
  }
  .modify {
    position: absolute;
    top: 78px;
    right: 14px;
    width: 79px;
    height: 36px;
    background-color: rgba(12, 188, 187, 0.84);
    border: 1px solid #24e0e3;
    border-radius: 5px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    span {
      font-size: 14px;
      color: #fff;
    }
  }
  .svg-icon {
    position: absolute;
    bottom: 16px;
    left: 155px;
    font-size: 67px;
    cursor: pointer;
  }
}
</style>
