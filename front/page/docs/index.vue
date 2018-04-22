<!-- 文档展示页 -->
<template>
  <div id="doc-list">
    <Alert v-if="!docs.length">暂无文档，快去 <a href="javascript:;" class="link">创建</a> 一个吧～</Alert>
    <div v-else>
      <div class="doc" v-for="doc,i in docs" @click.self="openDoc(doc)">
        <h2 class="name" :title="doc.title">{{ doc.title }}</h2>
        <p class="description">{{ doc.description }}</p>
        <p class="creator"><b class="author">{{ doc.creator }}</b> 于 {{ doc.createdAt }} 创建</p>
        <div class="action-bar">
          <!-- <Icon type="edit" @click.native="edit(i)" title="编辑文档"></Icon>
          <Icon type="android-sync" size="16" @click.native="updateFromGit(i)" title="同步 Git"></Icon> -->
          <Button type="primary" size="small" title="编辑文档基本信息" @click="edit(i)">编辑</Button>
          <Button type="primary" size="small" title="从 git 更新" @click="updateFromGit(i)">更新</Button>
        </div>
      </div>
    </div>
    <!-- 修改文档信息的弹窗 -->
    <Modal id="update-doc-modal" title="修改文档信息" v-model="showUpdateDocModal">
      <Form v-if="currentEditDoc">
        <FormItem label="文档标题">
          <Input placeholder="文档标题" v-model="currentEditDoc.title"></Input>
        </FormItem>
        <FormItem label="文档名称">
          <Input placeholder="文档名称" :value="currentEditDoc.name" readonly></Input>
        </FormItem>
        <FormItem label="Git Url">
          <Input placeholder="请输入文档 git 地址" v-model="currentEditDoc.gitUrl"></Input>
        </FormItem>
        <FormItem label="创建者">
          <Input placeholder="创建者" v-model="currentEditDoc.creator" readonly></Input>
        </FormItem>
        <FormItem label="简介">
          <Input placeholder="简介" type="textarea" :rows="5" v-model="currentEditDoc.description"></Input>
        </FormItem>
        <!-- <FormItem label="设置封面">
          <Input placeholder="上传封面" v-model="newDoc.cover"></Input>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Button type="text" @click="showUpdateDocModal=false;">取消</Button>
        <Button type="primary" @click="updateDoc">更新</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import _cloneDeep from 'lodash/cloneDeep';
  import moment from 'moment';
  export default {
    name: 'doc-list',
    data (){
      return {
        docs: [],
        currentEditDoc: null, // 当前编辑的文档
        showUpdateDocModal: false,
        randomColors: [
          '#f5222d', '#fa541c', '#fa8c16', '#faad14', '#a0d911', '#52c41a', '#13c2c2',
          '#1890ff', '#2f54eb', '#722ed1', '#eb2f96',
        ],
      };
    },
    computed: {
      category (){
        return this.$route.query.category;
      },
    },
    watch: {
      category (val){
        // if(val){
          this.getList();
        // }
      },
    },
    created (){
      this.eventHub.$on('createDocSuccess', () => {
        this.getList();
      });
    },
    activated (){
      this.getList();
    },
    methods: {
      // 获取文档列表
      getList (){
        this.api.doc.getList(this.category).then(res => {
          console.log('>>> [res] 获取文档列表', res);
          if(res.data.err.level < 3){
            this.docs = (res.data.data || []).map(item => {
              item.createdAt = moment(item.createdAt).format('YYYY-MM-DD');
              return item;
            });
          }
        }).catch(err => {
          console.log('>>> [err] 获取文档列表', err);
        });
      },
      // 修改文档信息
      edit (index){
        console.log('修改文档信息');
        this.showUpdateDocModal = true;
        this.currentEditDoc = _cloneDeep(this.docs[index]);
      },
      updateDoc (){
        console.log('updateDoc', this.currentEditDoc);
        this.api.doc.update(this.currentEditDoc, this.category).then(res => {
          console.log('>>> [res] 更新文档', res);
          if(res.data.err.level < 3){
            this.$Message.success('文档信息更新成功');
            this.getList();
          }else this.$Message.error('文档信息更新失败：' + res.data.err.msg);
        }).catch(err => {
          console.log('>>> [err] 更新文档', err);
        });
      },
      updateFromGit (index){
        this.$Message.info('开始同步');
        this.$Loading.start();
        console.log('updateFromGit', this.docs[index]);
        this.api.doc.updateFromGit(this.docs[index], this.category).then(res => {
          console.log('>>> [res] 从 git 更新文档', res);
          this.$Loading.finish();
          if(res.data.err.level < 3){
            this.$Message.success('已与 Git 保持同步');
            // this.getList();
          }else this.$Message.error('Git 同步失败：' + res.data.err.msg);
        }).catch(err => {
          this.$Loading.finish();
          console.log('>>> [err] 从 git 更新文档', err);
        });
      },
      openDoc (doc){
        window.open(this.config.serverUrl + '/static/docs/' + doc.name + '/');
      },
      getRandomColor (){
        return this.randomColors[Math.round(Math.random()*(this.randomColors.length))];
      },
    }
  };
</script>

<style lang= "less">
  #doc-list {
    .doc {
      width: 300px;
      height: 240px;
      border: 1px solid #dfdfdf;
      border-radius: 5px;
      margin: 10px;
      padding: 10px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      background-color: #ffffff;
      z-index: 10;
      /* opacity: .93; */
      box-shadow: 0 1px 10px 2px rgba(0,0,0,.1);
      /*color: #ffffff;*/
      &:hover {
        cursor: pointer;
        box-shadow: 0 1px 20px 5px rgba(0,0,0,.1);
        .action-bar {
          display: block;
        }
      }
      .name {
        margin-bottom: 10px;
        padding-bottom: 4px;
        border-bottom: 1px solid #f2f2f2;
        font-size: 22px;
        font-weight: normal;
      }
      .name, .creator {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .description, .creator {
        font-size: 14px;
      }
      .description {
        max-height: 50px;
        overflow: hidden;
      }
      .creator {
        position: absolute;
        bottom: 10px;
        font-size: 12px;
        font-style: italic;
        .author {
          display: inline-block;
          vertical-align: top;
          max-width: 65px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .action-bar {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        background-color: rgba(0,0,0,.6);
        color: #ffffff;
        /* font-size: 14px; */
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        z-index: 999;
        > .ivu-icon {
          /* margin-right: 12px; */
        }
      }
    }
  }
</style>