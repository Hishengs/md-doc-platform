<template>
	<div id="top-menu">
		<Menu mode="horizontal" @on-select="onMenuSelect">
      <MenuItem name="site-name" class="site-name">
        <Icon type="social-github" size="20"></Icon>
        {{ config.siteName }}
      </MenuItem>
      <MenuItem name="logout" class="logout right">
        注销
      </MenuItem>
      <MenuItem name="about" class="about right">
        <Icon type="help-circled"></Icon>
        关于
      </MenuItem>
      <MenuItem name="create-doc-guide" class="create-doc-guide right">
        创建指南
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
      <h2>在这里，你可以</h2>
      <li>1. 创建项目相关设计、接口文档。</li>
      <li>2. 创建技术文档。</li>
      <li>2. 创建个人博客文档。</li>
      <h2>使用指南</h2>
      <li>通过 <b>BP-GIT</b>（10.86.168.3:8686） 创建文档项目。</li>
      <li>点击右上角创建项目，将 GIT 创建的项目同步到这里来即可。</li>
      <h2>设计/维护者</h2>
      <p>Hisheng (haisheng.z@bitpower.com.cn)</p>
      <div slot="footer">
        <Button type="primary" @click="showAboutModal=false">Got it</Button>
      </div>
    </Modal>
    <!-- 创建文档弹窗 -->
    <create-doc-modal ref="createDocModal"></create-doc-modal>
    <!-- 创建文档指南 -->
    <create-doc-guide ref="createDocGuide"></create-doc-guide>
	</div>
</template>

<script>
  import createDocModal from './create-doc-modal.vue';
  import createDocGuide from './create-doc-guide.vue';
  export default {
    name: 'top-menu',
    components: {
      createDocModal,
      createDocGuide,
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
        }else if(name === 'create-doc-guide'){
          this.$refs.createDocGuide.show = true;
        }else if(name === 'back'){
          this.$router.go (-1);
        }else if(name === 'logout'){
          localStorage.removeItem('verified');
          localStorage.removeItem('last-login');
          window.location.reload();
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
    .ivu-menu {
      background-color: #333333;
      color: #ffffff;
      /* opacity: .86; */
      .ivu-menu-item {
        color: #ffffff;
      }
    }
    .ivu-menu-item-active.ivu-menu-item-selected {
      color: inherit;
      border-bottom-width: 0;
    }
  }
</style>