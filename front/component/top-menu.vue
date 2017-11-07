<template>
	<div id="top-menu">
		<Menu mode="horizontal" :active-name="menu">
      <MenuItem name="site-name" class="site-name">
        <Icon type="social-github" size="20"></Icon>
        BITPOWER 互联网技术开放与共享平台
      </MenuItem>
    </Menu>
	</div>
</template>

<script>
  export default {
    name: 'top-menu',
    data (){
      return {
        menu: 'site-name'
      };
    }
  }
</script>

<style lang= "less">
  #top-menu {
    .site-name {
      font-size: 16px;
      font-weight: 600;
    }
  }
</style>