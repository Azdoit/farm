<template>
  <div
    class="wrapper"
    element-loading-background="rgba(122, 122, 122, 0.4"
    v-loading="loading"
  >
    <Map :option="curIndex" :analysis="loading" :options="curOptions"></Map>
    <div class="weather">
      <svg-icon name="typhoon" />
      <div class="text">
        <span>气象理赔指数</span>
        <div class="box">已达到</div>
      </div>
    </div>
    <div class="modify" @click="handleClick">
      <svg-icon name="search" />
      <span>开始评估</span>
    </div>
    <div class="ill">
      <div
        class="ill_item"
        v-for="(item, index) in ill"
        :key="item.text"
        @click="changeOption(index)"
      >
        <div class="box" :style="{ backgroundColor: item.color }"></div>
        <span>{{ item.text }}</span>
      </div>
    </div>
    <!-- <el-tooltip
      effect="dark"
      content="下载"
      placement="right"
    > -->
    <svg-icon name="download" class="download"></svg-icon>
    <!-- </el-tooltip> -->
    <div
      class="result_title"
      :class="{ 'show-list': show, 'close-list': !show }"
      @click="changeList"
    >
      <span class="text">评估结果</span>
      <svg-icon :name="show ? 'down' : 'up'"></svg-icon>
    </div>
    <Transition name="show">
      <div class="result_list" v-show="show">
        <div class="result_list_title">
          <span>田块名称</span>
          <span>灾害种类</span>
          <span>灾害面积</span>
        </div>
        <div class="result_list_content">
          <ul class="list">
            <li v-for="(item, index) in fields" :key="index" class="list_item">
              <span>{{ item.name }}</span>
              <span>{{ item.type }}</span>
              <span class="active">{{ item.area + "亩" }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import Map from "@/components/map2/index.vue";
import { ref, reactive } from "vue";
const show = ref(false);
const loading = ref(false);
const curIndex = ref(3);
const curOptions = reactive([
  { index: 0, show: true },
  { index: 1, show: true },
  { index: 2, show: true },
  { index: 3, show: true },
]);
const curShowArr = reactive([true, true, true, true]);
const ill = reactive([
  { color: "#FF0000", text: "重度" },
  {
    color: "#FFA200",
    text: "中度",
  },
  {
    color: "#FFFF07",
    text: "轻度",
  },
  {
    color: "#2CFF5D",
    text: "无",
  },
]);
const fields = reactive([
  {
    name: "鱼塘西南田块1",
    type: "倒伏",
    area: 14.6,
  },
  {
    name: "鱼塘西南田块2",
    type: "倒伏",
    area: 14.6,
  },
  {
    name: "鱼塘西南田块3",
    type: "倒伏",
    area: 14.6,
  },
]);
const changeOption = (index) => {
  curIndex.value = index;
  curOptions[index].show = !curOptions[index].show;
  // console.log(curOptions[index].show);
};
const changeList = () => {
  show.value = !show.value;
};
const handleClick = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .weather {
    position: absolute;
    top: 54px;
    left: 16px;
    display: flex;
    gap: 10px;
    .svg-icon {
      font-size: 35px;
    }
    .text {
      display: flex;
      flex-direction: column;
      color: #e2e2e2;
      font-size: 12px;
      gap: 3px;
      .box {
        height: 17px;
        line-height: 17px;
        text-align: center;
        width: 48px;
        border: 0.5px solid #dedede;
        border-radius: 10px;
      }
    }
  }
  .modify {
    position: absolute;
    top: 52px;
    right: 12px;
    width: 119px;
    height: 30px;
    background-color: rgba(84, 147, 255, 0.9);
    border: 1px solid rgba(197, 219, 255, 0.49);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    .svg-icon {
      font-size: 18px;
    }
    span {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }
  .ill {
    position: absolute;
    top: 314px;
    right: 14px;
    font-size: 14px;
    &_item {
      color: #fff;
      display: flex;
      align-items: center;
      gap: 2px;
      margin-bottom: 16px;
      cursor: pointer;
      .box {
        width: 18px;
        height: 18px;
        margin-right: 8px;
        border-radius: 2px;
      }
    }
  }
  .download {
    position: absolute;
    top: 490px;
    right: 12px;
    font-size: 44px;
    cursor: pointer;
  }
  .result_title {
    position: absolute;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 100%;
    background-color: #00bfbf;
    cursor: pointer;
    .text {
      font-size: 16px;
      font-weight: bold;
      margin-right: 8px;
      color: #fff;
    }
    .svg-icon {
      font-size: 15px;
    }
  }
  .result_list {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    height: 160px;
    font-size: 14px;
    &_title {
      padding-top: 20px;
      display: flex;
      justify-content: space-around;
      font-weight: bold;
      color: #3d3d3d;
    }
    &_content {
      padding: 13px;
      .list {
        .list_item {
          display: flex;
          margin-bottom: 25px;
          gap: 72px;
          span {
            &.active {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
