<template>
    <div id="DashBoard">

    </div>
</template>

<script>
    import {mapState,mapActions} from "vuex"
    import helper from '@/mixins/helper'
    import tool from '@/utils/tool'


    export default {
        mixins: [helper],

        data(){
            return {
                isDone:false,
                dialogFormVisible:false,
                todoForm:{
                    todo:''
                }
            }
        },
        computed: {
            ...mapState({

            }),
        },
        mounted () {

        },
        methods: {
            ...mapActions({
                getData:"dashBoard/getData",
            })
        },

    }
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

#DashBoard{

}
</style>
