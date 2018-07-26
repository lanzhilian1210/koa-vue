<template>
    <div>
        <p>title:<input type="text" name="title" v-model="title"></p>
        <p>text:<input type="text" name="text" v-model="text"></p>
        <p><input type="submit" name="submit" value="提交内容" @click="handleReg"></p>
        <div v-show="show">show</div>
        <button @click="showHandle">isShow</button>
    </div>
</template>
<script>
    import axios from 'axios';
    const url = 'http://localhost:3000/api/v1/list';
    export default{
        data() {
        return {
              listUrl:url, 
              title:'', 
              text: '',
              show:false,
            }
        },
        mounted() {
            this.showLoad();
        },
        methods:{
            showHandle() {
                axios.post('/v1/newstate',{
                    id:sessionStorage.getItem('id')
                }).then(res=>{
                    console.log(res);
                    this.show = res.data;
                }).catch(err=>{
                    console.log(err);
                })
            },
            showLoad() {
                axios.post('/v1/state',{
                    id:sessionStorage.getItem('id')
                }).then(res=>{
                    this.show = res.data;
                    
                }).catch(err=>{
                    console.log(err);
                })
            },
            handleReg() {
                this.getRegData();
            },
            // 填写内容
            getRegData() {
                axios.post('/v1/addlist',{
                        title: this.title,
                        text: this.text
                }).then(res=>{
                    console.log(res);
                    if(res.data.code == '200') {
                        this.$router.push('/getList');
                    }   
                }).catch(err=>{
                    console.log(err);
                })
            },
        }
    }
</script>