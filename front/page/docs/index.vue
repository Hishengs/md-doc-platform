<!-- 文档展示页 -->
<template>
  <div id="doc-list">
    <Alert v-if="!docs.length">暂无文档，快去 <a href="javascript:;" class="link">创建</a> 一个吧～</Alert>
    <div v-else>
      <div class="doc" v-for="doc,i in docs" @click.self="$router.push('/docs/doc/'+doc.name)">
        <h2 class="name">{{ doc.title }}</h2>
        <p class="description">{{ doc.description }}</p>
        <p class="creator"><b>{{ doc.creator }}</b> 于 {{ doc.createdAt }} 创建</p>
        <div class="action-bar">
          <Icon type="edit" @click.native="edit(i)" title="编辑文档"></Icon>
          <Icon type="android-sync" size="16" @click.native="updateFromGit(i)" title="同步 Git"></Icon>
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
          <Input placeholder="文档名称" :value="currentEditDoc.name" disabled></Input>
        </FormItem>
        <FormItem label="Git Url">
          <Input placeholder="请输入文档 git 地址" v-model="currentEditDoc.gitUrl"></Input>
        </FormItem>
        <FormItem label="创建者">
          <Input placeholder="创建者" v-model="currentEditDoc.creator"></Input>
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
      };
    },
    activated (){
      this.getList();
    },
    methods: {
      // 获取文档列表
      getList (){
        this.api.doc.getList().then(res => {
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
        this.api.doc.update(this.currentEditDoc).then(res => {
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
        this.api.doc.updateFromGit(this.docs[index]).then(res => {
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
    }
  };
</script>

<style lang= "less">
  #doc-list {
    .doc {
      width: 200px;
      height: 200px;
      border: 1px solid #dfdfdf;
      border-radius: 5px;
      margin: 10px;
      padding: 10px;
      display: inline-block;
      vertical-align: top;
      position: relative;
      &:hover {
        cursor: pointer;
        box-shadow: 0 1px 10px 1px rgba(0,0,0,.1);
        .action-bar {
          display: block;
        }
      }
      .name {
        margin-bottom: 10px;
      }
      .description, .creator {
        color: #666;
        font-style: italic;
      }
      .description {
        max-height: 50px;
        overflow: hidden;
      }
      .action-bar {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        background-color: rgba(0,0,0,.4);
        color: #ffffff;
        font-size: 12px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        z-index: 999;
        .ivu-icon {
          margin-right: 12px;
        }
      }
    }
  }
</style>