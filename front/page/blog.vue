<template>
	<div id="blogs">
		<div class="action-bar">
			<Button type="text">如何构建个人博客？</Button>
			<span class="search">
				<Input placeholder="输入搜索关键词" style="width: 300px"></Input>
				<Button type="primary">搜索</Button>
			</span>
		</div>
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
	</div>
</template>

<script>
	export default {
		name: 'blogs',
		data (){
			return {
				selectedBlogIndex: 0,
				blogList: [], // 文档列表
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
		},
	}
</script>

<style lang= "less">
  #blogs {
    height: 100%;
    position: relative;
    padding-top: 51px;
    .action-bar {
    	position: absolute;
    	top: 0;
    	left: 0;
    	right: 0;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #dfdfdf;
      padding-bottom: 5px;
      .search {
      	float: right;
      	.ivu-btn {
      		margin-left: 5px;
      	}
      }
    }
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