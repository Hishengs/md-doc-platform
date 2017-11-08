<template>
	<div id="frameworks">
		<action-bar>
			<span slot="left">
				<Button type="text" @click="gotoGuide">如何构建项目框架？</Button>
			</span>
			<span slot="right">
				<Button type="text">创建框架</Button>
			</span>
		</action-bar>
		<div class="frameworks">
			<!-- 框架列表 -->
			<Menu :active-name="selectedFrameworkIndex" width="100px" v-if="frameworkList.length" @on-select="onMenuSelect">
	      <MenuItem v-for="menu, i in frameworkList" :key="i" :name="Number(i)">
	        {{ menu }}
	      </MenuItem>
	    </Menu>
	    <Alert type="warning" v-else>暂无框架</Alert>
	    <div class="framework-viewer">
	    	<!--  -->
	    </div>
		</div>
	</div>
</template>

<script>
	import pageMixin from './common/page.mixin.js';
	import actionBar from '../component/action-bar.vue';
	export default {
		name: 'frameworks',
		mixins: [pageMixin],
		components: {
			actionBar,
		},
		data (){
			return {
				selectedFrameworkIndex: 0,
				frameworkList: [], // 框架列表
			};
		},
		activated (){
			this.getList();
		},
		methods: {
			// 获取框架列表
			getList (){
				this.api.framework.getList().then(res => {
					console.log('>>> [res] 获取框架列表', res);
					if(res.data.err.level < 3){
						this.frameworkList = res.data.data || [];
						this.createFrame();
					}
				}).catch(err => {
					console.log('>>> [err] 获取框架列表', err);
				});
			},
			onMenuSelect (index){
				// console.log('>>> onMenuSelect', index);
				this.selectedFrameworkIndex = Number(index) || 0;
				this.createFrame();
			},
			createFrame (){
				// console.log('>>> createFrame', this.frameworkList[this.selectedFrameworkIndex]);
				if(this.frameworkList[this.selectedFrameworkIndex]){
					const iframe = document.createElement('iframe');
					iframe.width = '100%';
					iframe.height = '100%';
					iframe.setAttribute("frameborder", "0");
					iframe.src = this.config.serverUrl + '/static/frameworks/' + this.frameworkList[this.selectedFrameworkIndex];
					const frameworkViewer = document.getElementsByClassName('framework-viewer')[0];
					frameworkViewer.innerHTML = '';
					frameworkViewer.appendChild(iframe);
				}
			},
		},
	}
</script>

<style lang= "less">
  #frameworks {
    height: 100%;
    position: relative;
    padding-top: 51px;
    .frameworks {
    	padding-top: 10px;
    	height: 100%;
    	position: relative;
    	.framework-viewer {
    		position: absolute;
    		top: 0;
    		left: 100px;
    		bottom: 0;
    		right: 0;
    		/*height: 100%;*/
    	}
    	.ivu-menu {
    		height: 100%;
    	}
    }
  }
</style>