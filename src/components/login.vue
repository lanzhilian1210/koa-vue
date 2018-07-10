<template>
    <div>
        <p>name:<input type="text" name="name" v-model="name"></p>
        <p>密码：<input type="text" name="passward" v-model="password"></p>
        <p><input type="submit" name="submit" value="登入" @click="handleLogin"></p>
    </div>
</template>
<script>
    import axios from 'axios';
    const url = '/v1/login';
    export default{
        data() {
            return {
                regUrl:url, 
                name:'123', 
                password: '123',
                }
        },
        methods:{
            handleLogin() {
                this.getRegData();
            },
            // 注册
            getRegData() {
                axios.post('/v1/login',{
                        username: this.name,
                        password: this.password
                }).then(res=>{
                    if(res.data.code == '200') {
                        this.$router.push('/list');
                    } 
                }).catch(err=>{
                    console.log(err);
                })
            }
        }
    }
</script>