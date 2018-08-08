<template>
    <div>
        <p>title:<input type="text" name="title" v-model="title"></p>
        <p>text:<input type="text" name="text" v-model="text"></p>
        <p><input type="submit" name="submit" value="提交内容" @click="handleReg"></p>
        <div v-show="show">show</div>
        <button @click="showHandle">isShow</button>
        <div style="width:100%;height:2px;background:red;margin-top:5px;"></div>
        <div>
           <div style="margin-bottom:10px;">学校： <input type="text" v-model="university" /> <button @click="subInfo1">添加</button> </div>
           <div style="margin-bottom:10px;">院系： <input type="text" v-model="major" /> <button @click="subInfo2">添加</button></div>
           <div style="margin-bottom:10px;">专业： <input type="text" v-model="majorName"/> <button @click="subInfo3">添加</button></div>
           <div style="margin-bottom:10px;">班级： <input type="text" v-model="classInfo"> <button @click="subInfo4">添加</button></div>
        </div>
        <div><button @click="addAll">添加信息</button></div>
        <div>
            查询:<input value="输入学生姓名"/>
        </div>
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
              university: '',
              major: '',
              majorName: '',
              classInfo: '',
            }
        },
        mounted() {
            this.showLoad();
        },
        methods:{
            addAll() {
               axios.post().then().catch();
            },
            // 学校
            subInfo1() {
                axios.post('v1/universityInfo',{name:this.university}).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
            },
            // 院系
            subInfo2() {
                axios.post('v1/majorsInfo',{name:this.major}).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
            },
            //专业
            subInfo3() {
                axios.post('v1/majorName',{name:this.majorName}).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
            },
            // 班级
            subInfo4() {
                axios.post('v1/className',{name:this.classInfo}).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                })
            },
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