<!-- 文档创建指南 -->
<template>
	<Modal id="create-doc-guide" title="文档创建指南" v-model="show" width="800px">
		<div v-html="markdownContent"></div>
		<div slot="footer">
			<Button type="primary" @click="show=false;">懂了</Button>
		</div>
	</Modal>
</template>

<script>
	export default {
		name: 'create-doc-guide',
		data (){
			return {
				show: false,
				markdownContent: '',
			};
		},
		mounted (){
			this.getGuide();
		},
		methods: {
			getGuide (){
				this.api.config.http.get(/* this.config.serverUrl +  */'/static/guide.md').then(res => {
					// console.log('>>> [res] 获取指南', res);
					this.markdownContent = marked(res.data || '');
				}).catch(err => {
					console.log('>>> [err] 获取指南', err);
				});
			},
		},
	};
</script>

<style lang="less">
	#create-doc-guide {
		.ivu-modal-content {
			font-size: 14px;
			h2 {
				margin: 15px 0;
			}
			h3 {
				margin: 10px 0;
			}
			p {
				font-size: 14px;
				margin: 5px 0;
				line-height: 2.0;
			}
			li {
				margin-left: 15px;
				list-style-type: decimal;
				font-size: 14px;
				line-height: 2.0;
			}
			code {
				background-color: #555555;
				color: #ffffff;
				padding: 2px 4px;
			}
		}
	}
</style>
