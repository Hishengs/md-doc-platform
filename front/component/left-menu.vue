<template>
	<div id="left-menu">
		<Menu :active-name="menu" width="150px" @on-select="onMenuSelect">
      <MenuItem name="docs" class="docs-index">
        <Icon type="ios-folder"></Icon>
        文档中心
      </MenuItem>
      <!-- <MenuItem name="framework-and-library" class="framework-and-library">
        <Icon type="coffee" size="18"></Icon>
        框架与库
      </MenuItem> -->
      <MenuItem name="blogs" class="blogs">
        <Icon type="social-wordpress" size="18"></Icon>
        博客
      </MenuItem>
    </Menu>
	</div>
</template>

<script>
  export default {
    name: 'left-menu',
    data (){
      return {
        menu: 'docs',
      };
    },
    methods: {
      onMenuSelect (category){
        this.menu = category;
        this.$router.push(`/docs/index?category=${category}`);
      },
    },
  }
</script>

<style lang= "less">
  #left-menu {
    height: 100%;
    .ivu-menu {
      box-shadow: 0 1px 10px 2px rgba(0,0,0,.1);
      height: 100%;
      /* opacity: .93; */
      /* background-color: #232323;
      color: #ffffff;
      .ivu-menu-item {
        color: #ffffff;
      } */
    }
  }
</style>