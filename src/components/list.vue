<template>
    <div>
        <p>title:<input type="text" name="title" v-model="title"></p>
        <p>text:<input type="text" name="text" v-model="text"></p>
        <p><input type="submit" name="submit" value="提交内容" @click="handleReg"></p>
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
            }
        },
        methods:{
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