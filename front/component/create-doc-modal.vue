<template>
  <Modal id="create-doc-modal" title="创建文档" v-model="show">
    <Form>
      <FormItem label="文档标题">
        <Input placeholder="文档标题" v-model="newDoc.title"></Input>
      </FormItem>
      <FormItem label="文档名称">
        <Input placeholder="请输入文档 git 名称或文件夹名称" v-model="newDoc.name"></Input>
      </FormItem>
      <FormItem label="Git Url">
        <Input placeholder="请输入文档 git 地址" v-model="newDoc.gitUrl"></Input>
      </FormItem>
      <FormItem label="创建者">
        <Input placeholder="创建者" v-model="newDoc.creator"></Input>
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
        this.newDoc.createdAt = new Date(); // 创建时间
        this.api.doc.create(this.newDoc).then(res => {
          console.log('>>> 创建文档', res);
          if(res.data.err.level < 3){
            this.$Message.success('文档创建成功');
            this.show = false;
          }else this.$Message.error('创建失败：' + res.data.err.msg);
        });
      },
    },
  };
</script>