<template>
    <div class="vrImg">
        <div class="addBox">
            <div class="type">
                <el-input v-model="addData.tag" placeholder="请输入房屋类型，如：客厅"></el-input>
            </div>
            <div class="upImg">
                <el-upload
                ref="Upload"
                action="https://zhaofang.dev.zwk666.com/api/v1/plat/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                name="img"
                :data="uploadParams">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="houseImgVisible" append-to-body>
                    <img width="100%" :src="houseImgUrl" alt="">
                </el-dialog>
            </div>
            <div class="upVr">
                <el-upload
                ref="UploadVR"
                action="https://zhaofang.dev.zwk666.com/api/v1/plat/upload"
                list-type="picture-card"
                :on-remove="VRRemove"
                :on-success="VRSuccess"
                :limit="1"
                name="img"
                :data="uploadVRParams">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
import helper from '@/mixins/helper'
import tool from '@/utils/tool'
    export default {
        mixins: [helper],
        props: {

        },
        data() {
            return {
                houseImgVisible:false,
                houseImgUrl:'',
                uploadParams:{
                    type:3,
                    token:tool.getStorage('token')
                },
                uploadVRParams:{
                    type:6,
                    token:tool.getStorage('token')
                },

                addData:{
                    tag:'',
                    vrLink:'',
                    imgs:[] 
                },

                dataList:[
                    {
                        tag:'',
                        vrLink:'',
                        imgs:[]
                    }
                ] 
            }
        },
        components: {
            
        },
        mounted() {
            
        },
        methods: {
            // 房屋图片
            handlePictureCardPreview(){

            },
            handlePictureCardPreview(file) {
                this.houseImgUrl = file.url;
                this.houseImgVisible = true;
            },
            handleSuccess(response){
                this.addData.imgs.push(response.data.url)
            },
            // 房屋VR
            VRRemove(){},
            VRSuccess(){}
        }
    }
</script>

<style scoped>

</style>