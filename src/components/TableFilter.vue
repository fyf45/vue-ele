<template>
    <div class="table-filter">
        <div :class="[option.type == 'hidden' ? 'hidden-item':'','filter-item']"  v-for="(option,i) in filter_options" :key="i">
            <label v-if="option.before == undefined ? true : option.before">
                {{option.label}}
            </label>
            <template  v-if="option.type=='hidden'">
                <input v-model="values[i]" type="hidden">
            </template>
            <template  v-if="option.type=='input'">
                <el-input
                size="small"
                v-model="values[i]"
                :placeholder="option.label">
                </el-input>
            </template>
            <template  v-else-if="option.type=='date' || option.type=='dateop'">
                <el-date-picker
                size="small"
                v-model="values[i]"
                :type="option.subtype"
                start-placeholder="起始日期"
                end-placeholder="终止日期"
                :default-time="['00:00:00', '23:59:59']"
                :value-format="option.valueFormat ? option.valueFormat : 'yyyy-MM-dd HH:mm:ss'">
                </el-date-picker>
            </template>
            <template  v-else-if="option.type=='select'">
                <el-select
                    v-model="values[i]"
                    :placeholder="'请选择'+option.label"
                    :multiple="option.multiple"
                    clearable
                    @focus="getOptionsFromUrl(i,option.api,option.params)"
                    >
                    <el-option v-if="option.options.length"
                        v-for="item in option.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    <el-option v-if="option.api && selects[i]"
                        v-for="item in selects[i]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </template>

            <label v-if="option.before == undefined ? false : !option.before">
                {{option.label}}
            </label>
        </div>
        <el-button class="search-btn" size="small" type="primary" icon="el-icon-search" @click="setFilters">搜 索</el-button>
        <el-button class="search-btn" size="small" type="danger" icon="el-icon-refresh" @click="resetFilters">重 置</el-button>
        <slot></slot>
    </div>
</template>

<script>
    import helper from '@/mixins/helper'
    import tool from '@/utils/tool'

    export default {
        mixins: [helper],
        // model:{
        //   prop:'value',
        //   event:'change'
        // },
        props: {
            value: Array,
            labelShow:{
                type: Boolean,
                default:true
            },
            options: {
                type: Array
            }
        },
        data() {
            return {
                filter_options:[],
                values:[],
                selects:[],
                sort:{
                    field:'id',
                    order:"desc"
                }
            }
        },
        computed: {
        },
        mounted() {
            this.filter_options = this.options
        },
        watch: {
            'values'(val, oldValue) {//values的类型只有是string，number的时候oldValue才会记录
                // this.$emit('change', val);
                this.$emit('input', val);
            }
        },
        methods: {
            setFilters(){
                var filters = {},values = this.values
                this.options.forEach((option,i)=>{
                    if(typeof(values[i])!='undefined' && values[i]!=null){
                        switch(option.type){
                            case 'input':
                                if(values[i]!=''){
                                    if(option.op==''){
                                        filters[option.field] = values[i]
                                    }else{
                                        filters[option.field] = {}
                                        filters[option.field][option.op] = values[i]
                                    }
                                }
                                break;
                            case 'hidden':
                                if(values[i]!='' || values[i] === 0){
                                    if(option.op==''){
                                        filters[option.field] = values[i]
                                    }else{
                                        filters[option.field] = {}
                                        filters[option.field][option.op] = values[i]
                                    }
                                }
                                break;
                            case 'select':
                                if(option.multiple){
                                    if(values[i].length>0){
                                        filters[option.field] = {$in:values[i]}
                                    }
                                }else{
                                    if(values[i]!=''){
                                        if( /-/.test(values[i])){
                                            let valuesArr = values[i].split('-')
                                            filters[option.field] = {
                                                '$gte':valuesArr[0],
                                                '$lte':valuesArr[1]
                                            }
                                        }else{
                                            filters[option.field] = values[i]
                                        }

                                    }
                                }
                                break;
                            case 'province':
                                if(option.multiple){
                                    if(values[i].length>0){
                                        filters[option.field] = {$in:values[i]}
                                    }
                                }else{
                                    filters[option.field] = values[i]
                                }
                                break;
                            case 'date':
                                if(option.subtype=='daterange'){
                                    filters[option.field] = {
                                        '$gte':values[i][0],
                                        '$lte':values[i][1]
                                    }
                                }else{
                                    filters[option.field] = values[i]
                                }
                                break;
                            case 'dateop':
                                console.log('values' , values, option)
                                if(option.op==''){
                                    filters[option.field] = values[i]
                                }else{
                                    filters[option.field] = {}
                                    filters[option.field][option.op] = values[i]
                                }
                                break;
                        }
                    }
                })
                this.$emit("setFilters",filters)
            },
            setFilterOptions(idx,newopt){
                this.filter_options[idx] = Object.assign(this.filter_options[idx],newopt)
            },
            setValues(newValues){
                for (let field in newValues){
                    let value = null;
                    if(/^[0-9]{1,}$/.test(newValues[field])){
                        value = newValues[field] - 0
                    }else{
                        value = newValues[field]
                    }
                    this.options.forEach((option,i)=>{
                        if(field==option.field){
                            if(option.api && typeof(option.api)!='undefined'){
                                tool.request(option.api, {}).then((res)=>{
                                    this.$set(this.selects,i,res.data)

                                    // this.$set(this.values,i,value)
                                })
                            }
                            this.$set(this.values,i,value)
                        }

                    })
                }
                this.setFilters()
            },
            setSort(obj){
                this.sort.field = obj.prop || 'id'
                this.sort.order = obj.order=="ascending"?"asc":"desc"
                this.$emit("setSort",this.sort)
            },
            getOptionsFromUrl(i, api_name,params){
                if(typeof(api_name)!='undefined'){
                    tool.request(api_name, params).then((res)=>{
                        this.$set(this.selects,i,res.data)
                    })
                }
            },
            resetFilters(){
                // var filters = {},values = this.values,that = this;
                // this.options.forEach((option,i)=>{
                //     if(typeof(values[i])!='undefined' && values[i]!=null){
                //         if(option.type != 'hidden'){
                //             this.$set(this.values,i,undefined)
                //         }
                //     }
                // })
                this.values = []
                this.setFilters()
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables.scss";

    .table-filter {
        padding-bottom: 10px;
        .filter-item{
            display:inline-block;
            margin:0 30px 15px 0;
            label{
                font-size:14px;
            }
            .el-input{
                width:150px;
            }
            .el-date-editor.el-range-editor{
                width:230px;
            }
        }
        .hidden-item{
            display: none;
        }
    }
</style>
