<!-- 文档创建指南 -->
<template>
	<Modal id="create-doc-guide" title="文档创建指南" v-model="show" width="800px">
		<div v-html="markdownContent"></div>
	</Modal>
</template>

<script>
	export default {
		name: 'create-doc-guide',
		props: {
			value: {
        type: Boolean,
        default: false,
      },
			type: {
				type: String,
				default: 'doc',
			},
		},
		data (){
			return {
				show: this.value,
				markdownContent: '',
			};
		},
		watch: {
			value (val){
				this.show = val;
			},
			show (val){
				if(val)
					this.getGuide();
				this.$emit('input', val);
			},
		},
		methods: {
			getGuide (){
				this.api.config.http.get(this.config.serverUrl + '/static/blogs/Hisheng/如何创建项目文档.md').then(res => {
					console.log('>>> [res] 获取指南', res);
					this.markdownContent = marked(res.data || '');
				}).catch(err => {
					console.log('>>> [err] 获取指南', err);
				});
			},
		},
	};
</script>