<template>
    <div class="mask">
        <div class="content">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="p1"><span class="bold">理赔起点为30%</span>
                ，即承保的农作物因自
                然灾害造成损失率达到<span class="bold">30% (合30%) 以
                    上到70%</span>时，按农作物生长期划分保险
                金额和损失率计算赔款。
            </div>
            <p class="p2 bold">赔偿金额=各生长期保险金额*损失率</p>
            <p class="p3">损失率达到 <span class="bold">70%</span>以上时，按该农作物生
                长期保险金额全额赔付。</p>
            <div class="underline"></div>
            <p class="p4">该<span class="bold">YM-08</span>地块种植作物为<span class="bold">玉米</span>，当前生
                长期为<span class="bold">成熟期</span>，2023年8月16日受台风
                影响，<span class="bold">受损率为78%</span>。<span class="bold">种植总面积为2
                    345.6亩，倒伏面积为1829.57亩。
                    （待核实）</span></p>
        </div>
        <div class="cancle" @click="cancelMask">
            <span>×</span>
        </div>
    </div>
</template>

<script setup>
import {defineEmits} from 'vue'
const emits = defineEmits('update')
const cancelMask = () => {
    emits('update',false)
}
</script>

<style lang="scss" scoped>
.mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.28);

    .content {
        position: absolute;
        letter-spacing: 1px;
        top: 162px;
        left: 37px;
        width: 260px;
        height: 350px;
        line-height: 25px;
        padding: 25px 10px 25px 30px;
        border-radius: 10px;
        background-color: #fff;
        font-weight: 510;
        font-size: 14px;

        .p1 {}

        .p2 {
            margin-top: 18px;
            color: #00BFBF;
        }

        .p3 {
            margin-top: 18px;
        }

        .underline {
            margin-top: 10px;
            border-bottom: 1px solid rgba(245, 245, 245, 1);
        }

        .p4 {
            color: #818181;
            margin-top: 15px;
        }
    }
    .cancle {
        position: absolute;
        left: 162px;
        bottom: 17px;
        width: 51px;
        height: 51px;
        line-height: 51px;
        text-align: center;
        border-radius: 100%;
        background-color: rgba(222, 222, 222, 0.44);
        cursor: pointer;
        span {
            font-size: 50px;
            color: #fff;
        }
    }
    .bold {
        font-weight: bold;
        color: #000;
    }
    .circle1 {
        position: absolute;
        width: 8px;
        height: 8px;
        top: 34px;
        left: 10px;
        background-color: #00BFBF;
        border-radius: 100%;
    }
    .circle2 {
        position: absolute;
        width: 8px;
        height: 8px;
        top: 195px;
        left: 10px;
        background-color: #00BFBF;
        border-radius: 100%;

    }
}</style>