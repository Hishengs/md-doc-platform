<template>
  <Modal id="create-doc-modal" title="创建文档" v-model="show">
    <Form>
      <FormItem label="归类到">
        <Select v-model="category">
          <Option v-for="category in categories" :value="category.key" :key="category.key">{{ category.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="文档标题">
        <Input placeholder="文档标题" v-model="newDoc.title"></Input>
      </FormItem>
      <FormItem label="文档名称">
        <Input placeholder="请输入文档 git 名称或文档项目文件夹名称，创建之后不允许修改" v-model="newDoc.name"></Input>
      </FormItem>
      <FormItem label="Git Url">
        <Input placeholder="请输入文档 git 地址" v-model="newDoc.gitUrl"></Input>
      </FormItem>
      <FormItem label="创建者">
        <Input placeholder="创建者，创建之后不允许修改" v-model="newDoc.creator"></Input>
      </FormItem>
      <FormItem label="简介">
        <Input placeholder="简介" type="textarea" :rows="5" v-model="newDoc.description"></Input>
      </FormItem>
      <!-- <FormItem label="设置封面">
        <Input placeholder="上传封面" v-model="newDoc.cover"></Input>
      </FormItem> -->
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false;">取消</Button>
      <Button type="primary" @click="create">创建</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'create-doc-modal',
    data (){
      return {
        show: false,
        // 新建的文档
        category: 'docs',
        categories: [
          { name: '文档中心', key: 'docs' },
          { name: '博客', key: 'blogs' },
        ],
        newDoc: {
          title: '',
          name: '',
          gitUrl: '',
          creator: '',
          description: '',
          // cover: '',
        },
      };
    },
    methods: {
      create (){
        // 检查
        if(!this.newDoc.title.trim() || !this.newDoc.name.trim() || !this.newDoc.gitUrl.trim() || !this.newDoc.creator.trim()){
          return;
        }
        this.$Message.info('创建中...');
        this.$Loading.start();
        this.newDoc.createdAt = new Date(); // 创建时间
        this.api.doc.create(this.newDoc, this.category).then(res => {
          this.$Loading.finish();
          console.log('>>> 创建文档', res);
          if(res.data.err.level < 3){
            this.$Message.success('文档创建成功');
            this.show = false;
            this.eventHub.$emit('createDocSuccess');
          }else this.$Message.error('创建失败：' + res.data.err.msg);
        }).catch(err => {
          this.$Loading.finish();
        });
      },
    },
  };
</script>