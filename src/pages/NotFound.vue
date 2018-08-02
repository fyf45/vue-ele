<template>
    <div id="notfound">
        <div class="img-box">
            <img src="~static/img/404.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss">
#notfound{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    .img-box{
        width: 300px;
        height: 330px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top:-165px;
        margin-left:-150px;
        img{
            max-width: 100%;
        }
    }
}
</style>