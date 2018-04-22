<template>
	<div id="app" :style="style">
		<top-menu v-if="logined"></top-menu>
		<left-menu v-if="logined"></left-menu>
		<div id="page">
			<keep-alive>
	      <router-view></router-view>
	    </keep-alive>
		</div>
		<!-- <div id="particles-js"></div> -->
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
		computed: {
			logined (){
				return Boolean(localStorage.getItem('verified'));
			},
			style (){
				// const showBg = (new Date().getTime()) % 2 === 0;
				// return showBg ? {
				// 	backgroundImage: 'url("http://localhost:8787/static/assets/vteam.png")',
				// } : {};
				return {};
			},
		},
	}
</script>

<style lang= "less">
  @import url(../style/index.less);
	html, body {
		height: 100%;
	}
  #app {
		/* background-image: url("http://localhost:8787/static/assets/vteam.png"); */
  	height: 100%;
    position: relative;
    padding: 70px 10px 10px 160px;
    margin-bottom: -70px;
		background-color: #f9f9f9;
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
			background-color: transparent;
    }
		#particles-js {
			/* z-index: -1; */
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #1d1d1d;
			background-image: url("");
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 50% 50%;
		}
  }
</style>