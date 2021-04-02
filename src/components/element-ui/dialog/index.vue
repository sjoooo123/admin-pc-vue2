<template>
    <div>
        <el-dialog :title="title" :visible.sync="visible" :show-close='showClose' :close-on-click-modal='clickOutClose'
            :close-on-press-escape='clickEscClose' :center='centerLayout' :before-close="beforeClose">
            <slot name="body"></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false" v-if="showCancel">取消</el-button>
                <el-button type="primary" @click="onSub">{{subText}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'MyDialog',
        data() {
            return {
                visible: false
            }
        },
        props: {
            title: String,
            showCancel: { //是否显示取消按钮
                type: Boolean,
                default: true
            },
            subText: { //确定按钮文字
                type: String,
                default: '确定'
            },
            showClose: { //是否显示关闭按钮
                type: Boolean,
                default: true
            },
            clickOutClose: { //是否可以通过弹窗外部关闭弹窗
                type: Boolean,
                default: true
            },
            clickEscClose: {//是否可以点击esc关闭弹窗
                type: Boolean,
                default: true
            },
            centerLayout:{//是否对头部和底部居中布局
                 type: Boolean,
                default: false
            }
        },
        methods: {
            showDialog() {
                this.visible = true;
            },
            onSub() {
                this.visible = false;
                this.$emit('onSubmit', {})
            },
            beforeClose(done){
             this.$emit('beforeClose', {})
             console.log('guanbi')
             done();
            }
        }
    }
</script>
<style scoped>

</style>