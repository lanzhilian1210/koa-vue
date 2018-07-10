<template>
    <div>
        <p>name:<input type="text" name="name" v-model="name"></p>
        <p>密码：<input type="text" name="passward" v-model="password"></p>
        <p><input type="submit" name="submit" value="注册" @click="handleReg"></p>
    </div>
</template>
<script>
    import axios from 'axios';
    const url = 'http://localhost:3000/api/v1/reg';
    export default{
        data() {
        return {
              regUrl:url, 
              name:'', 
              password: '',
            }
        },
        methods:{
            handleReg() {
                this.getRegData();
            },
            // 注册
            getRegData() {
                axios.post(this.regUrl,{
                        username: this.name,
                        password: this.password
                }).then(res=>{
                    if(res.data.code == '200') {
                        this.$router.push('/');
                    }   
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>