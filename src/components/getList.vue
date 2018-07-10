<template>
    <div>
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
            }
        },
        mounted() {
            this.getList();
        },
        methods:{
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