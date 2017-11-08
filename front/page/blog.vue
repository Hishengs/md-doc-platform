<template>
	<div id="blogs">
		<action-bar>
			<span slot="left">
				<Button type="text" @click="gotoGuide">如何构建个人博客？</Button>
			</span>
			<span slot="right">
				<Button type="text" @click="showAddBlogModal=true">新建博客</Button>
			</span>
		</action-bar>
		<div class="blogs">
			<!-- 博客列表 -->
			<Menu :active-name="selectedBlogIndex" width="100px" v-if="blogList.length" @on-select="onMenuSelect">
	      <MenuItem v-for="menu, i in blogList" :key="i" :name="Number(i)">
	        {{ menu }}
	      </MenuItem>
	    </Menu>
	    <Alert type="warning" v-else>暂无博客</Alert>
	    <div class="blog-viewer">
	    	<!--  -->
	    </div>
		</div>
		<!-- 新建博客 -->
		<Modal title="新建博客" v-model="showAddBlogModal">
			<Form>
				<FormItem label="博客名称">
					<Input type="text" v-model="newBlog.name" placeholder="博客名称" />
				</FormItem>
				<FormItem label="博客密钥">
					<Input type="password" v-model="newBlog.screctKey" placeholder="博客密钥" />
				</FormItem>
				<p>博客密钥用于确定博客拥有者身份。</p>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="addBlog">创建</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import pageMixin from './common/page.mixin.js';
	import actionBar from '../component/action-bar.vue';
	export default {
		name: 'blogs',
		mixins: [pageMixin],
		components: {
			actionBar,
		},
		data (){
			return {
				selectedBlogIndex: 0,
				blogList: [], // 文档列表
				showCreateGuide: false,
				showAddBlogModal: false,
				newBlog: {
					name: '',
					screctKey: ''
				}
			};
		},
		activated (){
			this.getList();
		},
		methods: {
			// 获取博客列表
			getList (){
				this.api.blog.getList().then(res => {
					console.log('>>> [res] 获取博客列表', res);
					if(res.data.err.level < 3){
						this.blogList = res.data.data || [];
						this.createFrame();
					}
				}).catch(err => {
					console.log('>>> [err] 获取博客列表', err);
				});
			},
			onMenuSelect (index){
				console.log('>>> onMenuSelect', index);
				this.selectedBlogIndex = Number(index) || 0;
				this.createFrame();
			},
			createFrame (){
				console.log('>>> createFrame', this.blogList[this.selectedBlogIndex]);
				if(this.blogList[this.selectedBlogIndex]){
					const iframe = document.createElement('iframe');
					iframe.width = '100%';
					iframe.height = '100%';
					iframe.setAttribute("frameborder", "0");
					iframe.src = this.config.serverUrl + '/static/blogs/' + this.blogList[this.selectedBlogIndex];
					const docViewer = document.getElementsByClassName('blog-viewer')[0];
					docViewer.innerHTML = '';
					docViewer.appendChild(iframe);
				}
			},
			// 新建博客
			addBlog (){
				//
			},
		},
	}
</script>

<style lang= "less">
  #blogs {
    height: 100%;
    position: relative;
    padding-top: 51px;
    .blogs {
    	padding-top: 10px;
    	height: 100%;
    	position: relative;
    	.blog-viewer {
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