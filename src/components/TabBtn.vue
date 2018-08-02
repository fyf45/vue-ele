<template>
    <div class="tabBox">
        <span v-for="(item,index) in tabs" :key="index"
        :class="[activeIndex == index ? 'activeStyle':'','defaultStyle']"
        @click="tabHandle(item,index)">{{item.tabText}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            tabs: {
                type: Array
            }
        },
        data() {
            return {
                activeIndex:0,
            }
        },
        methods: {
            tabHandle(item,index){
                this.activeIndex = index;
                this.$emit('tabHandle',item, index)
            },
            changeIndex(index){
                this.activeIndex = index
            }
        }
    }
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.tabBox{
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #f7f7f7;
    .defaultStyle{
        display: inline-block;
        padding:13px 24px;
        font-size: 14px;
        text-align: center;
        color:#444;
        border-radius: 8px 8px 0 0;
        cursor: pointer;
        &:hover{
            color:#ffc633;
        }
        &.activeStyle{
            color:#fff;
            background-color: #ffc633;
        }
    }
}
</style>
