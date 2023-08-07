<template>
  <img :src="phone" alt="" class="phone" />
  <div class="root" id="root">
    <img :src="statusBar" alt="" class="statusBar" />
    <div class="content" id="content">
      <div class="show">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <div class="tabs">
        <router-link
          class="tab"
          v-for="(tab, index) in tabs"
          :key="tab.name"
          :to="tab.path"
          @click.native="changeTab(index)"
        >
          <svg-icon
            :name="index === curTab ? tab.svgIcon1 : tab.svgIcon"
          ></svg-icon>
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
import phone from "@/images/phone.png";
import statusBar from "@/images/StatusBar.png";
const router = useRouter();
router.push("/");
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
.phone {
  width: 434px;
  height: 835px;
  position: fixed;
  top: 54px;
  margin: auto;
}
.root {
  box-sizing: border-box;
  width: 376px;
  height: 750px;
  position: relative;
  .statusBar {
    display: block;
    height: 20px;
    width: 100%;
    margin-bottom: 10px;
  }
  .content {
    position: relative;
    width: 100%;
    height: 640px;
    .show {
      width: 100%;
      height: 100%;
    }
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

      gap: 50px;

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
            color: #00a796;
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
