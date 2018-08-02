<template>
  <div class="show-more" ref="container">
    <span class="show-more-txt" ref="txt">{{text}}</span>
    <span class="show-more-ellipsis" 
    ref="ellipsis" 
    :style="{'display':show?'none':'inline-block'}">{{ ellipsis }}</span>
    <button class="show-more-button" 
    v-if="showButton" 
    :style="{ 'margin-left' : (show ? (marginLeft+'px'):collapseMarginLeft+'px')}" 
    ref="more" @click="handleClick">{{ show ? collapseText: expandText }}
    </button>
  </div>
</template>
<script>
import {mapState,mapActions} from "vuex"

  export default {
    name: 'show-more',
    props: {
      text: String,
    },
    data() {
      return {
        tmpTxt: '',
        show: false,
        marginLeft: 0,
        collapseMarginLeft: 0,
        line: 5,
        ellipsis: '...',
        showButton: true,
        expandText: '展开',
        collapseText: '收起'
      }
    },
    mounted() {
      if (!this.line) {
        return
      }
      let everywidth = this.$refs.txt.offsetWidth
      console.log(12,everywidth)
      this.$refs.txt.innerHTML = this.text
      let containerWidth = this.$refs.container.offsetWidth
      let btnWidth = 0
      let btnWidthExpand = 0
      let ellipsisWidth = this.$refs.ellipsis.offsetWidth
      if (this.showButton) {
        btnWidthExpand = btnWidth = Math.ceil(parseFloat(getComputedStyle(this.$refs.more, null)['width'].replace('px', '')))
        this.$refs.ellipsis.style.display = 'none'
        let left = 0
        let btnClone = this.$refs.more.cloneNode()
        if (this.expandText !== this.collapseText) {
          this.$refs.more.style.display = 'none'
          btnClone.innerHTML = this.collapseText
          btnClone.style.display = 'inline-block'
          this.$refs.container.appendChild(btnClone)
          btnWidthExpand = Math.ceil(parseFloat(getComputedStyle(btnClone, null)['width'].replace('px', '')))
          left = btnClone.offsetLeft
        }
        // 数字 5
        if (btnClone.offsetTop <= this.$refs.ellipsis.offsetTop + 5) {
          this.marginLeft = (containerWidth - btnWidthExpand - left + ellipsisWidth)
        } else {
          this.marginLeft = containerWidth - btnWidthExpand - left
        }
        btnClone.remove()
        this.$refs.more.style.display = 'inline-block'
        this.$refs.ellipsis.style.display = 'inline-block'
      }
      let style = getComputedStyle(this.$refs.container, null)
      let lineHeight = parseFloat(style['lineHeight'].replace('px', ''))
      this.$refs.txt.innerHTML = this.text
      if (Math.floor(this.$refs.container.offsetHeight / lineHeight) <= this.line) {
        this.tmpTxt = this.text
        this.show = true
        this.showButton = false
        return
      }
      let initNum = Math.floor((containerWidth * this.line - btnWidth - ellipsisWidth) / everywidth)
      let increase = 1
      this.$refs.txt.innerHTML = this.text.substr(0, initNum)
      if (Math.round(this.$refs.container.offsetHeight / lineHeight) > this.line) {
        increase = -1
      }
      for (let i = initNum; i < this.text.length; (i = i + increase)) {
        if (i < 0 || i > this.text.length) {
          return
        }
         this.$refs.txt.innerHTML =  this.text.substr(0, i)
        if (increase === 1 && Math.round(this.$refs.container.offsetHeight / lineHeight) > this.line) {
           this.tmpTxt = this.text.substr(0, i - 1)
           this.$refs.txt.innerHTML = this.tmpTxt
           if (this.showButton) {
             let left = this.$refs.more.offsetLeft
             this.collapseMarginLeft = containerWidth - btnWidth - left - 1
           }
          break
        } else if (increase === -1 && Math.round(this.$refs.container.offsetHeight / lineHeight) === this.line) {
          this.tmpTxt = this.text.substr(0, i)
          this.$refs.txt.innerHTML = this.tmpTxt
          if (this.showButton) {
            let left = this.$refs.more.offsetLeft
            this.collapseMarginLeft = containerWidth - btnWidth - left - 1
          }
          break
        }
       }
    },
    methods: {
      handleClick() {
        if (this.show) {
          this.collapse()
        } else {
          this.expand()
        }
      },
      expand() {
        if (!this.show) {
          this.show = true
          this.$refs.txt.innerHTML = this.text
        }
      },
      collapse() {
        if (this.show) {
          this.show = false
          this.$refs.txt.innerHTML = this.tmpTxt
        }
      }
    }
  }
</script>

<style lang="scss">
.show-more{
    width:100%;
    position: relative;
    line-height: 1.5em;
    .show-more-button{
      padding-top:0;
      padding-bottom:0;
      border:0;
      font-size: 1em;
      vertical-align: middle;
      color: #91a9fe;
      outline: none;
      line-height: 1;
      background-color: transparent;
      margin-left: 4px !important;
    }
    .show-more-ellipsis{
      display: inline-block
    }
    .show-more-txt {
      font-size: inherit;
    }
}
</style>