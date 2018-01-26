<template>
	<div id="app">
		<top-menu></top-menu>
		<left-menu></left-menu>
		<div id="page">
			<keep-alive>
	      <router-view></router-view>
	    </keep-alive>
		</div>
	</div>
</template>

<script>
	import topMenu from '../component/top-menu.vue';
	import leftMenu from '../component/left-menu.vue';
	export default {
		name: 'app',
		components: {
			topMenu,
			leftMenu,
		},
	}
</script>

<style lang= "less">
  @import url(../style/index.less);
	html, body {
		height: 100%;
	}
  #app {
  	height: 100%;
    position: relative;
    padding: 70px 10px 10px 160px;
    margin-bottom: -70px;
    #top-menu {
    	position: absolute;
    	left: 0;
    	top: 0;
    	right: 0;
    }
    #left-menu {
    	position: absolute;
    	left: 0;
    	top: 0;
    	padding-top: 60px;
    	bottom: 0;
    }
    #page {
    	height: 100%;
    }
  }
</style>