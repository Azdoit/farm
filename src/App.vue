<template>
  <!-- <svg-icon name="phone"></svg-icon> -->
  <img :src="phone" alt="">
  <svg-icon name="statusBar" class="statusBar"></svg-icon>
  <div class="wrapper" id="wrapperRoot">
    <div class="show">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div class="tabs">
        <router-link class="tab" v-for="(tab, index) in tabs" :key="tab.name" :to="tab.path"
          @click.native="changeTab(index)">
          <svg-icon :name="index === curTab ? tab.svgIcon1 : tab.svgIcon"></svg-icon>
          <span :class="{ active: index === curTab }">{{ tab.name }}</span>
        </router-link>
      </div>
      <div class="shortcut"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import phone from '@/images/phone.png'
const router = useRouter()
router.push('/')
const curTab = ref(0);
const tabs = reactive([
  {
    name: "农田",
    path: "/farm",
    svgIcon: "farm",
    svgIcon1: "farm1",
  },
  {
    name: "灾损",
    path: "/damage",
    svgIcon: "disaster",
    svgIcon1: "disaster1",
  },
  {
    name: "理赔",
    path: "/claim",
    svgIcon: "claim",
    svgIcon1: "claim1",
  },
  {
    name: "我的",
    path: "/mine",
    svgIcon: "mine",
    svgIcon1: "mine1",
  },
]);
const changeTab = (index) => {
  curTab.value = index;
};
</script>

<style lang="scss" scoped>
// .svg-icon {
//   position: absolute;
//   top:10px;
//   left: 20px;
// }
img {
  width: 433px;
  height: 934px;
  position: fixed;
  top:11px;
  margin: auto;
}
.statusBar {
  position: fixed;
  margin: auto;
  top: -114px;
  font-size: 366px;
}
.wrapper {
  box-sizing: border-box;
  position: relative;
  width: 376px;
  height: 778px;

  .show {
    width: 100%;
    height: 729px;
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .tabs {
      height: calc(100% - 729px);
      padding-top: 12px;
      display: flex;
      justify-content: space-around;
      
      gap:50px;

      .tab {
        display: flex;
        flex-direction: column;
        align-items: center;

        .svg-icon {
          width: 26px;
          height: 26px;
          margin-bottom: 4px;
        }

        span {
          font-size: 14px;
          color: #343434;

          &.active {
            color: #00A796;
          }
        }

        &.router-link-active {
          .icon-resoure {
            color: #449d37;
          }
        }
      }
    }

    .shortcut {
      align-self: center;
      width: 97px;
      height: 4px;
      border-radius: 10px;
      background-color: #363636;
    }
  }
}
</style>
