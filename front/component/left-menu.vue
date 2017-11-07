<template>
	<div id="left-menu">
		<Menu :active-name="menu" width="150px" @on-select="name => { $router.push('/' + name); }">
      <MenuItem name="doc" class="doc">
        <Icon type="ios-folder"></Icon>
        文档中心
      </MenuItem>
      <MenuItem name="framework-and-library" class="framework-and-library">
        <Icon type="coffee" size="18"></Icon>
        框架与库
      </MenuItem>
    </Menu>
	</div>
</template>

<script>
  export default {
    name: 'left-menu',
    data (){
      return {
        menu: 'doc'
      };
    }
  }
</script>

<style lang= "less">
  #left-menu {
    height: 100%;
    .ivu-menu {
      height: 100%;
    }
  }
</style>