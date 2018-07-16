<template>
    <div>
        <input type="file"  
           ref="pic" @change="selectedFile($event)"/>  
        <button @click="uploadBtn">上传</button>  
        <button @click="downLoadBtn">下载</button> 
        <img :src="srcImg" alt="">
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <h2 ref="h2">{{item.title}}</h2>
                <p>{{item.text}}</p>
                <button @click="delList(item._id,index)">删除</button>
                <button @click="changeList">更改</button>
            </li>
        </ul>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list :[],
                file:'',
                srcImg:'',
            }
        },
        mounted() {
            this.getList();
        },
        methods:{
            downLoadBtn() {
               this.axios.get('/v1/download').then((res)=>{
                //    this.srcImg = res.data;
                   window.open(res.data,'_self');
               })
            },
            selectedFile (e) {  
                // console.log(e.target.files[0])  
                this.file = e.target.files[0];
                //根据项目需求做具体处理，比如说获取文件名  
                var reader = new FileReader();
                
                let imgRUL = window.URL.createObjectURL(this.file);
                this.srcImg = imgRUL;
                },  
             uploadBtn(){
                let form = new FormData();  
                form.append('file', this.file);  
                // console.log(form.get('file'));
                      let config = {
                        headers: {
                        "Content-Type": "multipart/form-data"
                        },
                    };
                this.axios.post('/v1/upload',form,config).then((res)=>{
                    // console.log(res);
                }).catch((err)=>{
                    // console.log(err);
                });
            },
            getList() {
                this.axios.get('/v1/list').then((res)=>{
                    this.list = res.data;
                }).catch((err)=>{
                    console.log(err);
                })
            },
            delList(id,index) {
                this.axios.post('/v1/delList',{
                    id:id
                }).then((res)=>{
                    this.list.splice(index,1);
                })
            },
            changeList() {
                console.log('changeList');
            }
        }
    }
</script>