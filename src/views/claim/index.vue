<template>
  <div class="wrapper">
    <Teleport to="#content">
      <Mask v-show="show" @update="updateShowMask" />
    </Teleport>
    <div class="claim">
      <div class="total">
        <svg-icon name="money"></svg-icon>
        <div class="text">
          <span class="text1">累计理赔金额</span>
          <span class="text2">3703686.9</span>
        </div>
      </div>
      <div class="count">
        <svg-icon name="count"></svg-icon>
        <div class="text">
          <span>累计理赔次数</span>
          <span class="text2">5</span>
        </div>
      </div>
    </div>
    <div class="tools">
      <div v-for="(item, index) in tools" :key="item.name" class="tool">
        <svg-icon :name="item.svgIcon" />
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
    <div class="cal-fast">
      <span class="text">理赔计算器</span>
      <!-- <div class="fast" @click="fastInput">一键填入</div> -->
    </div>
    <div class="cal-list">
      <div class="cal-list_title">
        <span v-for="(item, index) in damageText" :key="index">{{ item.name }}</span>
      </div>
      <div class="cal-list_content">
        <ul class="list">
          <li v-for="(item, index) in calList" :key="index" class="list_item">
            <span class="damageText">{{ item.name }}</span>
            <select name="" id="" v-model="item.selected">
              <option :value="option" v-for="(option, index) in item.options" :key="index"> {{ option }}</option>
            </select>
            <input type="text" placeholder="请输入" v-model="item.area">
            <div class="claim-money">
              <span>{{ item.money }}</span>
              <svg-icon name="explain" @click="showMask" />
            </div>
          </li>
        </ul>
        <div class="add">
          <span>+</span>
        </div>
        <div class="total">
          <span class="text">理赔金额合计:</span>
          <span class="number">{{ 740737.38 + '元' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Mask from '@/components/mask/index.vue'
import { reactive, ref, watchEffect } from 'vue'
const show = ref(false)
const total = ref(0)
const money1 = ref(0)
const money2 = ref(0)
const money3 = ref(0)
const money4 = ref(0)
const money5 = ref(0)
const selected1 = ref('倒伏')
const selected2 = ref('洪涝')
const selected3 = ref('雹灾')
const selected4 = ref('洪涝')
const selected5 = ref('倒伏')


const tools = reactive([
  {
    svgIcon: 'startClaim',
    name: '发起理赔'
  },
  {
    svgIcon: 'claimProgress',
    name: '理赔进度'
  },
  {
    svgIcon: 'serve',
    name: '服务'
  },
  {
    svgIcon: 'history',
    name: '历史记录'
  },
])
const damageText = reactive([
  {
    name: '受损作物'
  },
  {
    name: '受损类型'
  },
  {
    name: '受损面积'
  },
  {
    name: '理赔金额'
  },
])
const calList = reactive([
  {
    name: '玉米',
    options: ['倒伏', '洪涝', '雹灾'],
    selected: selected1,
    area: '1234',
    money: 123456.32
  },
  {
    name: '莲藕',
    options: ['倒伏', '洪涝', '雹灾'],
    selected: selected2,
    area: '1234',
    money: 123456.32
  },
  {
    name: '玉米',
    options: ['倒伏', '洪涝', '雹灾'],
    selected: selected3,
    area: '1234',
    money: 123456.32
  },
  {
    name: '水稻',
    options: ['倒伏', '洪涝', '雹灾'],
    selected: selected4,
    area: '1234',
    money: 123456.32
  },
  {
    name: '莲藕',
    options: ['倒伏', '洪涝', '雹灾'],
    selected: selected5,
    area: '1234',
    money: 123456.32
  },
])

watchEffect(() => {
  money1.value = calList[0].area * 150
  money2.value = calList[1].area * 150
  money3.value = calList[2].area * 150
  money4.value = calList[3].area * 150
  money5.value = calList[4].area * 150
  total.value = money1.value + money2.value + money3.value + money4.value + money5.value
})
const showMask = () => {
  show.value = true
}
const updateShowMask = (val) => {
  show.value = false
}
const fastInput = () => {
  calList[0].area = 1234
  calList[1].area = 1234
  calList[2].area = 1234
  calList[3].area = 1234
  calList[4].area = 1234
  selected1.value = '倒伏'
  selected2.value = '洪涝'
  selected3.value = '雹灾'
  selected4.value = '倒伏'
  selected5.value = '洪涝'
}
</script>


<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 12px 15px 12px;
  background-color: #EEF8FF;

  .claim {
    display: flex;
    gap: 11px;

    .total {
      width: 170px;
      height: 85px;
      display: flex;
      align-items: center;
      background-color: #619bff;
      border-radius: 10px;

      .svg-icon {
        margin-left: 11px;
        font-size: 36px;
      }

      .text {
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 9px;
        font-size: 14px;
        color: #fff;

        .text2 {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }

    .count {
      width: 170px;
      height: 85px;
      display: flex;
      align-items: center;
      background-color: #0BC476;
      border-radius: 10px;

      .svg-icon {
        margin-left: 11px;
        font-size: 36px;
      }

      .text {
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 9px;
        font-size: 14px;
        color: #fff;

        .text2 {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  .tools {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95px;
    width: 351px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 6px 1px rgba(0, 0, 0, 0.12);
    gap: 42px;
    margin-top: 19px;
    font-size: 12px;

    .tool {
      cursor: pointer;

      .svg-icon {
        font-size: 46px;
      }

      .text {
        text-align: center;
      }
    }
  }

  .cal-fast {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .text {
      margin-left: 8px;
      font-size: 16px;
      font-weight: bold;
      line-height: 30px;
      color: #141414;
    }

    .fast {
      width: 79px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #5693F8;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
  }

  .cal-list {
    margin-top: 10px;
    font-size: 14px;

    &_title {
      background-color: #F8F8F8;
      border-radius: 15px 15px 0 0;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      color: #212121;
    }

    &_content {
      background-color: #fff;
      padding: 15px;
      border-radius: 0 0 15px 15px;

      .list {
        &_item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          position: relative;

          &:last-child {
            margin-bottom: 0;
          }

          .damageText {
            margin-left: 10px;
            white-space: nowrap;
          }

          select {
            width: 70px;
            height: 25px;
            border-radius: 4px;
            margin-left: 38px;
          }

          input {
            width: 65px;
            height: 25px;
            box-sizing: border-box;
            padding: 6px;
            margin-left: 25px;
            border-radius: 4px;
            border: 1px solid #E1E1E1;
          }

          .claim-money {
            display: flex;
            align-items: center;

            span {
              position: absolute;
              right: 12px;
            }


            .svg-icon {
              font-size: 10px;
              cursor: pointer;
              position: absolute;
              right: 0px;
            }
          }
        }
      }

      .add {
        margin: auto;
        margin-top: 20px;
        width: 79px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background-color: #5693F8;
        border-radius: 4px;
        cursor: pointer;

        span {
          color: #fff;
          font-size: 20px;
        }
      }

      .total {
        margin-top: 20px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
          font-size: 14px;
          color: #A4A4A4;
        }

        .number {
          font-size: 18px;
          font-weight: bold;
          color: #313131;
        }
      }
    }
  }
}
</style>
