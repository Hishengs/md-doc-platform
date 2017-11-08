<template>
	<div class="action-bar">
		<span class="left"><slot name="left"></slot></span>
		<span class="right"><slot name="right"></slot></span>
	</div>
</template>

<script>
	export default {
		name: 'action-bar'
	};
</script>

<style lang= "less">
	.action-bar {
  	position: absolute;
  	top: 0;
  	left: 0;
  	right: 0;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #dfdfdf;
    padding-bottom: 5px;
    .right {
    	float: right;
    }
  }
</style>