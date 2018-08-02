<template>
    <div class="tmap" :id="mapId" :style="{height:height,width:width}"></div>
</template>

<script>
    import {mapState,mapActions} from "vuex"
    import helper from '@/mixins/helper'
    import Config from '@/Config'
import { setInterval, setTimeout } from 'timers';

    export default {
        components: {
        },
        mixins: [helper],
        props: {
            id: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '350px'
            },
            center: {
                type: Object,
                default: ()=>{
                    return {
                        lat:39.916527,
                        lng:116.397128
                    }
                }
            },
            editMod:{        //标记操作还是区域操作
                type: String,
                default: 'marker'
            },
            marker: {           //主标记经纬度
                type: Object
            },
            draggable: {        //主标记是否可拖拽
                type: Boolean,
                default: true
            },
            area:{
                type: Object
            },
            markers: {
                type: Array
            },
            areas:{
                type: Array
            }
        },
        data() {
            return {
                mapId:null,
                map:null,
                city:'',             //自动定位获取城市
                overlay:{
                    marker:null,    //主标记
                    area:null       //主区域
                }
            }
        },
        computed: {
            ...mapState({
                loaded: state => state.tmap.loaded
            })
        },
        watch: {
            loaded(v) {
                if(!this.map){
                    this.initMap()
                }
            }
        },
        mounted () {
            if(this.id==''){
                this.mapId = 'map_'+Math.random()
            }else{
                this.mapId = this.id
            }
            if(!this.loaded){
                this.loadMap()
            }else{
                this.initMap()
            }
        },
        methods: {
            ...mapActions({
                loadMap:'tmap/loadMap'
            }),
            initMap(){
                var that = this;
                setTimeout(()=>{
                    var el = document.getElementById(this.mapId)
                    that.map = new qq.maps.Map(el, {
                        // 地图的中心地理坐标
                        center: new qq.maps.LatLng(this.center.lat, this.center.lng),
                        zoom: 11
                    })
                    qq.maps.event.addListener(that.map, 'click', this.mapClick);
                    if(this.marker){
                        this.overlay.marker = this.addMarker(this.marker,this.draggable)
                        var center = new qq.maps.LatLng(this.marker.lat, this.marker.lng)
                        that.map.setCenter(center)
                        that.map.setZoom(14)
                    }
                    if(!this.marker && !this.area){
                        var citylocation = new qq.maps.CityService({
                            complete : res => {
                                this.city = res.name
                                that.map.setCenter(res.detail.latLng);
                            }
                        })
                        citylocation.searchLocalCity();
                    }
                    if(this.markers){
                        this.markers.forEach((marker)=>{
                            this.addMarker(marker,false)
                        })
                    }
                    this.$emit("mapInit")
                }, 500)
            },
            mapClick(event){
                var pos = event.latLng
                switch(this.editMod){
                    case 'marker':
                        if(!this.draggable){
                            return;
                        }
                        this.setOverlayMarker(pos)
                        break;
                    case 'area':

                        break;
                }
            },
            addMarker(pos, draggable){
                var position = new qq.maps.LatLng(pos.lat,pos.lng)
                var marker = new qq.maps.Marker({
                    position: position,
                    map: this.map
                })
                if(pos.title){
                    marker.setTitle(pos.title);
                }
                if(draggable){
                    marker.setDraggable(true);
                    qq.maps.event.addListener(marker, 'dragend', ()=>{
                        var pos = marker.getPosition()
                        this.$emit("markerChange",{
                            lat: pos.lat.toFixed(5),
                            lng: pos.lng.toFixed(5)
                        })
                    })
                }else if(!pos.icon){
                    pos.icon = "/static/img/map_marker.png"
                }
                if(pos.icon){
                    var anchor = new qq.maps.Point(10, 32),
                        size = new qq.maps.Size(20, 32),
                        origin = new qq.maps.Point(0, 0),
                        markerIcon = new qq.maps.MarkerImage(
                            pos.icon,
                            size,
                            origin,
                            anchor
                        )
                    marker.setIcon(markerIcon)
                }
                return marker
            },
            setOverlayMarker(pos){
                if(!this.overlay.marker){
                    this.overlay.marker = this.addMarker(pos,this.draggable)
                }else{
                    this.overlay.marker.setPosition(pos)
                }
                this.$emit("markerChange",{
                    lat: pos.lat.toFixed(5),
                    lng: pos.lng.toFixed(5)
                })
            },
            getLocation1(address){
                var that = this;
                
                setTimeout(()=>{
                    if(!this.map){
                        this.getLocation1(address)
                    }else{
                        var geocoder = new qq.maps.Geocoder({
                            complete : res =>{
                                var pos = res.detail.location
                                this.setOverlayMarker(pos)
                                this.map.setCenter(pos);
                            }
                        });
                        geocoder.getLocation(address);
                    }
                }, 600)
                
            }

        }
    }
</script>

<style lang="scss">
    #Tmap{
        .form-container {
            padding: 20px 35px;
        }
        #mapContainer{
            width:800px;
            height:400px;
        }
        .el-input.long {
            width: 300px;
        }
        .el-input.short {
            width: 100px;
        }
    }
</style>
