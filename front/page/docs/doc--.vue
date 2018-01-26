<!-- 文档查看页面 -->
<template>
	<div class="doc">
		<div id="editormd" v-show="showEditor">
	    <textarea style="display:none;">{{ mdContent }}</textarea>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'doc',
		data (){
			return {
				mdContent: '',
				editor: null,
				showEditor: false, // 是否显示编辑器
			};
		},
		mounted (){
			window.editor = this.editor = editormd("editormd", {
        path : "http://localhost:9111/static/assets/libs/editor.md/lib/",
        height: 800,
        watch: true,
        preview: false,
      });
		},
		activated (){
			this.getMarkdown();
		},
		methods: {
			getMarkdown (){
				this.showEditor = false;
				this.api.doc.getMarkdown(this.$route.params.docName + '/index.md').then(res => {
					console.log('>>> [res] getMarkdown', res, this.editor);
					if(res.data.err.level < 3){
						this.mdContent = res.data.data || '';
						setTimeout(() => {
							this.showEditor = true;
							setTimeout(() => {
								$('i[name="preview"]').click();
							}, 100);
						}, 50);
					}else this.$Message.error(res.data.err.msg);
				}).catch(err => {
					console.log('>>> [err] getMarkdown', err);
				});
			},
		},
	};
</script>

<style lang= "less" scoped>
	.doc {
		.editormd-preview-close-btn {
			display: none;
		}
	}
</style>