<template>
    <div>
        <p :class="$style['title']">系统消息(6)</p>
        <div :class="$style['msglist']">
            <div :class="$style['item']" v-for="(item,index) in list" :key="index">
                <div class="left" :style="styleList[item.type]">
                    <i class="el-icon-bell"></i>
                </div>
                <div class="right" :class="{'readed':item.read}">
                    <div class="msg">{{item.title}}</div>
                    <div class="time">{{item.time}}</div>
                </div>
            </div>
        </div>
        <div style="margin: 0" :class="$style['msgbtn']">
            <el-button size="large" type="text" @click="visible2 = false">清空通知</el-button>
            <el-button type="text" size="large" @click="visible2 = false">查看更多</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: [
                {
                    type: 1,
                    title: '你收到了14份新周报',
                    time: '16分钟前'
                },
                {
                    type: 2,
                    title: '你推荐的 曲妮妮 已通过第三轮面',
                    time: '16分钟前'
                },
                {
                    type: 3,
                    title: '这种模块可以区分多种通知类型',
                    time: '16分钟前',
                    read: true
                }
            ],
            styleList: {
                1: {
                    backgroundColor: 'rgb(242,99,123)'
                },
                2: {
                    backgroundColor: 'rgb(255,204,0)'
                },
                3: {
                    backgroundColor: 'rgb(0,180,186)'
                }
            }
        }
    }
}
</script>

<style lang="scss" module>
    .title{
        color:#00B4BA;
        font-size: 12px;
        padding: 17px 0px 10px 27px;
        border-bottom: 1px solid rgba(233, 233, 233, 1);
        margin-bottom: 0px;
    }
    .msglist{
        .item{
            padding: 20px 27px 12px;
            border-bottom: 1px solid rgba(233, 233, 233, 1);
            overflow: hidden;
            cursor: pointer;
            &:hover{
                background-color: rgba(0, 180, 186, 0.0980392156862745);
            }
            :global{
                .left{
                    float: left;
                    width: 32px;
                    height: 32px;
                    margin-right: 16px;
                    border-radius: 50%;
                    background: red;
                    position: relative;
                    i{
                        color: #fff;
                        font-size: 20px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%)
                    }
                }
                .right{
                    float: left;
                    &.readed{
                        .msg,.time{
                            color: rgba(0, 0, 0, 0.247058823529412);
                        }
                    }
                    .msg{
                        font-size: 14px;
                        color: rgba(0, 0, 0, 0.647058823529412);
                        line-height: 22px;
                    }
                    .time{
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.447058823529412);
                    }
                }
            }
        }
    }
    .msgbtn{
        :global{
            .el-button{
                width: 50%;
                &.el-button--text{
                    color: #666;
                    &:hover{
                        color: rgb(0,180,186);
                    }
                }
            }
            .el-button+.el-button{
                margin-left: 0 !important; 
                border-left: 1px solid #ddd;
            }
        }
    }
</style>
