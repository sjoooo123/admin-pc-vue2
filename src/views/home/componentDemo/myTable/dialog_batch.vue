<template>
	<el-dialog
        v-dialogDrag
        :visible.sync="visible"
        :close-on-click-modal="false"
        title="批量修改"
        @closed="cancelForm"
    >
        <el-form
            :ref="formName"
            :model="batch"
            :rules="rules"
            label-width="120px"
            label-position="right"
        >
            <el-form-item label="人员类型" prop="type">
                <el-select v-model="batch.type" placeholder="请选择">
                    <el-option
                        v-for="item in params.member"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在部门" prop="dept_id">
                <el-cascader
                    v-model="batch.dept_id"
                    :options="options"
                    filterable
                ></el-cascader>
            </el-form-item>
        </el-form>
        <div style="text-align:right;">
            <el-button type="danger" @click="cancelForm"
                >取消</el-button
            >
            <el-button
                type="primary"
                @click="submitForm"
                :loading="loading"
                >确定</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        options: {
            type: Array,
            // 对象或数组默认值必须从一个工厂函数获取
            default: () => []
        },
        defaultMember: {
            type: Object,
            // 对象或数组默认值必须从一个工厂函数获取
            default: () => {}
        },
    },
	data() {
		return {
            // 弹窗
            formName: 'batchForm',
			loading: false,
			visible: false,
            batch: {
                type: '1',
                dept_id: '',
            },
            rules: {
				dept_id: [
					{ required: true, message: '请选择', trigger: 'blur' },
				],
			},
		}
    },
    computed: {
        ...mapGetters({
            params: 'index/params',
        }),
    },
	mounted() {},
	methods: {
		handleBatch() {
            // if (this.$parent.$refs.table.selectedItems.length == 0) {
			// 	this.$message.error('请先选择人员！')
			// 	return
			// }
			const idArr = []
			this.$parent.$refs.table.selectedItems.forEach((item) => {
				idArr.push(item.id)
            })
            this.batch.type = this.defaultMember.type;
            this.batch.dept_id = this.defaultMember.dept_id;
            this.batch.ids = idArr.join();

			this.visible = true;
        },
        cancelForm() {
            this.$refs[this.formName].resetFields()
            this.visible = false
        },
        submitForm() {
			this.$refs[this.formName].validate((valid) => {
				if (valid) {
					// 组织参数
					const params = {
                        ids: this.batch.ids,
                        type: this.batch.type,
                        dept_id: this.batch.dept_id.slice(-1)[0],
                    }
					this.submitFormBatch(params)
				} else {
					return false
				}
			})
		},
        async submitFormBatch(params) {
            this.loading = true
			const res = await this.$svc.admin_member_batch_post(params)
			this.loading = false
			if (!res) return // res为undefined，出错中止
            this.visible = false // 关闭弹窗
			this.$message.success('修改成功')
			// 清空刷新
			this.$parent.$refs.table.selectedItems = []
			this.$parent.$refs.table.handleFetch()
			this.$parent.$refs.table.$refs.table.clearSelection()
        },
	},
}
</script>

<style lang="scss" scoped></style>
