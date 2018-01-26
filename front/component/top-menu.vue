<template>
	<div id="top-menu">
		<Menu mode="horizontal" @on-select="onMenuSelect">
      <MenuItem name="site-name" class="site-name">
        <Icon type="social-github" size="20"></Icon>
        BITPOWER 互联网技术开放与共享平台
      </MenuItem>
      <MenuItem name="about" class="about right">
        <Icon type="help-circled"></Icon>
        关于
      </MenuItem>
      <MenuItem name="create-doc" class="create-doc right">
        <Icon type="plus-round"></Icon>
        创建文档
      </MenuItem>
      <MenuItem name="back" class="back right" v-show="showBackBtn">
        <Icon type="arrow-left-c"></Icon>返回
      </MenuItem>
    </Menu>
    <!-- 关于 -->
    <Modal class="about-modal" title="关于网站" v-model="showAboutModal">
      <h2>初衷</h2>
      <p>建设这个网站的初衷主要是两个：</p>
      <li>1. 提供一个统一的、体验较好的文档聚合中心。</li>
      <li>2. 提供一个技术沉淀、产出平台。</li>
      <h2>使用指南</h2>
      <li>一切以 markdown 为中心，可以使用 markdown 的地方就是用 markdown，不过多的编写大量的后台逻辑；</li>
      <li>不管是项目（框架）文档，或者是博客，都通过 markdown 文件夹的方式组织，并本地存储。</li>
      <div slot="footer"></div>
    </Modal>
    <!-- 创建文档弹窗 -->
    <create-doc-modal ref="createDocModal"></create-doc-modal>
	</div>
</template>

<script>
  import createDocModal from './create-doc-modal.vue';
  export default {
    name: 'top-menu',
    components: {
      createDocModal,
    },
    data (){
      return {
        menu: 'site-name',
        showAboutModal: false,
      };
    },
    computed: {
      showBackBtn (){
        return ['doc', ].includes(this.$route.name);
      },
    },
    methods: {
      onMenuSelect (name){
        if(name === 'site-name'){
          window.location.href = './';
        }else if(name === 'about'){
          this.showAboutModal = true;
        }else if(name === 'create-doc'){
          this.$refs.createDocModal.show = true;
        }else if(name === 'back'){
          this.$router.go (-1);
        }
      },
    }
  }
</script>

<style lang= "less">
  .about-modal {
    h2:first-child {
      margin-top: 0;
    }
    h2 {
      margin: 15px 0;
    }
    p, li {
      font-size: 14px;
      line-height: 2.0;
    }
  }
  #top-menu {
    .site-name {
      font-size: 16px;
      font-weight: 600;
    }
    .right {
      float: right;
    }
    .ivu-menu-item-active.ivu-menu-item-selected {
      color: inherit;
      border-bottom-width: 0;
    }
  }
</style>