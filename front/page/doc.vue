<template>
	<div id="docs">
		<action-bar>
			<span slot="left">
				<Button type="text" @click="gotoGuide">如何构建项目文档？</Button>
			</span>
			<span slot="right">
				<Button type="text">创建文档</Button>
			</span>
		</action-bar>
		<div class="docs">
			<!-- 文档列表 -->
			<Menu :active-name="selectedDocIndex" width="100px" v-if="docList.length" @on-select="onMenuSelect">
	      <MenuItem v-for="menu, i in docList" :key="i" :name="Number(i)">
	        {{ menu }}
	      </MenuItem>
	    </Menu>
	    <Alert type="warning" v-else>暂无文档</Alert>
	    <div class="doc-viewer">
	    	<!--  -->
	    </div>
		</div>
	</div>
</template>

<script>
	import pageMixin from './common/page.mixin.js';
	import actionBar from '../component/action-bar.vue';
	export default {
		name: 'docs',
		mixins: [pageMixin],
		components: {
			actionBar,
		},
		data (){
			return {
				selectedDocIndex: 0,
				docList: [], // 文档列表
			};
		},
		activated (){
			this.getList();
		},
		methods: {
			// 获取文档列表
			getList (){
				this.api.doc.getList().then(res => {
					console.log('>>> [res] 获取文档列表', res);
					if(res.data.err.level < 3){
						this.docList = res.data.data || [];
						this.createFrame();
					}
				}).catch(err => {
					console.log('>>> [err] 获取文档列表', err);
				});
			},
			onMenuSelect (index){
				// console.log('>>> onMenuSelect', index);
				this.selectedDocIndex = Number(index) || 0;
				this.createFrame();
			},
			createFrame (){
				// console.log('>>> createFrame', this.docList[this.selectedDocIndex]);
				if(this.docList[this.selectedDocIndex]){
					const iframe = document.createElement('iframe');
					iframe.width = '100%';
					iframe.height = '100%';
					iframe.setAttribute("frameborder", "0");
					iframe.src = this.config.serverUrl + '/static/docs/' + this.docList[this.selectedDocIndex];
					const docViewer = document.getElementsByClassName('doc-viewer')[0];
					docViewer.innerHTML = '';
					docViewer.appendChild(iframe);
				}
			},
		},
	}
</script>

<style lang= "less">
  #docs {
    height: 100%;
    position: relative;
    padding-top: 51px;
    .docs {
    	padding-top: 10px;
    	height: 100%;
    	position: relative;
    	.doc-viewer {
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